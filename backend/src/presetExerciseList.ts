import { MyExercise } from "./types";

const bicepCurl: MyExercise = { name: "Bicep Curl", muscleGroup: ["Biceps"] };
const hammerCurl: MyExercise = {
  name: "Hammer Curl",
  muscleGroup: ["Biceps"],
};
const inclineCurl: MyExercise = {
  name: "Incline Curl",
  muscleGroup: ["Biceps"],
};
const declineCurl: MyExercise = {
  name: "Decline Curl",
  muscleGroup: ["Biceps"],
};
const preacherCurl: MyExercise = {
  name: "Preacher Curl",
  muscleGroup: ["Biceps"],
};

export const presetExerciseList = <MyExercise[]>[bicepCurl];
