import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { dataSource } from "../data-source";
import { User } from "../entities/User";
import { Workout } from "../entities/Workout";
import { isAuth } from "../isAuth";
import { Context } from "../types";

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
    return Workout.find({ where: { workoutId } });
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
    //for testing
    console.log("IN");
    console.log("payload: ", payload);
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

    let user = await userRepository.find({
      where: { id: payload?.userId },
    });

    let workout = new Workout();

    workout.name = name;
    workout.creatorId = user[0].id;

    console.log("got to 104");
    workout = await workoutRepository.save(workout);

    console.log("workout: ", workout);

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
    @Arg("workoutId", () => Int) workoutId: number
  ): Promise<boolean> {
    //TODO might need context for userID here as a 2nd field
    await Workout.delete({ workoutId });
    return true;
  }

  @Mutation(() => Workout)
  @UseMiddleware(isAuth)
  async updateWorkoutName(
    @Arg("name") name: string,
    @Arg("workoutId", () => Int) workoutId: number
  ): Promise<Workout> {
    const workout = await dataSource
      .createQueryBuilder()
      .update(Workout)
      .set({ name: name })
      .where("workoutId = :workoutId", { workoutId: workoutId }) //TODO might need context for userID here as a 2nd field
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
