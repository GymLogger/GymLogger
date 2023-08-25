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
import SingleExercise from "../src/components/SingleExercise";
import { LogBox } from "react-native";
import { useGetMyExercisesQuery } from "../src/generated/graphql";
import MyExerciseSearchBar from "../src/components/MyExerciseSearchBar";

interface CurrentWorkoutProps {}

/**
 * ExerciseProps, for passing data to an exercise Component
 */
export interface ExerciseProps {
  exerciseName: string;
  myExerciseId: number;
  muscleGroup: string[];
  // variation: string;
  sets?: Sets[];
  index?: number;
  handleAddSet?: (index: number) => void;
}

/**
 * Sets interface for storing sets in {@link ExerciseProps}
 */
export interface Sets {
  weight?: number;
  reps?: number;
  time?: number;
}

/**
 * This screen shows the current workout. It is composed of child components,
 * including a MyExercise search bar, Exercises, and Sets for each exercise
 * @param object containing a route and navigation, defined in {@link Props}
 * @returns the screen
 */
const CurrentWorkout: React.FC<CurrentWorkoutProps> = ({
  route,
  navigation,
}: Props) => {
  //state for list of exercises performed in this workout
  const [exercises, setExercises] = useState<Array<ExerciseProps>>(null);

  const [workoutName, setWorkoutName] = useState<string>(""); //state for the workout name

  //state for storing MyExercises, initialized to null. type from GetMyExercisesQuery
  const [myExercises, setMyExercises] = useState<
    Array<{
      __typename?: "MyExercises";
      exerciseName: string;
      muscleGroup: string[];
      myExerciseId: number;
      creatorId?: number;
    }>
  >(null);

  const [service, setService] = useState<string>(""); //string of exercise name for exercise dropdown
  const [searchValue, setSearchValue] = useState<string>(""); //myExerciseID from exercise dropdown, stored as string

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
      setMyExercises(dataMyExercises.getMyExercises);
    }
  }, [dataMyExercises]);

  //TODO figure out the typing here
  const handleSetSearchValue = (e: string) => {
    setSearchValue(e);
  };

  /**
   * Handles adding an exercise to the workout and updates the state.
   * @param exId id of the exercise as a string
   */
  const handleAddExercise = (exId: string) => {
    //finds the exercise in MyExercises with myExerciseId equal to exId.
    const searchedExercise = dataMyExercises.getMyExercises.find(
      (element) => element.myExerciseId === parseInt(exId)
    );
    //adds a Set to that exercise with reps + weight 0
    const newExercise = { ...searchedExercise, sets: [{ reps: 0, weight: 0 }] };
    // const newExercise = { ...searchedExercise };

    //if no exercises yet, set exercises to be an array containing only this element
    if (!exercises) {
      setExercises([newExercise]);
    } else {
      //else spread the existing exercises and add the newExercise
      setExercises([...exercises, newExercise]);
    }
  };

  /**
   * Adds a set to an exercise. This function is passed to the child component, SingleExercise.
   * @param index index in the array of exercises specifies the exercise to add a set to.
   */
  const handleAddSet = (index: number) => {
    let newExerciseArr = exercises;
    //if there are no sets in exercises state
    if (newExerciseArr[index].sets === undefined) {
      newExerciseArr[index].sets = [{ reps: 0, weight: 0 }];
    } else {
      //else push it onto the existing array of sets
      newExerciseArr[index].sets.push({ reps: 0, weight: 0 });
    }
    setExercises(newExerciseArr); //sets the state of exercises with the newly added set
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
            exercises?.map((exercise, index) => (
              <SingleExercise
                myExerciseId={exercise.myExerciseId}
                exerciseName={exercise.exerciseName}
                muscleGroup={exercise.muscleGroup}
                key={index}
                index={index}
                handleAddSet={handleAddSet}
                sets={exercise.sets}
              />
            ))}
        </Stack>
        <MyExerciseSearchBar handleChange={handleSetSearchValue} />
        <Flex direction="row" mt="5">
          <Button
            w="150"
            borderRadius="30"
            onPress={() => {
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
