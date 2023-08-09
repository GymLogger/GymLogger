import { Resolver, Query } from "type-graphql";
/**
 * Test resolver
 */
@Resolver()
export class TestResolver {
  @Query(() => String)
  test() {
    return "hello world";
  }
}
