import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoginQuery } from "../generated/graphql";
import { verify } from "jsonwebtoken";

interface AuthProps {
  children?: ReactNode;
}

interface ProviderProps {
  login: () => void;
  logout: () => void;
  isLoading: boolean;
  userToken: string | null;
}

const InitialContext: ProviderProps = {
  login: () => {},
  logout: () => {},
  isLoading: true,
  userToken: null,
};
export const AuthContext = createContext<ProviderProps>(InitialContext);

export const AuthProvider = ({ children, ...props }: AuthProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  const [verifyState, setVerifyState] = useState<any>(null);

  const { data } = useLoginQuery({
    variables: { email: "Colin1", password: "Colin1" },
  });

  //asdfefe is access
  //iwueyiwuye is refresh

  useEffect(() => {
    const verifyToken = verify(data?.login?.accessToken, "asdfefe");
    console.log("verifyToken: ", verifyToken);
    setVerifyState(verifyToken);
  }, [data]);

  const login = () => {
    setIsLoading(true);
    setUserToken("asdfqwefsdvczsdf");
    // AsyncStorage.setItem("userToken", userToken as string);
    AsyncStorage.setItem("userToken", "asdfqwefsdvczsdf");
    setIsLoading(false);
    console.log("jwt", data.login.accessToken);
    console.log("VerifyToken: ", verifyState);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
    // console.log("jwt", data.login.accessToken);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken);
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
