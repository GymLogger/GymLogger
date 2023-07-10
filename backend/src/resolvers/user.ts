import { User } from "../entities/User";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Field,
  ObjectType,
} from "type-graphql";
import { compare, hash } from "bcryptjs";
import { createAccessToken } from "../auth";

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
@ObjectType()
class LoginResponse {
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
@Resolver(User)
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hello world";
  }

  @Query(() => [User])
  getUsers() {
    return User.find();
  }

  @Query(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
    // @Ctx() { res }: Context
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "That username or email does not exist",
          },
        ],
      };
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Invalid login",
          },
        ],
      };
    }

    //logged in successfully

    //refresh token
    // sendRefreshToken(res, createRefreshToken(user));

    //first arg is what's being stored, 2nd arg is the secret string
    //access token
    return {
      accessToken: createAccessToken(user),
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await hash(password, 12);
    try {
      await User.insert({
        email: email,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
