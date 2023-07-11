let accessToken = "";

export const setAccessToken = (input: string) => {
  accessToken = input;
};

export const getAccessToken = () => {
  return accessToken;
};
