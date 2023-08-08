import { DataSource } from "typeorm";
import { Exercise } from "./entities/Exercise";
import { User } from "./entities/User";
import { Workout } from "./entities/Workout";
import { Set } from "./entities/Set";
// import path from "path";

/**
 * Contains the connection options for the postgres DB
 */
export const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  //will need to be changed to "postgres" for prod
  host: "localhost",
  database: "liftingtest",
  username: "postgres",
  password: "postgres",
  logging: true,
  //creates tables automatically, no need for running a migration
  synchronize: true, //turn off in prod
  //running mock migration
  //   migrations: [path.join(__dirname, "./migrations/*")],
  entities: [User, Workout, Exercise, Set],
});
