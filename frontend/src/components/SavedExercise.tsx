import { NativeBaseProvider, Text } from "native-base";
import React from "react";

interface SavedExerciseProps {
  exerciseName: string;
  muscleGroup: string[];
}

const SavedExercise: React.FC<SavedExerciseProps> = ({
  exerciseName,
  muscleGroup,
}: SavedExerciseProps) => {
  return (
    <NativeBaseProvider>
      <Text mt="2">name: {exerciseName}</Text>
      <Text>muscle group: {muscleGroup.toString()}</Text>
    </NativeBaseProvider>
  );
};

export default SavedExercise;
