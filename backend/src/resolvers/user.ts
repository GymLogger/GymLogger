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

/**
 * Class for errors in resolver queries or mutations.
 * Exposed in type-graphql. Will contain a field and a message
 */
@ObjectType()
export class FieldError {
  @Field()
  field: string; //error type, ie password, email, etc

  @Field()
  message: string; // short error description
}
/**
 * Class describing a response to a login. Exposed in type-graphql
 * Will contain an accessToken - if successful login attempt - or
 * an array of field errors describing the issue
 */
@ObjectType()
class LoginResponse {
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

// @ObjectType()
// class MeResponse {
//   @Field(() => User, { nullable: true })
//   user?: User;

//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];
// }

/**
 * User resolvers. Used in graphql to make queries and mutations
 * on User objects
 */
@Resolver(User)
export class UserResolver {
  //test resolver
  @Query(() => String)
  hello() {
    return "hello world";
  }

  //TODO kill this, it shouldn't exist. Dev only
  //Returns all users
  @Query(() => [User])
  getUsers() {
    return User.find();
  }

  /**
   *
   * @param Ctx() is the context, passes in the payload which is set from the
   * isAuth middleware
   * @returns a user with a matching userId as the payload
   */
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth) //runs isAuth middleware before function is called
  me(@Ctx() { payload }: Context) {
    return User.findOne({ where: { id: payload?.userId } });
  }

  //for testing only, things are being weird
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth) //runs isAuth middleware before function is called
  me2(@Ctx() { payload }: Context) {
    return User.findOne({ where: { id: payload?.userId } });
  }

  //TODO this shoudl work now maybe? not really needed though, it's just isAuth reskinned
  @Query(() => User, { nullable: true })
  meHeader(@Ctx() context: Context) {
    const authorization = context.req.headers["authorization"];
    console.log("From meHeader, context.req.headers", context.req.headers);

    if (!authorization) {
      console.log("no auth found");
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      console.log("context.req.headers", context.req.headers);

      //TODO use env variables
      const payload: any = verify(token, "asdfefe");
      // return User.findOne(payload.userId);
      return User.findOne({ where: { id: payload.userId } });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /**
   *
   * @param Ctx() is the paramater, uses the response
   * @returns true, after sending an empty refresh token.
   */
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: Context): Promise<boolean> {
    sendRefreshToken(res, "");

    return true;
  }

  /**
   * Revokes a refresh token by incrementing the current token version
   * @param userId Passes in a userId to increment their token
   * @returns false if no user found, else true
   */
  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(
    @Arg("userId", () => Int) userId: number
  ): Promise<boolean> {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return false;
    }

    const currTokenVersion = user.tokenVersion;

    //increments the token version for that user by 1
    await dataSource
      .createQueryBuilder()
      .update(User)
      .set({ tokenVersion: currTokenVersion + 1 })
      .where("id = :id", { id: userId })
      .execute();

    return true;
  }

  /**
   * Logs a uer in.
   * @param email user's email
   * @param password user's pw
   * @param Ctx(), the session context containing the response
   * @returns
   */
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } }); //finds user by email
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

    const valid = await compare(password, user.password); //compares pw with hashed pw

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

  /**
   *
   * @param email email passed in
   * @param password pw passed in
   * @param Ctx() containing the response
   * @returns
   */
  @Mutation(() => LoginResponse)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse> {
    const errors = validateRegister({ email, password }); //validates email and pw
    if (errors) {
      return { errors };
    }

    const hashedPassword = await hash(password, 12); //compares hashed pw and entered pw
    let user; //typescript woudln't let me declare user in the try block

    try {
      //attempts to insert user into the DB, returns user if no issues
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

      const DUPLICATE_ERROR_CODE: string = "23505";
      if (
        err.code === DUPLICATE_ERROR_CODE ||
        err.detail.includes("already exists")
      ) {
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

    //sticks a refresh token in the cookie
    sendRefreshToken(res, createRefreshToken(user));

    //access token returned
    return {
      accessToken: createAccessToken(user),
    };
  }

  // @Mutation(() => Boolean)
  // createWorkout(@Arg("name") name: string, @Ctx() { res }: Context) {
  //   await;
  // }
}
