import {
  Resolver,
  Query,
  Arg,
  UseMiddleware,
  Int,
  Mutation,
  Ctx,
  Field,
  ObjectType,
} from "type-graphql";
import { MyExercises } from "../entities/MyExercises";
import { isAuth } from "../utils/isAuth";
import { dataSource } from "../data/data-source";
import { Context } from "../data/types";
import { User } from "../entities/User";
import { FieldError } from "./user";

/**
 * @brief Used to provide a response type to Workout creation.
 * Contains an array of FieldErrors, containing a field and a message,
 * or the successfully created Workout
 */
@ObjectType()
class MyExercisesResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => MyExercises, { nullable: true })
  exercise?: MyExercises;
}

@Resolver(MyExercises)
export class MyExercisesResolver {
  /**
   * gets all MyExercises for a user by their id.
   * @param creatorId userID to be passed in as a number
   * @returns an array of MyExercises or null, as a promise
   */
  @Query(() => [MyExercises])
  @UseMiddleware(isAuth)
  async getMyExercises(
    @Ctx() { payload }: Context
  ): Promise<MyExercises[] | undefined> {
    return MyExercises.find({ where: { creatorId: payload?.userId } });
  }

  /**
   * Returns a single myExercise by ID
   * @param myExerciseId unique ID to be passed as number
   * @param Ctx containing payload with userId
   * @returns MyExercise object
   */
  @Query(() => MyExercises)
  @UseMiddleware(isAuth)
  async getSingleMyExercise(
    @Arg("myExerciseId", () => Int) myExerciseId: number,
    @Ctx() { payload }: Context
  ): Promise<MyExercises | null> {
    return MyExercises.findOne({
      where: { creatorId: payload?.userId, myExerciseId },
    });
  }
  /**
   * Deletes a MyExercise after checking isAuth
   * @param myExerciseId exceriseID to be deleted
   * @returns true as a boolean
   */
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteMyExercise(
    @Arg("myExerciseId", () => Int) myExerciseId: number,
    @Ctx() { payload }: Context
  ): Promise<boolean> {
    await MyExercises.delete({
      myExerciseId: myExerciseId,
      creatorId: payload?.userId,
    });
    return true;
  }

  /**
   * Edits the exerciseName of an existing MyExercise after checking
   * isAuth
   * @param exerciseName new exerciseName
   * @param myExerciseId unique ID as number
   * @returns An updated MyExercise as a promise
   */
  @Mutation(() => MyExercises)
  @UseMiddleware(isAuth)
  async updateMyExerciseName(
    @Arg("exerciseName") exerciseName: string,
    @Arg("myExerciseId") myExerciseId: number,
    @Ctx() { payload }: Context
  ): Promise<MyExercises> {
    const myExercise = await dataSource
      .createQueryBuilder()
      .update(MyExercises)
      .set({ exerciseName })
      .where("myExerciseId = :myExerciseId", {
        myExerciseId: myExerciseId,
        creatorId: payload?.userId,
      })
      .returning("*")
      .execute();

    return myExercise.raw[0];
  }

  /**
   * Edits the muscleGroup array of an existing MyExercise
   * after checking isAuth
   * @param muscleGroup array of strings for the muscle group
   * @param myExerciseId unique ID as number
   * @returns An updated MyExercise as a promise
   */
  @Mutation(() => MyExercises)
  @UseMiddleware(isAuth)
  async updateMyExerciseMuscleGroup(
    @Arg("muscleGroup") muscleGroup: string, //TODO is this right? Didn't work for an array
    @Arg("myExerciseId") myExerciseId: number,
    @Ctx() { payload }: Context
  ): Promise<MyExercises> {
    const myExercise = await dataSource
      .createQueryBuilder()
      .update(MyExercises)
      .set({ muscleGroup })
      .where("myExerciseId = :myExerciseId", {
        myExerciseId: myExerciseId,
        creatorId: payload?.userId,
      })
      .returning("*")
      .execute();

    return myExercise.raw[0];
  }

  /**
   * Creates a new exercise for a user and saves it in the repository
   * after running isAuth.
   * @param exerciseName New MyExercise name
   * @param muscleGroup array of strings for the muscle groups used
   * @param Ctx context containing the payload
   * @returns a MyExercisesResponse promise containing the errors or a MyExercise object
   */
  @Mutation(() => MyExercises)
  @UseMiddleware(isAuth)
  async createMyExercises(
    @Arg("exerciseName") exerciseName: string,
    @Arg("muscleGroup", () => [String]) muscleGroup: string[], //stringifying may also work
    @Ctx() { payload }: Context
  ): Promise<MyExercisesResponse> {
    //input validation
    //TODO add more?
    if (exerciseName.length === 0) {
      return {
        errors: [
          {
            message: "exercise name cannot be empty",
            field: "exercise",
          },
        ],
      };
    }
    if (exerciseName.length > 30) {
      return {
        errors: [
          {
            message: "exercise must have 30 or fewer characters",
            field: "exercise",
          },
        ],
      };
    }

    const userRepository = dataSource.getRepository(User);
    const myExercisesRepository = dataSource.getRepository(MyExercises);

    let user = await userRepository.find({
      where: { id: payload?.userId },
    });

    let myExercise = new MyExercises();

    myExercise.creatorId = user[0].id;
    myExercise.exerciseName = exerciseName;
    myExercise.muscleGroup = muscleGroup;

    myExercise = await myExercisesRepository.save(myExercise);
    return { exercise: myExercise };
  }
}
