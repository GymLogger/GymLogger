import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exercise } from "./Exercise";

@ObjectType()
@Entity()
export class Sets extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number; //automatically generated unique set id

  @Field()
  @Column()
  weight: number;

  @Field()
  @Column()
  reps: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => [Exercise])
  @ManyToOne(() => Exercise, (exercise) => exercise.sets)
  exercise!: Exercise; //one set has many exercises
}
