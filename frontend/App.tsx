import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import React from "react";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { AuthProvider } from "./src/context/AuthContext";
import { AppNav } from "./src/nagivation/AppNav";

const Stack = createStackNavigator<RootStackParamList>();

//create http link based on base url
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

//Create apollo client object
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  //may need to include credentials
  // credentials:'include'
});
export default function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <AppNav />
        </NavigationContainer>
      </ApolloProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
