import { Box, NativeBaseProvider } from "native-base";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ExerciseProps } from "../../Screens/CurrentWorkout";

const Exercise: React.FC<ExerciseProps> = ({
  exerciseName,
  muscleGroup,
  variation,
  sets,
}: ExerciseProps) => {
  return (
    <NativeBaseProvider>
      <Box>{exerciseName}</Box>
    </NativeBaseProvider>
  );
};

export default Exercise;
