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
import { getAccessToken } from "./src/accessToken";

//creates a stack to navigate
//TODO is this even needed? From old version?
const Stack = createStackNavigator<RootStackParamList>();

//create http link based on base url
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  // credentials: "include",
});

/**
 * calls setContext from Apollo library, not React.
 * Passes in the headers. Gets the access token from local storage
 * and attaches it to any headers headed to Apollo.
 */
const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await getAccessToken();
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
      Authorization: token ? `Bearer ${token}` : "",
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

/**
 * This is the entire application. The apollo provider, using the
 * ApolloClient, wraps the entire application, so it has access to everything.
 * The AuthProvider has access to everything in the navigation container and wraps it.
 * NavigationContainer contains the routes and stack of pages.
 * @returns the application
 */
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
