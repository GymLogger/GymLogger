import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
// import { TestResolver } from "./resolvers/helloworld";
import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import { Context } from "./data/types";

import { WorkoutResolver } from "./resolvers/workout";
import app from "./app";
import { MyExercisesResolver } from "./resolvers/myExercises";

const main = async () => {
  //express app listening on port 4000
  app.listen(4000, () => {
    console.log(`🚀 Listening on port 4000`);
  });

  //apollo server declared
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, WorkoutResolver, MyExercisesResolver], //sets resolvers
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
