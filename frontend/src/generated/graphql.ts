/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Exercise = {
  __typename?: "Exercise";
  createdAt: Scalars["String"]["output"];
  id: Scalars["Float"]["output"];
  name: Scalars["String"]["output"];
  sets: Array<Set>;
  updatedAt: Scalars["String"]["output"];
  variation: Scalars["String"]["output"];
  workout: Workout;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"]["output"];
  message: Scalars["String"]["output"];
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  accessToken?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Array<FieldError>>;
};

export type Mutation = {
  __typename?: "Mutation";
  createWorkout: Workout;
  deleteWorkout: Scalars["Boolean"]["output"];
  login: LoginResponse;
  logout: Scalars["Boolean"]["output"];
  register: LoginResponse;
  revokeRefreshTokensForUser: Scalars["Boolean"]["output"];
  updateWorkoutName: Workout;
};

export type MutationCreateWorkoutArgs = {
  name: Scalars["String"]["input"];
};

export type MutationDeleteWorkoutArgs = {
  workoutId: Scalars["Int"]["input"];
};

export type MutationLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationRegisterArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars["Int"]["input"];
};

export type MutationUpdateWorkoutNameArgs = {
  name: Scalars["String"]["input"];
  workoutId: Scalars["Int"]["input"];
};

export type Query = {
  __typename?: "Query";
  getAllWorkouts: Array<Workout>;
  getUsers: Array<User>;
  getWorkouts?: Maybe<Array<Workout>>;
  hello: Scalars["String"]["output"];
  me?: Maybe<User>;
  meAuth?: Maybe<User>;
  workout?: Maybe<Workout>;
};

export type QueryWorkoutArgs = {
  workoutId: Scalars["Int"]["input"];
};

export type Set = {
  __typename?: "Set";
  createdAt: Scalars["String"]["output"];
  exercise: Array<Exercise>;
  id: Scalars["Float"]["output"];
  reps: Scalars["Float"]["output"];
  updatedAt: Scalars["String"]["output"];
  weight: Scalars["Float"]["output"];
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["Float"]["output"];
  updatedAt: Scalars["String"]["output"];
  workouts?: Maybe<Array<Workout>>;
};

export type Workout = {
  __typename?: "Workout";
  createdAt: Scalars["String"]["output"];
  creator: User;
  creatorId?: Maybe<Scalars["Float"]["output"]>;
  exercises: Array<Exercise>;
  name: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
  workoutId: Scalars["Float"]["output"];
};

export type CreateWorkoutMutationVariables = Exact<{
  name: Scalars["String"]["input"];
}>;

export type CreateWorkoutMutation = {
  __typename?: "Mutation";
  createWorkout: {
    __typename?: "Workout";
    workoutId: number;
    creatorId?: number | null;
    createdAt: string;
    exercises: Array<{ __typename?: "Exercise"; name: string }>;
  };
};

export type DeleteWorkoutMutationVariables = Exact<{
  workoutId: Scalars["Int"]["input"];
}>;

