import { User } from "./entities/User";
import { sign } from "jsonwebtoken";
import "dotenv/config";

//TODO: use environment variables
export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, "asdfefe", {
    expiresIn: "10y",
  });
};

//TODO: use environment variables
export const createRefreshToken = (user: User) => {
  return sign({ userId: user.id }, "iwueyiwuye", {
    expiresIn: "10y",
  });
};
