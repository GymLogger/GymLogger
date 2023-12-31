import { Button, NativeBaseProvider, Text } from "native-base";
import React from "react";
import { Props } from "../types";
import { ScrollView } from "react-native-gesture-handler";

const OldWorkout: React.FC = ({ route, navigation }: Props) => {
  const { workoutName, handleDeleteWorkout, workoutId } = route.params;

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Text>hi!sdfasdfdfd</Text>
        <Text>more text</Text>
        <Text>{JSON.stringify(workoutName)}</Text>
        <Button
          onPress={() => {
            //TODO add some popup in here like "are you sure?"
            handleDeleteWorkout(workoutId);
            navigation.goBack();
          }}
        >
          delete this workout
        </Button>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default OldWorkout;
