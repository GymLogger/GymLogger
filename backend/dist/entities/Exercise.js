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
exports.Exercise = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Workout_1 = require("./Workout");
const Set_1 = require("./Set");
let Exercise = exports.Exercise = class Exercise extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Exercise.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Exercise.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Exercise.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Exercise.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Exercise.prototype, "variation", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Workout_1.Workout),
    (0, typeorm_1.ManyToOne)(() => Workout_1.Workout, (workout) => workout.exercises),
    __metadata("design:type", Workout_1.Workout)
], Exercise.prototype, "workout", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Set_1.Set]),
    (0, typeorm_1.OneToMany)(() => Set_1.Set, (set) => set.exercise, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Exercise.prototype, "sets", void 0);
exports.Exercise = Exercise = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Exercise);
//# sourceMappingURL=Exercise.js.map