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
  creatorId: Scalars["Float"]["output"];
  exerciseId: Scalars["Float"]["output"];
  exerciseName: Scalars["String"]["output"];
  muscleGroup: Array<Scalars["String"]["output"]>;
  sets: Array<Sets>;
  unilateral: Scalars["Boolean"]["output"];
  updatedAt: Scalars["String"]["output"];
  variation: Scalars["String"]["output"];
  workout: Workout;
  workoutId: Scalars["Float"]["output"];
};

export type ExerciseInput = {
  myExerciseId: Scalars["Int"]["input"];
  sets: Array<SetInput>;
  variation: Scalars["String"]["input"];
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
  createExercise: Exercise;
  createFullWorkout: Workout;
  createMyExercises: MyExercises;
  createSet: Scalars["Boolean"]["output"];
  createWorkout: Workout;
  deleteExercise: Scalars["Boolean"]["output"];
  deleteMyExercise: Scalars["Boolean"]["output"];
  deleteWorkout: Scalars["Boolean"]["output"];
  login: LoginResponse;
  logout: Scalars["Boolean"]["output"];
  register: LoginResponse;
  revokeRefreshTokensForUser: Scalars["Boolean"]["output"];
  updateMyExerciseMuscleGroup: MyExercises;
  updateMyExerciseName: MyExercises;
  updateWorkoutName: Workout;
};

export type MutationCreateExerciseArgs = {
  myExerciseId: Scalars["Float"]["input"];
  variation: Scalars["String"]["input"];
  workoutId: Scalars["Float"]["input"];
};

export type MutationCreateFullWorkoutArgs = {
  exercises: Array<ExerciseInput>;
  name: Scalars["String"]["input"];
};

export type MutationCreateMyExercisesArgs = {
  exerciseName: Scalars["String"]["input"];
  muscleGroup: Array<Scalars["String"]["input"]>;
};

export type MutationCreateSetArgs = {
  creatorId: Scalars["Float"]["input"];
  exerciseId: Scalars["Float"]["input"];
  reps: Scalars["Float"]["input"];
  time: Scalars["Float"]["input"];
  weight: Scalars["Float"]["input"];
};

export type MutationCreateWorkoutArgs = {
  name: Scalars["String"]["input"];
};

export type MutationDeleteExerciseArgs = {
  exerciseId: Scalars["Int"]["input"];
};

export type MutationDeleteMyExerciseArgs = {
  myExerciseId: Scalars["Int"]["input"];
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

export type MutationUpdateMyExerciseMuscleGroupArgs = {
  muscleGroup: Scalars["String"]["input"];
  myExerciseId: Scalars["Float"]["input"];
};

export type MutationUpdateMyExerciseNameArgs = {
  exerciseName: Scalars["String"]["input"];
  myExerciseId: Scalars["Float"]["input"];
};

export type MutationUpdateWorkoutNameArgs = {
  name: Scalars["String"]["input"];
  workoutId: Scalars["Int"]["input"];
};

export type MyExercises = {
  __typename?: "MyExercises";
  createdAt: Scalars["String"]["output"];
  creator: User;
  creatorId?: Maybe<Scalars["Float"]["output"]>;
  exerciseName: Scalars["String"]["output"];
  muscleGroup: Array<Scalars["String"]["output"]>;
  myExerciseId: Scalars["Float"]["output"];
  updatedAt: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  getAllWorkouts: Array<Workout>;
  getExercise?: Maybe<Exercise>;
  getExercisesForWorkout?: Maybe<Array<Exercise>>;
  getMyExercises: Array<MyExercises>;
  getSet?: Maybe<Sets>;
  getSetsForExercise?: Maybe<Array<Sets>>;
  getSingleMyExercise: MyExercises;
  getUsers: Array<User>;
  getWorkouts?: Maybe<Array<Workout>>;
  hello: Scalars["String"]["output"];
  me?: Maybe<User>;
  meAuth?: Maybe<User>;
  workout?: Maybe<Workout>;
};

export type QueryGetExerciseArgs = {
  exerciseId: Scalars["Int"]["input"];
};

export type QueryGetExercisesForWorkoutArgs = {
  workoutId: Scalars["Float"]["input"];
};

export type QueryGetSetArgs = {
  setId: Scalars["Float"]["input"];
};

export type QueryGetSetsForExerciseArgs = {
  exerciseId: Scalars["Float"]["input"];
};

export type QueryGetSingleMyExerciseArgs = {
  myExerciseId: Scalars["Int"]["input"];
};

export type QueryWorkoutArgs = {
  workoutId: Scalars["Int"]["input"];
};

export type SetInput = {
  reps: Scalars["Int"]["input"];
  time: Scalars["Int"]["input"];
  weight: Scalars["Int"]["input"];
};

export type Sets = {
  __typename?: "Sets";
  createdAt: Scalars["String"]["output"];
  creatorId: Scalars["Float"]["output"];
  exercise: Array<Exercise>;
  exerciseId: Scalars["Float"]["output"];
  reps: Scalars["Float"]["output"];
  setId: Scalars["Float"]["output"];
  time: Scalars["Float"]["output"];
  updatedAt: Scalars["String"]["output"];
  weight: Scalars["Float"]["output"];
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["Float"]["output"];
  myExercises?: Maybe<Array<MyExercises>>;
  updatedAt: Scalars["String"]["output"];
  workouts?: Maybe<Array<Workout>>;
};

export type Workout = {
  __typename?: "Workout";
  createdAt: Scalars["String"]["output"];
  creator: User;
  creatorId?: Maybe<Scalars["Float"]["output"]>;
  exercises?: Maybe<Array<Exercise>>;
  name: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
  workoutId: Scalars["Float"]["output"];
};

export type CreateMyExercisesMutationVariables = Exact<{
  exerciseName: Scalars["String"]["input"];
  muscleGroup: Array<Scalars["String"]["input"]> | Scalars["String"]["input"];
}>;

export type CreateMyExercisesMutation = {
  __typename?: "Mutation";
  createMyExercises: {
    __typename?: "MyExercises";
    myExerciseId: number;
    exerciseName: string;
    muscleGroup: Array<string>;
  };
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
  };
};

