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
});
