import { InputType, Field } from "type-graphql";

/**
 * Simple class containing fields for email and password input.
 * Exposes them in type-graphql as fields
 */
@InputType()
export class EmailPasswordInput {
  @Field()
  password: string;
  @Field()
  email: string;
}
