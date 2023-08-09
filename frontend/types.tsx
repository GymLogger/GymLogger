import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

/**
 *
 */
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Testing: undefined;
  Testing2: undefined;
};

export type MessageNavProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type Props = NativeStackScreenProps<
  RootStackParamList,
  keyof RootStackParamList
>;
