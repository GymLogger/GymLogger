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
import { Exercise } from "./Exercise";
import { User } from "./User";

@ObjectType()
@Entity()
export class Workout extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  workoutId!: number; //automatically generated  workout id

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;

  //TODO probably don't need both of these
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.workouts)
  creator!: User;

  //TODO probably don't need both of these
  @Field({ nullable: true })
  @Column({ nullable: true })
  creatorId!: number;

  @Field(() => [Exercise], { nullable: true })
  @OneToMany(() => Exercise, (exercise) => exercise.workout, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true,
  })
  exercises: Exercise[];
}
