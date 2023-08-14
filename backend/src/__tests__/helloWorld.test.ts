import { helloWorld } from "../helloWorld";

test("testing helloWorld function", () => {
  expect(helloWorld()).toBe("Hello World");
});
