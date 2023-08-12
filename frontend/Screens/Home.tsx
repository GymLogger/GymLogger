import React, { useContext, useEffect, useState } from "react";
import { Props } from "../types";
import { useCreateWorkoutMutation, useMeQuery } from "../src/generated/graphql";
import { View, Text, SafeAreaView, TextInput } from "react-native";
import { NativeBaseProvider, Box, Button, Input } from "native-base";
import { AuthContext } from "../src/context/AuthContext";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({ route, navigation }: Props) => {
  const { data, loading } = useMeQuery({ fetchPolicy: "network-only" });
  const [createWorkout] = useCreateWorkoutMutation();
  const { logout } = useContext(AuthContext);

  const [workoutName, setWorkoutName] = useState<string>("");

  return (
    <NativeBaseProvider>
      {!loading && data.me?.email && (
        <Box>Showing workouts here for {data.me?.email}</Box>
      )}
      <Input
        onChangeText={setWorkoutName}
        value={workoutName}
        placeholder="workout"
      />
      <Button
        onPress={async () => {
          console.log("personal ID: ", data.me.id);
          console.log("workout name: ", workoutName);
          const response = await createWorkout({
            variables: { name: workoutName },
          });
          console.log("response: ", response);
        }}
      >
        create workout
      </Button>
      <Button onPress={() => logout()}>logout</Button>
      <Box>list of workouts</Box>
    </NativeBaseProvider>
  );
};

export default Home;
