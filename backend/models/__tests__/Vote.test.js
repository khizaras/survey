// Unit tests for Vote model
const Vote = require("../Vote");

describe("Vote Model", () => {
  it("should create a vote", async () => {
    const vote = await Vote.create({
      user_id: 1,
      poll_id: 1,
      question_id: 1,
      option_id: 1,
    });
    expect(vote).toBeTruthy();
  });

  it("should find votes by poll id", async () => {
    const votes = await Vote.findByPollId(1);
    expect(Array.isArray(votes)).toBe(true);
  });

  it("should find votes by user and poll id", async () => {
    const votes = await Vote.findByUserIdAndPollId(1, 1);
    expect(Array.isArray(votes)).toBe(true);
  });
});
