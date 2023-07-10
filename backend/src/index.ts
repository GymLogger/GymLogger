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
import { createAccessToken } from "./auth";

const main = async () => {
  dataSource
    .initialize()
    .then(() => {
      console.log("initialized successfully");
    })
    .catch((err) => {
      console.log("data source initialization error occurred: ", err);
    });

  const app = express();

  app.get("/", (_, res) => {
    res.send("API working");
  });

  //special route for refreshing the token so it doesnt go to graphql
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid; //read cookie, which is refresh token
    console.log("entered post req");
    //dont refresh token if it isnt there
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      //verify from jsonwebtoken, check that token has the correct secret and is not expired
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      console.log(error);
      return res.send({ ok: false, accessToken: "" });
    }

    //token must be valid by this point
    const user = await User.findOne({ where: { id: payload.userId } });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    //creates a refresh token when access token is also created
    // sendRefreshToken(res, createRefreshToken(user));
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  app.listen(4000, () => {
    console.log(`🚀 Listening on port 4000`);
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }): Context => ({
      req,
      res,
    }),
    cache: "bounded",
    //only for prod
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
};

main().catch((err) => {
  console.log(err);
});
