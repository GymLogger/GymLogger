import React, { useEffect, useState } from "react";
import { Props } from "../types";
import {
  Exercise,
  MyExercises,
  useGetMyExercisesQuery,
  useMeQuery,
} from "../src/generated/graphql";
import { Box, Button, NativeBaseProvider, Text } from "native-base";
import SavedExercise from "../src/components/SavedExercise";
import { ScrollView } from "react-native-gesture-handler";

interface CreateExerciseProps {}

const CreateExercise: React.FC<CreateExerciseProps> = ({
  route,
  navigation,
}: Props) => {
  const { data, loading } = useGetMyExercisesQuery();
  const { data: dataMe, loading: loadingMe } = useMeQuery({
    fetchPolicy: "network-only",
  });

  const [myExercises, setMyExercises] = useState(null);

  useEffect(() => {
    if (data) {
      console.log("in useEffect()");
      setMyExercises(data.getMyExercises);
    }
  }, [data]);
  return (
    <NativeBaseProvider>
      <ScrollView>
        <Text>hi!</Text>
        <Button
          onPress={() => {
            console.log("myExercises: ", myExercises);
          }}
        >
          log the state
        </Button>

        <Box>
          {!data?.getMyExercises && !loading ? (
            <Text>loading...</Text>
          ) : (
            <Box>
              <Box>
                {myExercises?.map((exercise, index) => (
                  <SavedExercise
                    key={index}
                    exerciseName={exercise.exerciseName}
                    muscleGroup={exercise.muscleGroup}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {dataMe?.me?.email && <Text>{dataMe.me.email}</Text>}
        {myExercises !== null && !loading && (
          <Box>{myExercises[0]?.exerciseName}</Box>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default CreateExercise;
