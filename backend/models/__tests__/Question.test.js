// Unit tests for Question model
const Question = require("../Question");

describe("Question Model", () => {
  it("should create a question", async () => {
    const q = await Question.create({
      poll_id: 1,
      question_text: "Test question?",
      type: "radio",
      image_url: null,
    });
    expect(q).toHaveProperty("id");
    expect(q.question_text).toBe("Test question?");
  });

  it("should find questions by poll id", async () => {
    const poll_id = 1;
    const questions = await Question.findByPollId(poll_id);
    expect(Array.isArray(questions)).toBe(true);
  });
});
