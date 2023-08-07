import { InputType, Field } from "type-graphql";

@InputType()
export class EmailPasswordInput {
  @Field()
  password: string;
  @Field()
  email: string;
}
