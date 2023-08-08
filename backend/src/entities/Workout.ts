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
  id!: number; //automatically generated  workout id

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.workouts)
  creator!: User;

  @Field(() => [Exercise])
  @OneToMany(() => Exercise, (exercise) => exercise.workout, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true,
  })
  exercises!: Exercise[];
}