export type DeleteMyExerciseMutationVariables = Exact<{
  myExerciseId: Scalars["Int"]["input"];
}>;

export type DeleteMyExerciseMutation = {
  __typename?: "Mutation";
  deleteMyExercise: boolean;
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

export type UpdateMyExerciseMuscleGroupMutationVariables = Exact<{
  muscleGroup: Scalars["String"]["input"];
  myExerciseId: Scalars["Float"]["input"];
}>;

export type UpdateMyExerciseMuscleGroupMutation = {
  __typename?: "Mutation";
  updateMyExerciseMuscleGroup: {
    __typename?: "MyExercises";
    myExerciseId: number;
    exerciseName: string;
    muscleGroup: Array<string>;
    creatorId?: number | null;
  };
};

export type UpdateMyExerciseNameMutationVariables = Exact<{
  exerciseName: Scalars["String"]["input"];
  myExerciseId: Scalars["Float"]["input"];
}>;

export type UpdateMyExerciseNameMutation = {
  __typename?: "Mutation";
  updateMyExerciseName: {
    __typename?: "MyExercises";
    myExerciseId: number;
    exerciseName: string;
    muscleGroup: Array<string>;
    creatorId?: number | null;
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

export type GetMyExercisesQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyExercisesQuery = {
  __typename?: "Query";
  getMyExercises: Array<{
    __typename?: "MyExercises";
    exerciseName: string;
    muscleGroup: Array<string>;
    myExerciseId: number;
    creatorId?: number | null;
  }>;
};

export type GetSingleMyExerciseQueryVariables = Exact<{
  myExerciseId: Scalars["Int"]["input"];
}>;

export type GetSingleMyExerciseQuery = {
  __typename?: "Query";
  getSingleMyExercise: {
    __typename?: "MyExercises";
    myExerciseId: number;
    exerciseName: string;
    muscleGroup: Array<string>;
  };
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

export const CreateMyExercisesDocument = gql`
  mutation CreateMyExercises($exerciseName: String!, $muscleGroup: [String!]!) {
    createMyExercises(exerciseName: $exerciseName, muscleGroup: $muscleGroup) {
      myExerciseId
      exerciseName
      muscleGroup
    }
  }
`;
export type CreateMyExercisesMutationFn = Apollo.MutationFunction<
  CreateMyExercisesMutation,
  CreateMyExercisesMutationVariables
>;

/**
 * __useCreateMyExercisesMutation__
 *
 * To run a mutation, you first call `useCreateMyExercisesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMyExercisesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMyExercisesMutation, { data, loading, error }] = useCreateMyExercisesMutation({
 *   variables: {
 *      exerciseName: // value for 'exerciseName'
 *      muscleGroup: // value for 'muscleGroup'
 *   },
 * });
 */
export function useCreateMyExercisesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMyExercisesMutation,
    CreateMyExercisesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateMyExercisesMutation,
    CreateMyExercisesMutationVariables
  >(CreateMyExercisesDocument, options);
}
export type CreateMyExercisesMutationHookResult = ReturnType<
  typeof useCreateMyExercisesMutation
>;
export type CreateMyExercisesMutationResult =
  Apollo.MutationResult<CreateMyExercisesMutation>;
export type CreateMyExercisesMutationOptions = Apollo.BaseMutationOptions<
  CreateMyExercisesMutation,
  CreateMyExercisesMutationVariables
>;
export const CreateWorkoutDocument = gql`
  mutation CreateWorkout($name: String!) {
    createWorkout(name: $name) {
      workoutId
      creatorId
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
export const DeleteMyExerciseDocument = gql`
  mutation DeleteMyExercise($myExerciseId: Int!) {
    deleteMyExercise(myExerciseId: $myExerciseId)
  }
`;
export type DeleteMyExerciseMutationFn = Apollo.MutationFunction<
  DeleteMyExerciseMutation,
  DeleteMyExerciseMutationVariables
>;

/**
 * __useDeleteMyExerciseMutation__
 *
 * To run a mutation, you first call `useDeleteMyExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMyExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMyExerciseMutation, { data, loading, error }] = useDeleteMyExerciseMutation({
 *   variables: {
 *      myExerciseId: // value for 'myExerciseId'
 *   },
 * });
 */
export function useDeleteMyExerciseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteMyExerciseMutation,
    DeleteMyExerciseMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteMyExerciseMutation,
    DeleteMyExerciseMutationVariables
  >(DeleteMyExerciseDocument, options);
}
export type DeleteMyExerciseMutationHookResult = ReturnType<
  typeof useDeleteMyExerciseMutation
>;
export type DeleteMyExerciseMutationResult =
  Apollo.MutationResult<DeleteMyExerciseMutation>;
export type DeleteMyExerciseMutationOptions = Apollo.BaseMutationOptions<
  DeleteMyExerciseMutation,
  DeleteMyExerciseMutationVariables
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
export const UpdateMyExerciseMuscleGroupDocument = gql`
  mutation UpdateMyExerciseMuscleGroup(
    $muscleGroup: String!
    $myExerciseId: Float!
  ) {
    updateMyExerciseMuscleGroup(
      muscleGroup: $muscleGroup
      myExerciseId: $myExerciseId
    ) {
      myExerciseId
      exerciseName
      muscleGroup
      creatorId
    }
  }
`;
export type UpdateMyExerciseMuscleGroupMutationFn = Apollo.MutationFunction<
  UpdateMyExerciseMuscleGroupMutation,
  UpdateMyExerciseMuscleGroupMutationVariables
>;

/**
 * __useUpdateMyExerciseMuscleGroupMutation__
 *
 * To run a mutation, you first call `useUpdateMyExerciseMuscleGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMyExerciseMuscleGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMyExerciseMuscleGroupMutation, { data, loading, error }] = useUpdateMyExerciseMuscleGroupMutation({
 *   variables: {
 *      muscleGroup: // value for 'muscleGroup'
 *      myExerciseId: // value for 'myExerciseId'
 *   },
 * });
 */
export function useUpdateMyExerciseMuscleGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMyExerciseMuscleGroupMutation,
    UpdateMyExerciseMuscleGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateMyExerciseMuscleGroupMutation,
    UpdateMyExerciseMuscleGroupMutationVariables
  >(UpdateMyExerciseMuscleGroupDocument, options);
}
export type UpdateMyExerciseMuscleGroupMutationHookResult = ReturnType<
  typeof useUpdateMyExerciseMuscleGroupMutation
