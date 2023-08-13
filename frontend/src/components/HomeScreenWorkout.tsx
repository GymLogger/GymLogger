import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Box,
  Button,
  Divider,
  Flex,
  NativeBaseProvider,
  Text,
} from "native-base";
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
      <Flex direction="row">
        <Box mt="1" mb="1">
          <Text>workout name: {name}</Text>
          <Text>workout id: {workoutId}</Text>
        </Box>

        <Button ml="auto" onPress={handleNavigate}>
          view workout
        </Button>
      </Flex>
    </NativeBaseProvider>
  );
};

export default HomeScreenWorkout;
