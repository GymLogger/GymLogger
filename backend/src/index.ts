import express from "express";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
// import { TestResolver } from "./resolvers/helloworld";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Context } from "./types";
import "reflect-metadata";
import { UserResolver } from "./resolvers/user";

import { dataSource } from "./data-source";
import { verify } from "jsonwebtoken";
import { User } from "./entities/User";
import { createAccessToken, createRefreshToken } from "./auth";
import { sendRefreshToken } from "./sendRefreshToken";
import cors from "cors";
import cookieParser from "cookie-parser";
import { WorkoutResolver } from "./resolvers/workout";

const main = async () => {
  //connects to the postgres DB
  dataSource
    .initialize()
    .then(() => {
      console.log("initialized successfully");
    })
    .catch((err) => {
      console.log("data source initialization error occurred: ", err);
    });

  const app = express(); //creating the express server
  app.use(cookieParser()); //using cookie parser middleware to make reading cookies easier

  app.get("/", (_, res) => {
    res.send("API working");
  });

  //special route for refreshing the token so it doesnt go to graphql
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.oid; //read cookie, which is refresh token
    console.log("entered post req");
    console.log("token: ", req.cookies.oid);
    //dont refresh token if it isnt there
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      //verify from jsonwebtoken, check that token has the correct secret and is not expired
      //TODO fix hardcoding
      payload = verify(token, "iwueyiwuye");
    } catch (error) {
      console.log(error);
      return res.send({ ok: false, accessToken: "" });
    }

    //token must be valid by this point, but token version may be wrong
    const user = await User.findOne({ where: { id: payload.userId } });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }
    //creates a refresh token when access token is also created
    sendRefreshToken(res, createRefreshToken(user));

    //sends the accessToken
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  //express server has an endpoint for /graphql using cors
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  //express app listening on port 4000
  app.listen(4000, () => {
    console.log(`🚀 Listening on port 4000`);
  });

  //apollo server declared
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, WorkoutResolver], //sets resolvers
      validate: false,
    }),
    //passing in session context
    //TODO - does payload need to be passed in?
    context: ({ req, res }): Context => ({
      req,
      res,
    }),
    cache: "bounded", //security thing
    //only for prod, remove in dev
    //TODO fix this with env variables
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app }); //connects express server and apollo server
};

main().catch((err) => {
  console.log(err);
});
