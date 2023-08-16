import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

/**
 * List of parameters that each page will accept as props.
 * Every time a new page is written, the ParamList must be updated.
 * These props can be accessed through the route object, passed in as
 * { route, navigation } to every page as type Props
 */
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Testing: undefined;
  Testing2: undefined;
  CreateExercise: undefined;
  OldWorkout: {
    workoutName: string;
    handleDeleteWorkout: (wID: number) => void;
    workoutId: number;
  };
};

export type MessageNavProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type Props = NativeStackScreenProps<
  RootStackParamList,
  keyof RootStackParamList
>;
