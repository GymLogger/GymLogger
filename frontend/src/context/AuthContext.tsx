import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { decode } from "react-native-pure-jwt";
import {
  useByeQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../generated/graphql";
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
  userToken: "1",
};
export const AuthContext = createContext<ProviderProps>(InitialContext);

export const AuthProvider = ({ children, ...props }: AuthProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>("1");

  const [verifyState, setVerifyState] = useState<any>();

  const apollo = useApolloClient();
  const [logoutApollo] = useLogoutMutation();

  // const { data } = useLoginQuery({
  //   variables: { email: "Colin1", password: "Colin1" },
  // });

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

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// import React, {
//     createContext,
//     Dispatch,
//     ReactNode,
//     SetStateAction,
//     useState,
//   } from "react";

//   interface AuthProps {
//     children?: ReactNode;
//   }

//   type Context = {
//     jwt: string;
//     setContext: Dispatch<SetStateAction<Context>>;
//   };

//   const initialContext: Context = {
//     jwt: "",
//     setContext: (): void => {
//       throw new Error("setContext function must be overridden");
//     },
//   };

//   export const AuthContext = createContext<Context>(initialContext);

//   export const AuthProvider = ({ children, ...props }: AuthProps) => {
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [userToken, setUserToken] = useState<string>("");
//     const [contextState, setContext] = useState<Context>(initialContext);

//     const login = () => {
//       setUserToken("asdfqwefsdvczsdf");
//       setIsLoading(false);
//     };

//     const logout = () => {
//       setUserToken("");
//       setIsLoading(false);
//     };
//     return (
//       <AuthContext.Provider value={{ ...contextState, setContext }}>
//         {children}
//       </AuthContext.Provider>
//     );
//   };
