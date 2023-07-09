import express from "express";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
// import { TestResolver } from "./resolvers/helloworld";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Context } from "./types";
import "reflect-metadata";
import { UserResolver } from "./resolvers/user";
import { dataSource } from "./data-source";

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
