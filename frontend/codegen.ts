import type { CodegenConfig } from "@graphql-codegen/cli";

/**
 * Config for generating graphql documents, queries, types,etc
 * Gets the resolvers from the schema, hosted on the apollo server via express
 */
const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/graphql/",
  generates: {
    "./src/generated/": {
      preset: "client",
      plugins: ["typescript-react-apollo"],
    },
  },
};

export default config;
