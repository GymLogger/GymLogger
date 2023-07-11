import { User } from "../entities/User";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Field,
  ObjectType,
  UseMiddleware,
  Ctx,
  Int,
} from "type-graphql";
import { compare, hash } from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../auth";
import { Context } from "../types";
import { isAuth } from "../isAuth";
import { dataSource } from "../data-source";
import { sendRefreshToken } from "../sendRefreshToken";

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

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: Context) {
    return `your user id is ${payload!.userId}`;
  }

  //TODO - make this less hacky
  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return false;
    }

    const currTokenVersion = user.tokenVersion;

    await dataSource
      .createQueryBuilder()
      .update(User)
      .set({ tokenVersion: currTokenVersion + 1 })
      .where("id = :id", { id: userId })
      .execute();

    return true;
  }

  @Query(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
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
    res.cookie("testcookie1", "blah", { httpOnly: true });

    //refresh token sent in cookie
    sendRefreshToken(res, createRefreshToken(user));

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
