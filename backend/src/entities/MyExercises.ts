import { ObjectType, Field } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

/**
 * Class containing a user's saved exercises.
 * When a user is created, rows of preset exercises
 * will be inserted into this table for them
 */
@ObjectType()
@Entity()
export class MyExercises extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  myExerciseId!: number;

  @Field()
  @Column()
  exerciseName: string;

  @Field(() => [String])
  @Column("text", { array: true })
  muscleGroup: string[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.myExercises)
  creator!: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  creatorId!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}