>;
export type UpdateMyExerciseMuscleGroupMutationResult =
  Apollo.MutationResult<UpdateMyExerciseMuscleGroupMutation>;
export type UpdateMyExerciseMuscleGroupMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateMyExerciseMuscleGroupMutation,
    UpdateMyExerciseMuscleGroupMutationVariables
  >;
export const UpdateMyExerciseNameDocument = gql`
  mutation UpdateMyExerciseName($exerciseName: String!, $myExerciseId: Float!) {
    updateMyExerciseName(
      exerciseName: $exerciseName
      myExerciseId: $myExerciseId
    ) {
      myExerciseId
      exerciseName
      muscleGroup
      creatorId
    }
  }
`;
export type UpdateMyExerciseNameMutationFn = Apollo.MutationFunction<
  UpdateMyExerciseNameMutation,
  UpdateMyExerciseNameMutationVariables
>;

/**
 * __useUpdateMyExerciseNameMutation__
 *
 * To run a mutation, you first call `useUpdateMyExerciseNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMyExerciseNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMyExerciseNameMutation, { data, loading, error }] = useUpdateMyExerciseNameMutation({
 *   variables: {
 *      exerciseName: // value for 'exerciseName'
 *      myExerciseId: // value for 'myExerciseId'
 *   },
 * });
 */
export function useUpdateMyExerciseNameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMyExerciseNameMutation,
    UpdateMyExerciseNameMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateMyExerciseNameMutation,
    UpdateMyExerciseNameMutationVariables
  >(UpdateMyExerciseNameDocument, options);
}
export type UpdateMyExerciseNameMutationHookResult = ReturnType<
  typeof useUpdateMyExerciseNameMutation
>;
export type UpdateMyExerciseNameMutationResult =
  Apollo.MutationResult<UpdateMyExerciseNameMutation>;
export type UpdateMyExerciseNameMutationOptions = Apollo.BaseMutationOptions<
  UpdateMyExerciseNameMutation,
  UpdateMyExerciseNameMutationVariables
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
export const GetMyExercisesDocument = gql`
  query GetMyExercises {
    getMyExercises {
      exerciseName
      muscleGroup
      myExerciseId
      creatorId
    }
  }
`;

/**
 * __useGetMyExercisesQuery__
 *
 * To run a query within a React component, call `useGetMyExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyExercisesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyExercisesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyExercisesQuery,
    GetMyExercisesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyExercisesQuery, GetMyExercisesQueryVariables>(
    GetMyExercisesDocument,
    options
  );
}
export function useGetMyExercisesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyExercisesQuery,
    GetMyExercisesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMyExercisesQuery, GetMyExercisesQueryVariables>(
    GetMyExercisesDocument,
    options
  );
}
export type GetMyExercisesQueryHookResult = ReturnType<
  typeof useGetMyExercisesQuery
>;
export type GetMyExercisesLazyQueryHookResult = ReturnType<
  typeof useGetMyExercisesLazyQuery
>;
export type GetMyExercisesQueryResult = Apollo.QueryResult<
  GetMyExercisesQuery,
  GetMyExercisesQueryVariables
>;
export const GetSingleMyExerciseDocument = gql`
  query GetSingleMyExercise($myExerciseId: Int!) {
    getSingleMyExercise(myExerciseId: $myExerciseId) {
      myExerciseId
      exerciseName
      muscleGroup
    }
  }
`;

/**
 * __useGetSingleMyExerciseQuery__
 *
 * To run a query within a React component, call `useGetSingleMyExerciseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleMyExerciseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleMyExerciseQuery({
 *   variables: {
 *      myExerciseId: // value for 'myExerciseId'
 *   },
 * });
 */
export function useGetSingleMyExerciseQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSingleMyExerciseQuery,
    GetSingleMyExerciseQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSingleMyExerciseQuery,
    GetSingleMyExerciseQueryVariables
  >(GetSingleMyExerciseDocument, options);
}
export function useGetSingleMyExerciseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSingleMyExerciseQuery,
    GetSingleMyExerciseQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSingleMyExerciseQuery,
    GetSingleMyExerciseQueryVariables
  >(GetSingleMyExerciseDocument, options);
}
export type GetSingleMyExerciseQueryHookResult = ReturnType<
  typeof useGetSingleMyExerciseQuery
>;
export type GetSingleMyExerciseLazyQueryHookResult = ReturnType<
  typeof useGetSingleMyExerciseLazyQuery
>;
export type GetSingleMyExerciseQueryResult = Apollo.QueryResult<
  GetSingleMyExerciseQuery,
  GetSingleMyExerciseQueryVariables
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