export type DeleteWorkoutMutation = {
  __typename?: "Mutation";
  deleteWorkout: boolean;
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginResponse";
    accessToken?: string | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "LoginResponse";
    accessToken?: string | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

export type GetAllWorkoutsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllWorkoutsQuery = {
  __typename?: "Query";
  getAllWorkouts: Array<{
    __typename?: "Workout";
    workoutId: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    creatorId?: number | null;
  }>;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: "Query";
  getUsers: Array<{ __typename?: "User"; id: number; email: string }>;
};

export type GetWorkoutsQueryVariables = Exact<{ [key: string]: never }>;

export type GetWorkoutsQuery = {
  __typename?: "Query";
  getWorkouts?: Array<{
    __typename?: "Workout";
    workoutId: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    creatorId?: number | null;
  }> | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type MeAuthQueryVariables = Exact<{ [key: string]: never }>;

export type MeAuthQuery = {
  __typename?: "Query";
  meAuth?: {
    __typename?: "User";
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export const CreateWorkoutDocument = gql`
  mutation CreateWorkout($name: String!) {
    createWorkout(name: $name) {
      workoutId
      creatorId
      exercises {
        name
      }
      createdAt
    }
  }
`;
export type CreateWorkoutMutationFn = Apollo.MutationFunction<
  CreateWorkoutMutation,
  CreateWorkoutMutationVariables
>;

/**
 * __useCreateWorkoutMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutMutation, { data, loading, error }] = useCreateWorkoutMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateWorkoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateWorkoutMutation,
    CreateWorkoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateWorkoutMutation,
    CreateWorkoutMutationVariables
  >(CreateWorkoutDocument, options);
}
export type CreateWorkoutMutationHookResult = ReturnType<
  typeof useCreateWorkoutMutation
>;
export type CreateWorkoutMutationResult =
  Apollo.MutationResult<CreateWorkoutMutation>;
export type CreateWorkoutMutationOptions = Apollo.BaseMutationOptions<
  CreateWorkoutMutation,
  CreateWorkoutMutationVariables
>;
export const DeleteWorkoutDocument = gql`
  mutation DeleteWorkout($workoutId: Int!) {
    deleteWorkout(workoutId: $workoutId)
  }
`;
export type DeleteWorkoutMutationFn = Apollo.MutationFunction<
  DeleteWorkoutMutation,
  DeleteWorkoutMutationVariables
>;

/**
 * __useDeleteWorkoutMutation__
 *
 * To run a mutation, you first call `useDeleteWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkoutMutation, { data, loading, error }] = useDeleteWorkoutMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *   },
 * });
 */
export function useDeleteWorkoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteWorkoutMutation,
    DeleteWorkoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteWorkoutMutation,
    DeleteWorkoutMutationVariables
  >(DeleteWorkoutDocument, options);
}
export type DeleteWorkoutMutationHookResult = ReturnType<
  typeof useDeleteWorkoutMutation
>;
export type DeleteWorkoutMutationResult =
  Apollo.MutationResult<DeleteWorkoutMutation>;
export type DeleteWorkoutMutationOptions = Apollo.BaseMutationOptions<
  DeleteWorkoutMutation,
  DeleteWorkoutMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      errors {
        field
        message
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($email: String!, $password: String!) {
    register(password: $password, email: $email) {
      accessToken
      errors {
        field
        message
      }
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const GetAllWorkoutsDocument = gql`
  query GetAllWorkouts {
    getAllWorkouts {
      workoutId
      name
      createdAt
      updatedAt
      creatorId
    }
  }
`;

/**
 * __useGetAllWorkoutsQuery__
 *
 * To run a query within a React component, call `useGetAllWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWorkoutsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllWorkoutsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllWorkoutsQuery,
    GetAllWorkoutsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllWorkoutsQuery, GetAllWorkoutsQueryVariables>(
    GetAllWorkoutsDocument,
    options
  );
}
export function useGetAllWorkoutsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllWorkoutsQuery,
    GetAllWorkoutsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllWorkoutsQuery, GetAllWorkoutsQueryVariables>(
    GetAllWorkoutsDocument,
    options
  );
}
export type GetAllWorkoutsQueryHookResult = ReturnType<
  typeof useGetAllWorkoutsQuery
>;
export type GetAllWorkoutsLazyQueryHookResult = ReturnType<
  typeof useGetAllWorkoutsLazyQuery
>;
export type GetAllWorkoutsQueryResult = Apollo.QueryResult<
  GetAllWorkoutsQuery,
  GetAllWorkoutsQueryVariables
>;
export const GetUsersDocument = gql`
  query GetUsers {
    getUsers {
      id
      email
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
export const GetWorkoutsDocument = gql`
  query GetWorkouts {
    getWorkouts {
      workoutId
      name
      createdAt
      updatedAt
      creatorId
    }
  }
`;

/**
 * __useGetWorkoutsQuery__
 *
 * To run a query within a React component, call `useGetWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkoutsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWorkoutsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetWorkoutsQuery,
    GetWorkoutsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetWorkoutsQuery, GetWorkoutsQueryVariables>(
    GetWorkoutsDocument,
    options
  );
}
export function useGetWorkoutsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWorkoutsQuery,
    GetWorkoutsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetWorkoutsQuery, GetWorkoutsQueryVariables>(
    GetWorkoutsDocument,
    options
  );
}
export type GetWorkoutsQueryHookResult = ReturnType<typeof useGetWorkoutsQuery>;
export type GetWorkoutsLazyQueryHookResult = ReturnType<
  typeof useGetWorkoutsLazyQuery
>;
export type GetWorkoutsQueryResult = Apollo.QueryResult<
  GetWorkoutsQuery,
  GetWorkoutsQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      email
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MeAuthDocument = gql`
  query MeAuth {
    meAuth {
      id
      email
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useMeAuthQuery__
 *
 * To run a query within a React component, call `useMeAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeAuthQuery(
  baseOptions?: Apollo.QueryHookOptions<MeAuthQuery, MeAuthQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeAuthQuery, MeAuthQueryVariables>(
    MeAuthDocument,
    options
  );
}
export function useMeAuthLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeAuthQuery, MeAuthQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeAuthQuery, MeAuthQueryVariables>(
    MeAuthDocument,
    options
  );
}
export type MeAuthQueryHookResult = ReturnType<typeof useMeAuthQuery>;
export type MeAuthLazyQueryHookResult = ReturnType<typeof useMeAuthLazyQuery>;
export type MeAuthQueryResult = Apollo.QueryResult<
  MeAuthQuery,
  MeAuthQueryVariables
>;
