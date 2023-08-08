import { Request, Response } from "express";

/**
 * Describes requests made to and from the express server
 */
export type Context = {
  req: Request;
  res: Response;
  payload?: { userId: number };
};
