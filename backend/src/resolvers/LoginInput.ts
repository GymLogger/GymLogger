import { InputType, Field } from "type-graphql";

//TODO is a username needed? where is login input actually being used?
/**
 * Simple class containing type-graphql exposed fields for password and email
 */
@InputType()
export class LoginInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}
