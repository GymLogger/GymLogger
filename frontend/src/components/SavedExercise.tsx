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
      <Text>{exerciseName}</Text>
      {/* <Text>{muscleGroup.toString()}</Text> */}
    </NativeBaseProvider>
  );
};

export default SavedExercise;
