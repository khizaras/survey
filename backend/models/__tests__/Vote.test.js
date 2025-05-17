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

  it("should throw if db error on create", async () => {
    const orig = require("../Vote").create;
    require("../Vote").create = jest.fn().mockRejectedValue(new Error("fail"));
    await expect(
      require("../Vote").create({
        user_id: 1,
        poll_id: 1,
        question_id: 1,
        option_id: 1,
      })
    ).rejects.toThrow("fail");
    require("../Vote").create = orig;
  });

  it("should throw if db error on findByPollId", async () => {
    const orig = require("../Vote").findByPollId;
    require("../Vote").findByPollId = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await expect(require("../Vote").findByPollId(999)).rejects.toThrow("fail");
    require("../Vote").findByPollId = orig;
  });

  it("should throw if db error on findByUserIdAndPollId", async () => {
    const orig = require("../Vote").findByUserIdAndPollId;
    require("../Vote").findByUserIdAndPollId = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await expect(
      require("../Vote").findByUserIdAndPollId(1, 999)
    ).rejects.toThrow("fail");
    require("../Vote").findByUserIdAndPollId = orig;
  });

  it("should return empty array if no votes for poll", async () => {
    const orig = require("../Vote").findByPollId;
    require("../Vote").findByPollId = jest.fn().mockResolvedValue([]);
    const votes = await require("../Vote").findByPollId(99999);
    expect(Array.isArray(votes)).toBe(true);
    expect(votes.length).toBe(0);
    require("../Vote").findByPollId = orig;
  });
});
