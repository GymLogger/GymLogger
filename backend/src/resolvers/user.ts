import { User } from "../entities/User";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { compare, hash } from "bcryptjs";

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

  @Mutation(() => Boolean)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
    // @Ctx() { res }: Context
  ): Promise<Boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("invalid login");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("invalid password");
    }

    //logged in successfully

    //refresh token
    // sendRefreshToken(res, createRefreshToken(user));

    //first arg is what's being stored, 2nd arg is the secret string
    //access token
    return true;
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
