import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Button, Divider, NativeBaseProvider, Text } from "native-base";
import React from "react";
import { Props, RootStackParamList } from "../../types";

interface HomeScreenWorkoutProps {
  name: string;
  workoutId: number;
  handleNavigate: () => void;
}

const HomeScreenWorkout: React.FC<HomeScreenWorkoutProps> = ({
  name,
  workoutId,
  handleNavigate,
}: HomeScreenWorkoutProps) => {
  return (
    <NativeBaseProvider>
      <Divider></Divider>
      <Text>workout name: {name}</Text>
      <Text>workout id: {workoutId}</Text>
      <Button onPress={handleNavigate}></Button>
    </NativeBaseProvider>
  );
};

export default HomeScreenWorkout;
