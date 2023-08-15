import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Workout } from "./Workout";
import { MyExercises } from "./MyExercises";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number; //automatically generated unique user id

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => [Workout], { nullable: true })
  @OneToMany(() => Workout, (workout) => workout.creator, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true,
  })
  workouts!: Workout[]; //one user has many workouts

  @Field(() => [MyExercises], { nullable: true })
  @OneToMany(() => MyExercises, (myExercises) => myExercises.creator, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true,
  })
  myExercises!: MyExercises[]; //one user has many exercises

  @Column("int", { default: 0 })
  tokenVersion: number; //incremented on token revoke, used to check token validity
}
