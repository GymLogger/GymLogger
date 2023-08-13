import React, { useContext, useEffect, useState } from "react";
import { Props, RootStackParamList } from "../types";
import {
  useCreateWorkoutMutation,
  useDeleteWorkoutMutation,
  useGetWorkoutsQuery,
  useMeQuery,
} from "../src/generated/graphql";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NativeBaseProvider, Box, Button, Input } from "native-base";
import { AuthContext } from "../src/context/AuthContext";
import HomeScreenWorkout from "../src/components/HomeScreenWorkout";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({ route, navigation }: Props) => {
  const { data, loading } = useMeQuery({ fetchPolicy: "network-only" });
  const { logout } = useContext(AuthContext);
  const { data: dataWorkouts, loading: loadingWorkouts } =
    useGetWorkoutsQuery();

  const [createWorkout] = useCreateWorkoutMutation();
  const [deleteWorkout] = useDeleteWorkoutMutation();

  const [workoutName, setWorkoutName] = useState<string>("");
  const [workouts, setWorkouts] = useState(Array<any>);

  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  //once workouts are loaded from mutation, set the state variable containing workouts
  useEffect(() => {
    if (dataWorkouts) {
      setWorkouts(dataWorkouts.getWorkouts);
    }
  }, [dataWorkouts]);

  //will add the current workout to state variable containing workouts
  const handleCreateWorkout = (w) => {
    setWorkouts([...workouts, w]);
  };

  //handles deleting a workout and changes the state variable containing workouts
  const handleDeleteWorkout = (wID: number) => {
    deleteWorkout({
      variables: { workoutId: wID },
      update: (cache) => {
        cache.evict({ fieldName: "getWorkouts" });
      },
    });
    setWorkouts([...workouts.filter((w) => w.workoutId != wID)]);
  };

  /**
   * Handles navigation to OldWorkout page, passed
   * as prop to HomeScreenWorkout component
   * @param workoutName name of workout, displayed as title
   */
  const handleNavigate = (workoutName: string, workoutId: number) => {
    navigation.navigate("OldWorkout", {
      workoutName,
      workoutId,
      handleDeleteWorkout,
    });
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        {!loading && data.me?.email && (
          <Text>Showing workouts here for {data.me?.email}</Text>
        )}
        <Input
          onChangeText={setWorkoutName}
          value={workoutName}
          placeholder="workout"
        />
        <Button
          onPress={async () => {
            console.log("personal ID: ", data.me.id);
            console.log("workout name: ", workoutName);
            const response = await createWorkout({
              variables: { name: workoutName },
              update: (cache) => {
                cache.evict({ fieldName: "getAllWorkouts" }); //TODO don't need this
                cache.evict({ fieldName: "getWorkouts" });
              },
            });
            handleCreateWorkout(response.data.createWorkout);
          }}
        >
          create workout
        </Button>
        <Button onPress={() => logout()}>logout</Button>
        <Box>list of workouts</Box>
        <Box>
          {workouts.map((workout, index) => (
            <HomeScreenWorkout
              key={index}
              name={workout.name}
              workoutId={workout.workoutId}
              handleNavigate={() =>
                handleNavigate(workout.name, workout.workoutId)
              }
            ></HomeScreenWorkout>
          ))}
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Home;
