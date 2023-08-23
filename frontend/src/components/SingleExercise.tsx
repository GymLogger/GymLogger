import {
  Box,
  Button,
  Divider,
  NativeBaseProvider,
  Stack,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ExerciseProps } from "../../Screens/CurrentWorkout";
import SingleSet from "./SingleSet";

const SingleExercise: React.FC<ExerciseProps> = (props: ExerciseProps) => {
  const [mySets, updateMySets] = useState(props.sets);

  const handleAddingSet = (index: number) => {
    props.handleAddSet(index);
    if (mySets !== undefined && mySets !== null) {
      console.log("in if block");
      updateMySets([...mySets, { reps: 0, weight: 0 }]);
    } else {
      console.log("in else block");
      updateMySets([{ reps: 0, weight: 0 }]);
    }
    console.log("mySets, in single exercise:", mySets);
  };

  return (
    <View>
      <Divider mt="5"></Divider>
      <Box>{props.exerciseName}</Box>
      {/* <Stack direction="column">
        {!!mySets &&
          mySets?.map((s, index) => (
            <SingleSet
              key={index}
              reps={s.reps}
              setNumber={index + 1}
              weight={s.weight}
            />
          ))}
      </Stack>
      <Box>DIVIDER</Box> */}
      <Stack direction="column">
        {!!props.sets &&
          props.sets?.map((s, index) => (
            <SingleSet
              key={index}
              reps={s.reps}
              setNumber={index + 1}
              weight={s.weight}
            />
          ))}
      </Stack>
      <Button
        onPress={() => {
          handleAddingSet(props.index);
          console.log("sets: ", mySets);
        }}
      >
        add set
      </Button>
    </View>
  );
};

export default SingleExercise;
