import { Response } from "express";

/**
 * Sends a refresh token and puts it in the cookie
 * @param res Response to be sent
 * @param token refresh token to be put in
 */
export const sendRefreshToken = (res: Response, token: string) => {
  //TODO get better cookie name
  //sticks the token in the cookie
  res.cookie("oid", token, {
    httpOnly: true,
  });
};
