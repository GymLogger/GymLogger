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
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator<RootStackParamList>();

//create http link based on base url
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem("userToken");
  console.log("token: ", token);
  // return the headers to the context so httpLink can read them
  headers = {
    ...headers,
    authorization: token ? `Bearer ${token}` : "",
  };
  console.log("headers: ", headers);
  return {
    headers: {
      ...headers,
      //might need capital A
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//Create apollo client object
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // link: httpLink,
  cache: new InMemoryCache(),
  //may need to include credentials
  // credentials:'include'
});
export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NavigationContainer>
          <AppNav />
        </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
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
