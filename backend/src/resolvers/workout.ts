import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { dataSource } from "../data/data-source";
import { Context } from "../data/types";
import { User } from "../entities/User";
import { Workout } from "../entities/Workout";
import { isAuth } from "../utils/isAuth";
import { MyExercises } from "../entities/MyExercises";
import { Exercise } from "../entities/Exercise";
import { Sets } from "../entities/Set";

/**
 * @brief Used to provide a response type to Workout creation.
 * Contains an array of FieldErrors, containing a field and a message,
 * or the successfully created Workout
 */
// @ObjectType()
// class WorkoutResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];

//   @Field(() => Workout, { nullable: true })
//   workout?: Workout;
// }

@InputType()
class ExerciseInput {
  @Field(() => Int)
  myExerciseId: number;

  @Field()
  variation: string;

  @Field(() => [SetInput])
  sets: SetInput[];
}

@InputType()
class SetInput {
  @Field(() => Int)
  weight: number;
  @Field(() => Int)
  reps: number;
  @Field(() => Int)
  time: number;
}

/**
 * Resolvers for Workouts
 */
@Resolver(Workout)
export class WorkoutResolver {
  /**
   * Queries to find a workout by ID. Auth not required for now.
   * @param id unique ID for a workout
   * @returns the Workout, as an array, or null, if the workout does not exist
   */
  @Query(() => Workout, { nullable: true })
  workout(
    @Arg("workoutId", () => Int) workoutId: number
  ): Promise<Workout[] | null> {
    //TODO add auth
    return Workout.find({ where: { workoutId } });
  }

  @Mutation(() => Workout)
  @UseMiddleware(isAuth)
  async createFullWorkout(
    @Arg("name") name: string,
    @Arg("exercises", () => [ExerciseInput])
    exercises: ExerciseInput[],
    @Ctx() { payload }: Context
  ) {
    if (name.length === 0) {
      return {
        errors: [
          {
            message: "workout name cannot be empty",
            field: "workout",
          },
        ],
      };
    }
    if (name.length > 30) {
      return {
        errors: [
          {
            message: "workout must have 30 or fewer characters",
            field: "workout",
          },
        ],
      };
    }
    //all other methods were not returning the id, or overwriting it with workout id
    //must use repository, manually assign data (cannot use spread operator), then save via repository
    //this is a known issue with typeorm for postgres with multiple tables, many to one, with an updatedDate column
    // as per issues on their github

    const userRepository = dataSource.getRepository(User);
    const workoutRepository = dataSource.getRepository(Workout);

    let user = await userRepository.find({
      where: { id: payload?.userId },
    });

    let workout = new Workout();

    workout.name = name;
    workout.creatorId = user[0].id;

    workout = await workoutRepository.save(workout);

    //exercise and set part
    //TODO refactor this

    const exerciseRepository = dataSource.getRepository(Exercise);
    const setRepository = dataSource.getRepository(Sets);

    //TODO this is horrible. fix it.
    exercises.forEach(async (exerciseInput) => {
      const rawMyExercise = await MyExercises.find({
        where: { myExerciseId: exerciseInput.myExerciseId },
      });
      const myExercise = rawMyExercise[0];
      const exercise = new Exercise();
      exercise.exerciseName = myExercise.exerciseName;
      exercise.muscleGroup = myExercise.muscleGroup;
      exercise.creatorId = payload?.userId as number;
      exercise.variation = exerciseInput.variation;
      exercise.workout = workout;

      exerciseRepository.save(exercise);

      exerciseInput.sets.forEach(async (setInput) => {
        if (
          setInput.time === undefined &&
          (setInput.reps === undefined || setInput.weight === undefined)
        ) {
          return false;
        }
        let set = new Sets();

        set.weight = setInput.weight;
        set.reps = setInput.reps;
        set.time = setInput.time;
        set.exercise = exercise;
        set.creatorId = payload?.userId as number;

        set = await setRepository.save(set);
        return;
      });
    });
    return workout;
  }

  /**
   * Creates a workout for a user after verifying them.
   * @param name Name of the workout.
   * @param Ctx request from session, containing the user ID.
   * @returns a WorkoutResponse, which is either a FieldError with a field and
   * error message, or a succesfully created Workout
   */
  @Mutation(() => Workout)
  @UseMiddleware(isAuth)
  async createWorkout(@Arg("name") name: string, @Ctx() { payload }: Context) {
    //input validation segment
    if (name.length === 0) {
      return {
        errors: [
          {
            message: "workout name cannot be empty",
            field: "workout",
          },
        ],
      };
    }
    if (name.length > 30) {
      return {
        errors: [
          {
            message: "workout must have 30 or fewer characters",
            field: "workout",
          },
        ],
      };
    }
    //all other methods were not returning the id, or overwriting it with workout id
    //must use repository, manually assign data (cannot use spread operator), then save via repository
    //this is a known issue with typeorm for postgres with multiple tables, many to one, with an updatedDate column
    // as per issues on their github

    const userRepository = dataSource.getRepository(User);
    const workoutRepository = dataSource.getRepository(Workout);

    let rawUser = await userRepository.find({
      where: { id: payload?.userId },
    });
    const user = rawUser[0];

    let workout = new Workout();

    workout.name = name;
    workout.creatorId = user.id;
    workout.creator = user;

    workout = await workoutRepository.save(workout);

    return workout;
  }

  /**
   * Checks if a user is authenticated, then returns all of their Workouts
   * @param Ctx the session request containing the user ID
   * @returns An array of Workouts for the user
   */
  @Query(() => [Workout], { nullable: true })
  @UseMiddleware(isAuth)
  async getWorkouts(
    @Ctx() { payload }: Context
  ): Promise<Workout[] | undefined> {
    return Workout.find({
      where: { creatorId: payload?.userId },
      order: { createdAt: "DESC" },
    });
  }

  /**
   * Checks user authentication, then deletes a single workout by workout ID
   * @param id Workout ID to be deleted
   * @returns true after deletion
   */
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteWorkout(
    @Arg("workoutId", () => Int) workoutId: number,
    @Ctx() { payload }: Context
  ): Promise<boolean> {
    await Workout.delete({ workoutId, creatorId: payload?.userId });
    return true;
  }

  @Mutation(() => Workout)
  @UseMiddleware(isAuth)
  async updateWorkoutName(
    @Arg("name") name: string,
    @Arg("workoutId", () => Int) workoutId: number,
    @Ctx() { payload }: Context
  ): Promise<Workout> {
    const workout = await dataSource
      .createQueryBuilder()
      .update(Workout)
      .set({ name: name })
      .where("workoutId = :workoutId", { workoutId: workoutId })
      .where({ creatorId: payload?.userId }) //TODO does this work?? 2 wheres?
      .returning("*")
      .execute();

    return workout.raw[0];
  }

  //TODO kill this, it shouldn't exist. dev only
  //returns all workouts
  @Query(() => [Workout])
  getAllWorkouts() {
    return Workout.find();
  }
}
