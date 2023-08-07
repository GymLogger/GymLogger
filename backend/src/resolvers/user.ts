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
import { validateRegister } from "../utils/validateRegister";
import { verify } from "jsonwebtoken";

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

  @Query(() => User, { nullable: true })
  me(@Ctx() context: Context) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      console.log("context.req.headers", context.req.headers);
      console.log("no auth found");
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: Context) {
    sendRefreshToken(res, "");

    return true;
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

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse> {
    console.log("in login function");
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("!user");
      return {
        errors: [
          {
            field: "email",
            message: "That email does not exist",
          },
        ],
      };
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      console.log("!valid");
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
    //refresh token sent in cookie
    sendRefreshToken(res, createRefreshToken(user));

    //access token
    console.log("returning access token");
    return {
      accessToken: createAccessToken(user),
    };
  }

  @Mutation(() => LoginResponse)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse> {
    const errors = validateRegister({ email, password });
    if (errors) {
      return { errors };
    }

    const hashedPassword = await hash(password, 12);
    let user;

    try {
      const result = await dataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          password: hashedPassword,
          email: email,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (err) {
      console.log(err);
      //TODO check error code here
      if (err.code === "23505" || err.detail.includes("already exists")) {
        //dupe username error
        return {
          errors: [
            {
              message: "email already exists",
              field: "email",
            },
          ],
        };
      }
    }
    sendRefreshToken(res, createRefreshToken(user));

    //access token
    return {
      accessToken: createAccessToken(user),
    };
  }

  // @Mutation(() => Boolean)
  // createWorkout(@Arg("name") name: string, @Ctx() { res }: Context) {
  //   await;
  // }
}
