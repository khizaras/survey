// Unit tests for Option model
const Option = require("../Option");

describe("Option Model", () => {
  it("should create an option", async () => {
    const opt = await Option.create({
      question_id: 1,
      option_text: "Option 1",
    });
    expect(opt).toBeTruthy();
  });

  it("should find options by question id", async () => {
    const options = await Option.findByQuestionId(1);
    expect(Array.isArray(options)).toBe(true);
  });
});
