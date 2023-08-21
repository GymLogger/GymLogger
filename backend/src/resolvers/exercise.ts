import {
  Arg,
  Int,
  Query,
  Resolver,
  UseMiddleware,
  Mutation,
  Ctx,
} from "type-graphql";
import { Exercise } from "../entities/Exercise";
import { Context } from "../data/types";
import { isAuth } from "../utils/isAuth";
import { Workout } from "../entities/Workout";
import { dataSource } from "../data/data-source";
import { MyExercises } from "../entities/MyExercises";

@Resolver(Exercise)
export class ExerciseResolver {
  @Query(() => Exercise, { nullable: true })
  getExercise(
    @Arg("exerciseId", () => Int) exerciseId: number
  ): Promise<Exercise | null> {
    return Exercise.findOne({ where: { exerciseId: exerciseId } });
  }

  @Query(() => [Exercise], { nullable: true })
  @UseMiddleware(isAuth)
  getExercisesForWorkout(
    @Arg("workoutId") workoutId: number
  ): Promise<Exercise[] | null> {
    return Exercise.find({ where: { workoutId } });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteExercise(
    @Arg("exerciseId", () => Int) exerciseId: number,
    @Ctx() { payload }: Context
  ): Promise<boolean> {
    await Exercise.delete({ exerciseId, creatorId: payload?.userId });
    return true;
  }

  /**
   * Creates a new Exercise
   * TODO make another method where workout can be passed in directly
   * to reduce SQL queries
   * @param myExerciseId Saved MyExercise unique id, number
   * @param workoutId number, unique ID of the parent workout
   * @param variation string, variation type
   * @param Ctx containing payload with userID
   * @returns a newly created Exercise
   */
  @Mutation(() => Exercise)
  @UseMiddleware(isAuth)
  async createExercise(
    @Arg("myExerciseId") myExerciseId: number,
    @Arg("workoutId") workoutId: number,
    @Arg("variation") variation: string,
    @Ctx() { payload }: Context
  ): Promise<Exercise | null> {
    const rawWorkout = await Workout.find({ where: { workoutId } });
    const workout = rawWorkout[0];

    const rawMyExercise = await MyExercises.find({ where: { myExerciseId } });
    const myExercise = rawMyExercise[0];

    const exerciseRepository = dataSource.getRepository(Exercise);
    const exercise = new Exercise();

    exercise.exerciseName = myExercise.exerciseName;
    exercise.muscleGroup = myExercise.muscleGroup;
    exercise.creatorId = payload?.userId as number;
    exercise.variation = variation;
    exercise.workout = workout;

    exerciseRepository.save(exercise);
    return exercise;
  }
}
