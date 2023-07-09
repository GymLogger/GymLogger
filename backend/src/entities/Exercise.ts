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

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => String)
  @Column()
  variation: string;

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
