import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { access } from "fs";
import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import Login from "../../Screens/Login";
import Signup from "../../Screens/Signup";
import Testing from "../../Screens/Testing";
import { RootStackParamList } from "../../types";
import { setAccessToken } from "../accessToken";
import { AuthContext } from "../context/AuthContext";
import AppStack from "./AppStack";
import Home from "../../Screens/Home";
import OldWorkout from "../../Screens/OldWorkout";
import CreateExercise from "../../Screens/CreateExercise";
import CurrentWorkout from "../../Screens/CurrentWorkout";

export const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  const Stack = createStackNavigator<RootStackParamList>();

  const [loading, setLoading] = useState(true);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  //TODO: Replace these with AppStack and AuthStack
  //List of screens which can be accessed if logged in
  const notLoggedIn = (
    <>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </>
  );

  //List of screens which can be accessed if notn logged in
  const loggedIn = (
    <>
      {/* <Stack.Screen name="Testing" component={Testing} /> */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="OldWorkout"
        component={OldWorkout}
        options={({ route }) => ({ title: route.params.workoutName })}
      />
      <Stack.Screen name="CreateExercise" component={CreateExercise} />
      <Stack.Screen name="CurrentWorkout" component={CurrentWorkout} />
    </>
  );

  return (
    //shows one stack if logged in, another if not
    <Stack.Navigator>{userToken ? loggedIn : notLoggedIn}</Stack.Navigator>
  );
};
