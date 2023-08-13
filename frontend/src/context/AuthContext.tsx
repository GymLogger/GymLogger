import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { decode } from "react-native-pure-jwt";
import { useLoginMutation, useLogoutMutation } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface AuthProps {
  children?: ReactNode;
}

interface ProviderProps {
  login: (input: string) => void;
  logout: () => void;
  isLoading: boolean;
  userToken: string | null;
}

//TODO - fix this hack
const InitialContext: ProviderProps = {
  login: (input: "") => {},
  logout: () => {},
  isLoading: true,
  userToken: "1", //hack b/c userToken apparently cant be null
};
export const AuthContext = createContext<ProviderProps>(InitialContext);

export const AuthProvider = ({ children, ...props }: AuthProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>("1");

  const [verifyState, setVerifyState] = useState<any>();

  const apollo = useApolloClient();
  const [logoutApollo] = useLogoutMutation();

  //asdfefe is access
  //iwueyiwuye is refresh

  const login = async (input: string) => {
    console.log("input", input);
    setUserToken(input);
    // AsyncStorage.setItem("userToken", userToken as string);
    AsyncStorage.setItem("userToken", input);
    setIsLoading(false);
    // console.log("jwt", data.login.accessToken);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    logoutApollo();
    //TODO is this await??
    apollo.resetStore();
    setIsLoading(false);
    // console.log("jwt", data.login.accessToken);
  };

  /**
   * function that checks if a user is logged in.
   * sets loading variable to true while checking.
   * Checks AysncStorage for the value for key "userToken"
   */
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const userToken = await AsyncStorage.getItem("userToken");
      //just added this
      if (!userToken) {
        setUserToken("");
      } else {
        setUserToken(userToken);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //Checks if a user is logged in when the page loads.
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    //AuthContext will provide its values to every other child component.
    //In our case, it will provide it to everything that *isn't* the ApolloClientProvider
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};
