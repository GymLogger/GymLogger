import React, { useEffect, useState } from "react";
import { Props } from "../types";
import {
  NativeBaseProvider,
  Box,
  Input,
  Button,
  Stack,
  Flex,
  Select,
  CheckIcon,
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import Exercise from "../src/components/Exercise";
import { LogBox } from "react-native";
import { useGetMyExercisesQuery } from "../src/generated/graphql";
import MyExerciseSearchBar from "../src/components/MyExerciseSearchBar";

interface CurrentWorkoutProps {}

export interface ExerciseProps {
  exerciseName: string;
  exerciseId: number;
  muscleGroup: string[];
  variation: string;
  sets?: Sets[];
}

export interface Sets {
  weight?: number;
  reps?: number;
  time?: number;
}

const CurrentWorkout: React.FC<CurrentWorkoutProps> = ({
  route,
  navigation,
}: Props) => {
  const [exercises, setExercises] = useState<Array<ExerciseProps>>();
  const [workoutName, setWorkoutName] = useState<string>("");
  const [myExercises, setMyExercises] = useState<Array<any>>(null);
  const [service, setService] = useState(""); //val for exercise dropdown
  const [searchValue, setSearchValue] = useState<string>("");

  const { data: dataMyExercises, loading: loadingMyExercises } =
    useGetMyExercisesQuery();

  //This silences an error which may or may not be a problem.
  //Can't have flat lists inside a scroll view but it may just be OK
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  //   const handleSetExercises = () => {
  //     const currExercises;
  //   };

  //loads MyExercises and sets then in state
  useEffect(() => {
    if (dataMyExercises) {
      setMyExercises(dataMyExercises.getMyExercises);
    }
  }, [dataMyExercises]);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Input
          variant="rounded"
          placeholder="Workout name"
          onChangeText={setWorkoutName}
          w="75%"
          mt="5"
        ></Input>
        <Stack direction="row">
          {!!exercises &&
            exercises.map((exercise, index) => (
              <Exercise
                exerciseId={1}
                exerciseName="hi"
                muscleGroup={["abs"]}
                variation="hard"
                key={index}
              />
            ))}
        </Stack>
        <MyExerciseSearchBar />
        <Flex direction="row" mt="5">
          <Button w="150" borderRadius="30">
            add exercise
          </Button>
          <Select
            selectedValue={service}
            w="200"
            accessibilityLabel="Choose Exercise"
            placeholder="Choose Exercise"
            _selectedItem={{ endIcon: <CheckIcon /> }}
            onValueChange={(itemValue) => setService(itemValue)}
          >
            {myExercises?.map(
              (exercise, index) =>
                exercise.exerciseName
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) && (
                  <Select.Item
                    label={exercise.exerciseName}
                    value={exercise.exerciseName}
                    key={index}
                  />
                )
            )}
          </Select>
        </Flex>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default CurrentWorkout;
