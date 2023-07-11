import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  //TODO get better cookie name
  res.cookie("oid", token, {
    httpOnly: true,
  });
};
