"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const Exercise_1 = require("./entities/Exercise");
const User_1 = require("./entities/User");
const Workout_1 = require("./entities/Workout");
const Set_1 = require("./entities/Set");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    port: 5432,
    host: "localhost",
    database: "liftingtest",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [User_1.User, Workout_1.Workout, Exercise_1.Exercise, Set_1.Set],
});
//# sourceMappingURL=data-source.js.map