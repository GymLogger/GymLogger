import { MyExercise } from "./types";

const bicepCurl: MyExercise = {
  exerciseName: "Bicep Curl",
  muscleGroup: ["Biceps"],
};
const hammerCurl: MyExercise = {
  exerciseName: "Hammer Curl",
  muscleGroup: ["Biceps"],
};
const inclineCurl: MyExercise = {
  exerciseName: "Incline Curl",
  muscleGroup: ["Biceps"],
};
const declineCurl: MyExercise = {
  exerciseName: "Decline Curl",
  muscleGroup: ["Biceps"],
};
const preacherCurl: MyExercise = {
  exerciseName: "Preacher Curl",
  muscleGroup: ["Biceps"],
};

export const presetExerciseList = <MyExercise[]>[
  bicepCurl,
  hammerCurl,
  inclineCurl,
  declineCurl,
  preacherCurl,
];
