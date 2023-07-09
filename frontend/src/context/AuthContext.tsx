import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const login = () => {
    setIsLoading(true);
    setUserToken("asdfqwefsdvczsdf");
    // AsyncStorage.setItem("userToken", userToken as string);
    AsyncStorage.setItem("userToken", "asdfqwefsdvczsdf");
    setIsLoading(false);
    console.log("logging in, token: ", userToken);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
    console.log("logging out, token: ", userToken);
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
