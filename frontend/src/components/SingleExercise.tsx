import {
  Box,
  Button,
  Divider,
  NativeBaseProvider,
  Stack,
  View,
} from "native-base";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ExerciseProps } from "../../Screens/CurrentWorkout";
import SingleSet from "./SingleSet";

const SingleExercise: React.FC<ExerciseProps> = ({
  exerciseName,
  muscleGroup,
  myExerciseId,
  index,
  sets,
  handleAddSet,
}: ExerciseProps) => {
  return (
    <View>
      <Divider mt="5"></Divider>
      <Box>{exerciseName}</Box>
      <Stack direction="column">
        {!!sets && sets?.map((s, index) => <SingleSet />)}
      </Stack>
      <Button
        onPress={() => {
          handleAddSet(index);
          console.log("sets: ", sets);
        }}
      >
        add set
      </Button>
    </View>
  );
};

export default SingleExercise;
