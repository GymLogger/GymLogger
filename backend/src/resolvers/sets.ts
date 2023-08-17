import { Exercise } from "../entities/Exercise";
import { Context } from "../data/types";
import { Sets } from "../entities/Set";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../utils/isAuth";
import { dataSource } from "../data/data-source";

@Resolver(Sets)
export class SetsResolver {
  @Query(() => Sets, { nullable: true })
  getSet(@Arg("setId") setId: number): Promise<Sets | null> {
    return Sets.findOne({ where: { setId } });
  }

  @Query(() => [Sets], { nullable: true })
  @UseMiddleware(isAuth)
  getSetsForExercise(
    @Arg("exerciseId") exerciseId: number,
    @Ctx() { payload }: Context
  ): Promise<Sets[] | null> {
    return Sets.find({ where: { exerciseId, creatorId: payload?.userId } });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createSet(
    @Arg("exerciseId") exerciseId: number,
    @Arg("creatorId") creatorId: number,
    @Ctx() { payload }: Context,
    @Arg("reps") reps?: number,
    @Arg("weight") weight?: number,
    @Arg("time") time?: number
  ) {
    //TODO get a real error type here
    if (time === undefined && (reps === undefined || weight === undefined)) {
      return false;
    }

    const setsRepository = dataSource.getRepository(Sets);
    const exercisesRepository = dataSource.getRepository(Exercise);

    const rawExercise = await exercisesRepository.find({
      where: { exerciseId, creatorId },
    });
    const exercise = rawExercise[0];
    let set = new Sets();

    set.weight = weight;
    set.reps = reps;
    set.time = time;
    set.exercise = exercise;
    set.creatorId = payload?.userId as number;

    set = await setsRepository.save(set);
    return set;
  }
}
