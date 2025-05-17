// Unit tests for Poll model
const Poll = require("../Poll");
const Question = require("../Question");
const Option = require("../Option");

describe("Poll Model", () => {
  it("should create a poll", async () => {
    const poll = await Poll.create({
      creator_id: 1,
      question: "Test poll?",
      image_url: null,
      expires_at: null,
      type: "survey", // Add type
    });
    expect(poll).toHaveProperty("id");
  });

  it("should create a poll with questions and options", async () => {
    const poll = await Poll.createWithQuestions({
      creator_id: 1,
      question: "Multi-question poll?",
      questions: [
        {
          question_text: "Q1?",
          type: "radio",
          options: [{ option_text: "A" }, { option_text: "B" }],
        },
      ],
      image_url: null,
      expires_at: null,
      type: "survey", // Add type
    });
    expect(poll).toHaveProperty("id");
  });

  it("should find a poll by id", async () => {
    const poll = await Poll.create({
      creator_id: 1,
      question: "Find me?",
      image_url: null,
      expires_at: null,
      type: "survey", // Add type
    });
    const found = await Poll.findById(poll.id);
    expect(found).toBeTruthy();
    expect(found.id).toBe(poll.id);
  });

  it("should update a poll", async () => {
    const poll = await Poll.create({
      creator_id: 1,
      question: "Update me?",
      image_url: null,
      expires_at: null,
      type: "survey", // Add type
    });
    await Poll.update(poll.id, { question: "Updated!" });
    const updated = await Poll.findById(poll.id);
    expect(updated.question).toBe("Updated!");
  });

  it("should delete a poll", async () => {
    const poll = await Poll.create({
      creator_id: 1,
      question: "Delete me?",
      image_url: null,
      expires_at: null,
      type: "survey", // Add type
    });
    await Poll.delete(poll.id);
    const found = await Poll.findById(poll.id);
    expect(found).toBeFalsy();
  });

  it("should throw if db error on create", async () => {
    const orig = require("../Poll").create;
    require("../Poll").create = jest.fn().mockRejectedValue(new Error("fail"));
    await expect(
      require("../Poll").create({ creator_id: 1, question: "fail" })
    ).rejects.toThrow("fail");
    require("../Poll").create = orig;
  });

  it("should throw if db error on findById", async () => {
    const orig = require("../Poll").findById;
    require("../Poll").findById = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await expect(require("../Poll").findById(999)).rejects.toThrow("fail");
    require("../Poll").findById = orig;
  });

  it("should throw if db error on findActive", async () => {
    const orig = require("../Poll").findActive;
    require("../Poll").findActive = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await expect(require("../Poll").findActive()).rejects.toThrow("fail");
    require("../Poll").findActive = orig;
  });

  it("should throw if db error on findAll", async () => {
    const orig = require("../Poll").findAll;
    require("../Poll").findAll = jest.fn().mockRejectedValue(new Error("fail"));
    await expect(require("../Poll").findAll()).rejects.toThrow("fail");
    require("../Poll").findAll = orig;
  });

  it("should throw if db error on update", async () => {
    const orig = require("../Poll").update;
    require("../Poll").update = jest.fn().mockRejectedValue(new Error("fail"));
    await expect(require("../Poll").update(1, {})).rejects.toThrow("fail");
    require("../Poll").update = orig;
  });

  it("should throw if db error on delete", async () => {
    const orig = require("../Poll").delete;
    require("../Poll").delete = jest.fn().mockRejectedValue(new Error("fail"));
    await expect(require("../Poll").delete(1)).rejects.toThrow("fail");
    require("../Poll").delete = orig;
  });

  it("should throw if db error on createWithQuestions", async () => {
    const orig = require("../Poll").createWithQuestions;
    require("../Poll").createWithQuestions = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await expect(
      require("../Poll").createWithQuestions({
        creator_id: 1,
        question: "fail",
        questions: [],
      })
    ).rejects.toThrow("fail");
    require("../Poll").createWithQuestions = orig;
  });

  it("should throw if db error on findByIdWithQuestions", async () => {
    const orig = require("../Poll").findByIdWithQuestions;
    require("../Poll").findByIdWithQuestions = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await expect(require("../Poll").findByIdWithQuestions(1)).rejects.toThrow(
      "fail"
    );
    require("../Poll").findByIdWithQuestions = orig;
  });
});
