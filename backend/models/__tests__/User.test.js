// Unit tests for User model
const User = require("../User");

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      department: "QA",
      sso_id: "sso_test_1",
    });
    expect(user).toBeTruthy();
  });

  it("should find a user by id", async () => {
    const user = await User.create({
      name: "Test User2",
      email: "test2@example.com",
      department: "QA",
      sso_id: "sso_test_2",
    });
    const found = await User.findById(user);
    expect(found).toBeTruthy();
    expect(found.email).toBe("test2@example.com");
  });

  it("should find a user by SSO id", async () => {
    const user = await User.create({
      name: "Test User3",
      email: "test3@example.com",
      department: "QA",
      sso_id: "sso_test_3",
    });
    const found = await User.findBySSOId("sso_test_3");
    expect(found).toBeTruthy();
    expect(found.email).toBe("test3@example.com");
  });
});
