import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import React, { useEffect, useState } from "react";
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
  ApolloLink,
  HttpLink,
  Observable,
} from "@apollo/client";
import { AuthProvider } from "./src/context/AuthContext";
import { AppNav } from "./src/nagivation/AppNav";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccessToken, setAccessToken } from "./src/accessToken";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

//creates a stack to navigate
//TODO is this even needed? From old version?
const Stack = createStackNavigator<RootStackParamList>();

const cache = new InMemoryCache({});

/**
 * Most of this is ripped directly from Apollo docs, but had to be made async
 * due to AsyncStorage nature of accessTokens. I do not fully understand it,
 * but I do udnerstand that the accessToken is added to the headers.
 *
 * Essentially, every time a request is made
 */
const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then(async (operation) => {
          //gets access token from AsyncStorage
          const accessToken = await getAccessToken();
          if (accessToken) {
            /**
             * calls setContext from Apollo library, not React.
             * Passes in the headers. Gets the access token from local storage
             * and attaches it to any headers headed to Apollo.
             */
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        //literally no idea what any of this does, but it resolves the observable
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));
      //no clue
      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      //function from token-refresh-link library
      //had to make async b/c of getAccessToken()
      /**
       *
       * @returns true if token is OK, false if not
       */
      isTokenValidOrUndefined: async () => {
        const token = await getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const exp: number = jwtDecode(token); //gets expiration date
          if (Date.now() >= exp * 1000) {
            return false; //token expired, invalid
          } else {
            return true; //token OK
          }
        } catch {
          return false; //token invalid
        }
      },
      /**
       * If token was OK, make POST req to our endpoint, fetch new accessToken,
       * use current token to do so
       * @returns new accessToken
       */
      fetchAccessToken: () => {
        return fetch("http://localhost:4000/refresh_token", {
          method: "POST",
          credentials: "include",
        });
      },
      //handles logic after fetched - set the AccessToken
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },
      //handles any errors with token
      handleError: (err) => {
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      },
    }),
    requestLink,
    new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include", //don't think credentials need to be included
    }),
  ]),
  cache,
});

/*****************below this was old version****************************** */

//create http link based on base url
// const httpLink = createHttpLink({
//   uri: "http://localhost:4000/graphql",
//   // credentials: "include",
// });

/**
 * calls setContext from Apollo library, not React.
 * Passes in the headers. Gets the access token from local storage
 * and attaches it to any headers headed to Apollo.
 */
// const authLink = setContext(async (_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = await getAccessToken();
//   console.log("token: ", token);
//   // return the headers to the context so httpLink can read them
//   headers = {
//     ...headers,
//     authorization: token ? `Bearer ${token}` : "",
//   };
//   console.log("headers: ", headers);
//   return {
//     headers: {
//       ...headers,
//       //might need capital A
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

//Create apollo client object
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   // link: httpLink,
//   cache: new InMemoryCache(),
//   //may need to include credentials if CORS issues
//   // credentials: "include",
// });

/************above this was old version****************** */

/**
 * This is the entire application. The apollo provider, using the
 * ApolloClient, wraps the entire application, so it has access to everything.
 * The AuthProvider has access to everything in the navigation container and wraps it.
 * NavigationContainer contains the routes and stack of pages.
 * @returns the application
 */
export default function App() {
  const [loading, setLoading] = useState(true);

  /**
   * When any page loads, try to get a refresh token from the route by making a POST request
   * After, parse it from the json, set the Access Token in Async Storage
   * and set loading to false
   */
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

  //if loading, show a spinner
  if (loading) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

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
