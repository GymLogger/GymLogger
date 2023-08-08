import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import { Context } from "./types";
import { verify } from "jsonwebtoken";
import "dotenv/config";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  //user will send an authorization header like this
  // bearer <random looking string>
  const authorization = context.req.headers["authorization"];

  console.log("authorization: ", context.req.headers);

  if (!authorization) {
    throw new Error("not authenticated");
  }
  try {
    const token = authorization.split(" ")[1]; //gets 2nd value after delimited
    //must use same secret to verify token as it was signed with
    //TODO use env variables
    const payload = verify(token, "asdfefe"); //payload is {userId: user.id}
    //stores payload on context
    interface payloadReturn {
      userId: number;
    }

    context.payload = payload as payloadReturn;
  } catch (error) {
    console.log(error);
  }
  return next();
};
