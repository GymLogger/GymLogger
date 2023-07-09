"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Exercise_1 = require("./Exercise");
const User_1 = require("./User");
let Workout = exports.Workout = class Workout extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Workout.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Workout.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Workout.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Workout.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User),
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.workouts),
    __metadata("design:type", User_1.User)
], Workout.prototype, "creator", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Exercise_1.Exercise]),
    (0, typeorm_1.OneToMany)(() => Exercise_1.Exercise, (exercise) => exercise.workout, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", Array)
], Workout.prototype, "exercises", void 0);
exports.Workout = Workout = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Workout);
//# sourceMappingURL=Workout.js.map