"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_plugin_landing_page_graphql_playground_1 = require("@apollo/server-plugin-landing-page-graphql-playground");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
require("reflect-metadata");
const user_1 = require("./resolvers/user");
const data_source_1 = require("./data-source");
const main = async () => {
    data_source_1.dataSource
        .initialize()
        .then(() => {
        console.log("initialized successfully");
    })
        .catch((err) => {
        console.log("data source initialization error occurred: ", err);
    });
    const app = (0, express_1.default)();
    app.get("/", (_, res) => {
        res.send("API working");
    });
    app.listen(4000, () => {
        console.log(`🚀 Listening on port 4000`);
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
        }),
        cache: "bounded",
        plugins: [(0, server_plugin_landing_page_graphql_playground_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map