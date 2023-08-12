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
    <View>
      {!loading && data && (
        <Text>Showing workouts here for {data.me.email}</Text>
      )}

      <SafeAreaView>
        <TextInput
          onChangeText={setWorkoutName}
          value={workoutName}
          placeholder="workout"
        />
      </SafeAreaView>
      <NativeBaseProvider>
        <Box>Hi!</Box>
      </NativeBaseProvider>
    </View>
  );
};

export default Home;
