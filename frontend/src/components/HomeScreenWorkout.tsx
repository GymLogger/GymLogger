import { Box, Divider, NativeBaseProvider, Text } from "native-base";
import React from "react";

interface HomeScreenWorkoutProps {
  name: string;
  workoutId: number;
}

const HomeScreenWorkout: React.FC<HomeScreenWorkoutProps> = ({
  name,
  workoutId,
}: HomeScreenWorkoutProps) => {
  return (
    <NativeBaseProvider>
      <Divider></Divider>
      <Box>{name}</Box>
      <Box>{workoutId}</Box>
    </NativeBaseProvider>
  );
};

export default HomeScreenWorkout;