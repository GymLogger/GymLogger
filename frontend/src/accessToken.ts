import AsyncStorage from "@react-native-async-storage/async-storage";

let accessToken = "";

export const setAccessToken = async (input: string) => {
  accessToken = input;
  await AsyncStorage.setItem("userToken", input);
};

export const getAccessToken = async () => {
  // return accessToken;
  return AsyncStorage.getItem("userToken");
};
