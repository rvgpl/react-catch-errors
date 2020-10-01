import add from "./index";

describe("Add test", () => {
  it("should add two numbers", () => {
    const value = add(1, 2);
    expect(value).toBe(3);
  });
});
