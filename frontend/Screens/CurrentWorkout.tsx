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
  myExerciseId: number;
  muscleGroup: string[];
  // variation: string;
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
  const [exercises, setExercises] = useState<Array<ExerciseProps>>(null);
  const [workoutName, setWorkoutName] = useState<string>("");
  const [myExercises, setMyExercises] = useState<
    Array<{
      __typename?: "MyExercises";
      exerciseName: string;
      muscleGroup: string[];
      myExerciseId: number;
      creatorId?: number;
    }>
  >(null);

  const [service, setService] = useState<string>(""); //val for exercise dropdown
  const [searchValue, setSearchValue] = useState<string>("");

  const { data: dataMyExercises, loading: loadingMyExercises } =
    useGetMyExercisesQuery();

  //This silences an error which may or may not be a problem.
  //Can't have flat lists inside a scroll view but it may just be OK
  //TODO figure out if this needs to change
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  //loads MyExercises and sets then in state
  useEffect(() => {
    if (dataMyExercises) {
      console.log("in the loading use effect");
      setMyExercises(dataMyExercises.getMyExercises);
    }
  }, [dataMyExercises]);

  //TODO figure out the typing here
  const handleSetSearchValue = (e: string) => {
    setSearchValue(e);
  };

  const handleAddExercise = (exId: string) => {
    const newExercise: ExerciseProps = dataMyExercises.getMyExercises.find(
      (element) => element.myExerciseId === parseInt(exId)
    );
    if (!exercises) {
      setExercises([newExercise]);
    } else {
      setExercises([...exercises, newExercise]);
    }
  };

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
        <Stack direction="column">
          {!!exercises &&
            exercises.map((exercise, index) => (
              <Exercise
                myExerciseId={exercise.myExerciseId}
                exerciseName={exercise.exerciseName}
                muscleGroup={exercise.muscleGroup}
                key={index}
              />
            ))}
        </Stack>
        <MyExerciseSearchBar handleChange={handleSetSearchValue} />
        <Flex direction="row" mt="5">
          <Button
            w="150"
            borderRadius="30"
            onPress={() => {
              console.log("hi!");
              console.log("exercises: ", exercises);
              handleAddExercise(service);
            }}
          >
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
                exercise.exerciseName.includes(searchValue) && (
                  <Select.Item
                    label={exercise.exerciseName}
                    value={exercise.myExerciseId.toString()}
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
