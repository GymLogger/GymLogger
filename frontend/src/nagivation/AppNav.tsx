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

export const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  const Stack = createStackNavigator<RootStackParamList>();

  const [loading, setLoading] = useState(true);

  //TODO - move this to AuthContext
  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      credentials: "include",
      method: "POST",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      console.log("data in useEffect for Refresh: ", accessToken);
      setLoading(false);
    });
  }, []);

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

  // return (
  //   <Stack.Navigator>{!userToken ? loggedIn : notLoggedIn}</Stack.Navigator>
  // );

  return loading ? (
    <Text>hiasdfasdfasdf</Text>
  ) : (
    <Stack.Navigator>{!userToken ? loggedIn : notLoggedIn}</Stack.Navigator>
  );
};
