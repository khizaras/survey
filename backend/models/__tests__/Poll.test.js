// Example test for Poll model
const Poll = require("../Poll");
describe("Poll Model", () => {
  it("should have CRUD methods", () => {
    expect(Poll).toHaveProperty("create");
    expect(Poll).toHaveProperty("findById");
    expect(Poll).toHaveProperty("update");
    expect(Poll).toHaveProperty("delete");
  });
});
