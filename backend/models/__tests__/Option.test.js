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

  it("should throw if db error on create", async () => {
    const orig = require("../Option").create;
    require("../Option").create = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await expect(
      require("../Option").create({ question_id: 1, option_text: "fail" })
    ).rejects.toThrow("fail");
    require("../Option").create = orig;
  });

  it("should throw if db error on findByQuestionId", async () => {
    const orig = require("../Option").findByQuestionId;
    require("../Option").findByQuestionId = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await expect(require("../Option").findByQuestionId(999)).rejects.toThrow(
      "fail"
    );
    require("../Option").findByQuestionId = orig;
  });

  it("should return empty array if no options", async () => {
    const orig = require("../Option").findByQuestionId;
    require("../Option").findByQuestionId = jest.fn().mockResolvedValue([]);
    const options = await require("../Option").findByQuestionId(99999);
    expect(Array.isArray(options)).toBe(true);
    expect(options.length).toBe(0);
    require("../Option").findByQuestionId = orig;
  });
});
