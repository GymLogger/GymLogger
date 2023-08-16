import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Workout } from "./Workout";
import { Set } from "./Set";

/**
 * Exercise class with typeorm, exposed in type-graphql
 * Extends the typeorm Base entity
 */
@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  exerciseId!: number; //automatically generated unique exercise id

  @Field(() => String)
  @Column()
  exerciseName!: string;

  @Field(() => [String])
  @Column("text", { array: true })
  muscleGroup: string[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => String)
  @Column()
  variation: string;

  @Field(() => Boolean)
  @Column({ default: false })
  unilateral: boolean;

  @Field()
  @Column()
  workoutId!: number;

  @Field()
  @Column()
  creatorId!: number;

  @Field(() => Workout)
  @ManyToOne(() => Workout, (workout) => workout.exercises)
  workout!: Workout;

  @Field(() => [Set])
  @OneToMany(() => Set, (set) => set.exercise, {
    cascade: true,
    eager: true,
  })
  sets: Set[];
}
