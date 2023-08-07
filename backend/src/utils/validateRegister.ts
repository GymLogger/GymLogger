import { EmailPasswordInput } from "../EmailPasswordInput";

export const validateRegister = (options: EmailPasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email",
      },
    ];
  }

  if (options.password.length < 5) {
    return [
      {
        field: "password",
        message: "Password must be 5 characters or longer",
      },
    ];
  }

  return null;
};
