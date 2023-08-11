import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Workout } from "../entities/Workout";
import { isAuth } from "../isAuth";
import { Context } from "../types";
import { FieldError } from "./user";
import { dataSource } from "src/data-source";
import { User } from "../entities/User";

/**
 * @brief Used to provide a response type to Workout creation.
 * Contains an array of FieldErrors, containing a field and a message,
 * or the successfully created Workout
 */
@ObjectType()
class WorkoutResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Workout, { nullable: true })
  workout?: Workout;
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
  workout(@Arg("id", () => Int) id: number): Promise<Workout[] | null> {
    return Workout.find({ where: { id } });
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
  async createWorkout(
    @Arg("name") name: string,
    @Ctx() { req }: Context
  ): Promise<WorkoutResponse> {
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
    //all other methods were not returning the id, or overwriting it with subject id
    //must use repository, manually assign data (cannot use spread operator), then save via repository
    //this is a known issue with typeorm for postgres with multiple tables, many to one, with an updatedDate column
    // as per issues on their github

    const userRepository = dataSource.getRepository(User);
    const workoutRepository = dataSource.getRepository(Workout);

    let user = await userRepository.find({
      where: { id: parseInt(req.session.id) },
    });

    let workout = new Workout();

    workout.name = name;
    workout.creatorId = user[0].id;
    workout = await workoutRepository.save(workout);

    return { workout };
  }

  /**
   * Checks if a user is authenticated, then returns all of their Workouts
   * @param Ctx the session request containing the user ID
   * @returns An array of Workouts for the user
   */
  @Query(() => [Workout], { nullable: true })
  @UseMiddleware(isAuth)
  async getWorkouts(@Ctx() { req }: Context): Promise<Workout[] | undefined> {
    return Workout.find({ where: { id: parseInt(req.session.id) } });
  }

  /**
   * Checks user authentication, then deletes a single workout by workout ID
   * @param id Workout ID to be deleted
   * @returns true after deletion
   */
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteWorkout(@Arg("id", () => Int) id: number): Promise<boolean> {
    //TODO might need context for userID here as a 2nd field
    await Workout.delete({ id: id });
    return true;
  }

  @Mutation(() => Workout)
  @UseMiddleware(isAuth)
  async updateWorkoutName(
    @Arg("name") name: string,
    @Arg("id", () => Int) id: number
  ): Promise<Workout> {
    const workout = await dataSource
      .createQueryBuilder()
      .update(Workout)
      .set({ name: name })
      .where("id = :id", { id: id }) //TODO might need context for userID here as a 2nd field
      .returning("*")
      .execute();

    return workout.raw[0];
  }
}
