import React, { useContext, useEffect, useState } from "react";
import { Props } from "../types";
import {
  useCreateWorkoutMutation,
  useGetAllWorkoutsQuery,
  useGetUsersQuery,
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

interface HomeProps {}

const Home: React.FC<HomeProps> = ({ route, navigation }: Props) => {
  const { data, loading } = useMeQuery({ fetchPolicy: "network-only" });
  const { logout } = useContext(AuthContext);
  const { data: dataWorkouts, loading: loadingWorkouts } =
    useGetWorkoutsQuery();

  const [createWorkout] = useCreateWorkoutMutation();
  const [workoutName, setWorkoutName] = useState<string>("");
  const [workouts, setWorkouts] = useState(Array<any>);

  useEffect(() => {
    if (dataWorkouts) {
      setWorkouts(dataWorkouts.getWorkouts);
      console.log("workouts state variable: ", workouts);
      console.log("mutation workouts: ", dataWorkouts.getWorkouts);
    }
  }, [dataWorkouts]);

  return (
    <NativeBaseProvider>
      <ScrollView>
        {!loading && data.me?.email && (
          <Box>Showing workouts here for {data.me?.email}</Box>
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
                cache.evict({ fieldName: "getAllWorkouts" });
                cache.evict({ fieldName: "getWorkouts" });
              },
            });
            console.log("response: ", response);
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
            ></HomeScreenWorkout>
          ))}
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Home;
