import { User } from "./entities/User";
import { sign } from "jsonwebtoken";
import "dotenv/config";

//TODO: use environment variables
/**
 *
 * @param user the user Object passed in
 * @returns string for the access token for that user, the short term token
 */
export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, "asdfefe", {
    expiresIn: "15m",
  });
};

//TODO: use environment variables
/**
 *
 * @param user the User object passed in
 * @returns string which is the signed refresh token for that user
 */
export const createRefreshToken = (user: User) => {
  //pass in the token version
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    "iwueyiwuye",
    {
      expiresIn: "10y",
    }
  );
};
