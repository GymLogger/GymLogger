/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CreateMyExercises($exerciseName: String!, $muscleGroup: [String!]!) {\n  createMyExercises(exerciseName: $exerciseName, muscleGroup: $muscleGroup) {\n    myExerciseId\n    exerciseName\n    muscleGroup\n  }\n}": types.CreateMyExercisesDocument,
    "mutation CreateWorkout($name: String!) {\n  createWorkout(name: $name) {\n    workoutId\n    creatorId\n    createdAt\n  }\n}": types.CreateWorkoutDocument,
    "mutation DeleteMyExercise($myExerciseId: Int!) {\n  deleteMyExercise(myExerciseId: $myExerciseId)\n}": types.DeleteMyExerciseDocument,
    "mutation DeleteWorkout($workoutId: Int!) {\n  deleteWorkout(workoutId: $workoutId)\n}": types.DeleteWorkoutDocument,
    "mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    accessToken\n    errors {\n      field\n      message\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($email: String!, $password: String!) {\n  register(password: $password, email: $email) {\n    accessToken\n    errors {\n      field\n      message\n    }\n  }\n}": types.RegisterDocument,
    "mutation UpdateMyExerciseMuscleGroup($muscleGroup: String!, $myExerciseId: Float!) {\n  updateMyExerciseMuscleGroup(\n    muscleGroup: $muscleGroup\n    myExerciseId: $myExerciseId\n  ) {\n    myExerciseId\n    exerciseName\n    muscleGroup\n    creatorId\n  }\n}": types.UpdateMyExerciseMuscleGroupDocument,
    "mutation UpdateMyExerciseName($exerciseName: String!, $myExerciseId: Float!) {\n  updateMyExerciseName(exerciseName: $exerciseName, myExerciseId: $myExerciseId) {\n    myExerciseId\n    exerciseName\n    muscleGroup\n    creatorId\n  }\n}": types.UpdateMyExerciseNameDocument,
    "query GetAllWorkouts {\n  getAllWorkouts {\n    workoutId\n    name\n    createdAt\n    updatedAt\n    creatorId\n  }\n}": types.GetAllWorkoutsDocument,
    "query GetMyExercises {\n  getMyExercises {\n    exerciseName\n    muscleGroup\n    myExerciseId\n    creatorId\n  }\n}": types.GetMyExercisesDocument,
    "query GetSingleMyExercise($myExerciseId: Int!) {\n  getSingleMyExercise(myExerciseId: $myExerciseId) {\n    myExerciseId\n    exerciseName\n    muscleGroup\n  }\n}": types.GetSingleMyExerciseDocument,
    "query GetUsers {\n  getUsers {\n    id\n    email\n  }\n}": types.GetUsersDocument,
    "query GetWorkouts {\n  getWorkouts {\n    workoutId\n    name\n    createdAt\n    updatedAt\n    creatorId\n  }\n}": types.GetWorkoutsDocument,
    "query Me {\n  me {\n    id\n    email\n    createdAt\n    updatedAt\n  }\n}": types.MeDocument,
    "query MeAuth {\n  meAuth {\n    id\n    email\n    createdAt\n    updatedAt\n  }\n}": types.MeAuthDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateMyExercises($exerciseName: String!, $muscleGroup: [String!]!) {\n  createMyExercises(exerciseName: $exerciseName, muscleGroup: $muscleGroup) {\n    myExerciseId\n    exerciseName\n    muscleGroup\n  }\n}"): (typeof documents)["mutation CreateMyExercises($exerciseName: String!, $muscleGroup: [String!]!) {\n  createMyExercises(exerciseName: $exerciseName, muscleGroup: $muscleGroup) {\n    myExerciseId\n    exerciseName\n    muscleGroup\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateWorkout($name: String!) {\n  createWorkout(name: $name) {\n    workoutId\n    creatorId\n    createdAt\n  }\n}"): (typeof documents)["mutation CreateWorkout($name: String!) {\n  createWorkout(name: $name) {\n    workoutId\n    creatorId\n    createdAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteMyExercise($myExerciseId: Int!) {\n  deleteMyExercise(myExerciseId: $myExerciseId)\n}"): (typeof documents)["mutation DeleteMyExercise($myExerciseId: Int!) {\n  deleteMyExercise(myExerciseId: $myExerciseId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteWorkout($workoutId: Int!) {\n  deleteWorkout(workoutId: $workoutId)\n}"): (typeof documents)["mutation DeleteWorkout($workoutId: Int!) {\n  deleteWorkout(workoutId: $workoutId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    accessToken\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    accessToken\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($email: String!, $password: String!) {\n  register(password: $password, email: $email) {\n    accessToken\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation Register($email: String!, $password: String!) {\n  register(password: $password, email: $email) {\n    accessToken\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateMyExerciseMuscleGroup($muscleGroup: String!, $myExerciseId: Float!) {\n  updateMyExerciseMuscleGroup(\n    muscleGroup: $muscleGroup\n    myExerciseId: $myExerciseId\n  ) {\n    myExerciseId\n    exerciseName\n    muscleGroup\n    creatorId\n  }\n}"): (typeof documents)["mutation UpdateMyExerciseMuscleGroup($muscleGroup: String!, $myExerciseId: Float!) {\n  updateMyExerciseMuscleGroup(\n    muscleGroup: $muscleGroup\n    myExerciseId: $myExerciseId\n  ) {\n    myExerciseId\n    exerciseName\n    muscleGroup\n    creatorId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateMyExerciseName($exerciseName: String!, $myExerciseId: Float!) {\n  updateMyExerciseName(exerciseName: $exerciseName, myExerciseId: $myExerciseId) {\n    myExerciseId\n    exerciseName\n    muscleGroup\n    creatorId\n  }\n}"): (typeof documents)["mutation UpdateMyExerciseName($exerciseName: String!, $myExerciseId: Float!) {\n  updateMyExerciseName(exerciseName: $exerciseName, myExerciseId: $myExerciseId) {\n    myExerciseId\n    exerciseName\n    muscleGroup\n    creatorId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllWorkouts {\n  getAllWorkouts {\n    workoutId\n    name\n    createdAt\n    updatedAt\n    creatorId\n  }\n}"): (typeof documents)["query GetAllWorkouts {\n  getAllWorkouts {\n    workoutId\n    name\n    createdAt\n    updatedAt\n    creatorId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetMyExercises {\n  getMyExercises {\n    exerciseName\n    muscleGroup\n    myExerciseId\n    creatorId\n  }\n}"): (typeof documents)["query GetMyExercises {\n  getMyExercises {\n    exerciseName\n    muscleGroup\n    myExerciseId\n    creatorId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetSingleMyExercise($myExerciseId: Int!) {\n  getSingleMyExercise(myExerciseId: $myExerciseId) {\n    myExerciseId\n    exerciseName\n    muscleGroup\n  }\n}"): (typeof documents)["query GetSingleMyExercise($myExerciseId: Int!) {\n  getSingleMyExercise(myExerciseId: $myExerciseId) {\n    myExerciseId\n    exerciseName\n    muscleGroup\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUsers {\n  getUsers {\n    id\n    email\n  }\n}"): (typeof documents)["query GetUsers {\n  getUsers {\n    id\n    email\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetWorkouts {\n  getWorkouts {\n    workoutId\n    name\n    createdAt\n    updatedAt\n    creatorId\n  }\n}"): (typeof documents)["query GetWorkouts {\n  getWorkouts {\n    workoutId\n    name\n    createdAt\n    updatedAt\n    creatorId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    id\n    email\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query Me {\n  me {\n    id\n    email\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MeAuth {\n  meAuth {\n    id\n    email\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query MeAuth {\n  meAuth {\n    id\n    email\n    createdAt\n    updatedAt\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;