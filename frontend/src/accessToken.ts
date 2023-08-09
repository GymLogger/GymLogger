import AsyncStorage from "@react-native-async-storage/async-storage";

let accessToken = "";

/**
 * Puts an access token into AsyncStorage with key "userToken"
 * @param input Token to set as the access token
 */
export const setAccessToken = async (input: string) => {
  //TODO cna this be null? causing issues?
  accessToken = input;
  await AsyncStorage.setItem("userToken", input);
};

/**
 *
 * @returns a value from AsyncStorage for key "userToken"
 */
export const getAccessToken = async () => {
  // return accessToken;
  return AsyncStorage.getItem("userToken");
};
