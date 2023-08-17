import React, { useState } from "react";
import { Props } from "../types";
import { NativeBaseProvider, Box } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

interface CurrentWorkoutProps {}

const CurrentWorkout: React.FC<CurrentWorkoutProps> = ({
  route,
  navigation,
}: Props) => {
  const [exercises, setExercises] = useState<Array<any>>();
  return (
    <NativeBaseProvider>
      <ScrollView>{/* <Box>hi!</Box> */}</ScrollView>
    </NativeBaseProvider>
  );
};

export default CurrentWorkout;
