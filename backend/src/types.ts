import { Request, Response } from "express";

/**
 * Describes requests made to and from the express server
 */
export type Context = {
  req: Request; //incoming request from client
  res: Response; //response to client
  payload?: { userId: number }; //userID also being stored
};

export type MyExercise = {
  exercise: string;
  variation: string;
  muscleGroup: string[];
};
