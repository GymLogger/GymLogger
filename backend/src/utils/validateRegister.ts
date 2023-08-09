import { EmailPasswordInput } from "../EmailPasswordInput";

/**
 * Basic validation for email and password.
 * @param options Passes in an EmailPasswordInput, both of which are strings
 * @returns an error if applicable
 */
export const validateRegister = (options: EmailPasswordInput) => {
  //TODO make better validation rules or use an external library
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
