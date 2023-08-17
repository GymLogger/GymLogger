import { NativeBaseProvider } from "native-base";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

interface ExerciseProps {}

const Exercise: React.FC<ExerciseProps> = ({}) => {
  return (
    <NativeBaseProvider>
      <ScrollView></ScrollView>
    </NativeBaseProvider>
  );
};

export default Exercise;
