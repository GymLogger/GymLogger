import React, { useState } from "react";
import { Props } from "../types";
import { useMeQuery } from "../src/generated/graphql";
import { View, Text, SafeAreaView, TextInput } from "react-native";
import { NativeBaseProvider, Box } from "native-base";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({ route, navigation }: Props) => {
  const { data, loading } = useMeQuery();

  const [workoutName, setWorkoutName] = useState<string>("");
  return (
    <NativeBaseProvider>
      {!loading && data && <Box>Showing workouts here for {data.me.email}</Box>}
      <TextInput
        onChangeText={setWorkoutName}
        value={workoutName}
        placeholder="workout"
      />
    </NativeBaseProvider>
  );
};

export default Home;
