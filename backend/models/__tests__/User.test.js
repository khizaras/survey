// Unit tests for User model
const User = require("../User");

describe("User Model", () => {
  function uniqueEmail(base = "test") {
    return `${base}_${Date.now()}_${Math.floor(Math.random() * 10000)}@example.com`;
  }

  it("should create a user", async () => {
    const user = await User.create({
      name: "Test User",
      email: uniqueEmail("test1"),
      department: "QA",
      sso_id: `sso_test_1_${Date.now()}`,
    });
    expect(user).toBeTruthy();
  });

  it("should find a user by id", async () => {
    const email = uniqueEmail("test2");
    const user = await User.create({
      name: "Test User2",
      email,
      department: "QA",
      sso_id: `sso_test_2_${Date.now()}`,
    });
    const found = await User.findById(user);
    expect(found).toBeTruthy();
    expect(found.email).toBe(email);
  });

  it("should find a user by SSO id", async () => {
    const email = uniqueEmail("test3");
    const sso_id = `sso_test_3_${Date.now()}`;
    const user = await User.create({
      name: "Test User3",
      email,
      department: "QA",
      sso_id,
    });
    const found = await User.findBySSOId(sso_id);
    expect(found).toBeTruthy();
    expect(found.email).toBe(email);
  });
});
