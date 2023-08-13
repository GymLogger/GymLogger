import { NativeBaseProvider, Text } from "native-base";
import React from "react";
import { Props } from "../types";

interface OldWorkoutProps {
  name: string;
}

const OldWorkout: React.FC = ({ route, navigation }: Props) => {
  const { name } = route.params;

  return (
    <NativeBaseProvider>
      <Text>hi!</Text>
      <Text>{JSON.stringify(name)}</Text>
    </NativeBaseProvider>
  );
};

export default OldWorkout;
