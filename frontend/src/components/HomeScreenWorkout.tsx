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
      <Text>workout name: {name}</Text>
      <Text>workout id: {workoutId}</Text>
    </NativeBaseProvider>
  );
};

export default HomeScreenWorkout;
