import { helloWorld } from "../../utils/helloWorld";

test("testing helloWorld function", () => {
  expect(helloWorld()).toBe("Hello World");
});
