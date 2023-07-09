import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import Login from "../../Screens/Login";
import Signup from "../../Screens/Signup";
import Testing from "../../Screens/Testing";
import { RootStackParamList } from "../../types";
import { AuthContext } from "../context/AuthContext";

export const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  const Stack = createStackNavigator<RootStackParamList>();

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  const loggedIn = (
    <>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </>
  );

  const notLoggedIn = (
    <>
      <Stack.Screen name="Testing" component={Testing} />
    </>
  );

  return (
    <Stack.Navigator>{!userToken ? loggedIn : notLoggedIn}</Stack.Navigator>
  );
};
