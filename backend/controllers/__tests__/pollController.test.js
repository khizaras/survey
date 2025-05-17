// Unit tests for pollController.js
const pollController = require("../../controllers/pollController");
const httpMocks = require("node-mocks-http");

describe("pollController", () => {
  it("should return 400 if required fields are missing on createPoll", async () => {
    const req = httpMocks.createRequest({ method: "POST", body: {} });
    const res = httpMocks.createResponse();
    await pollController.createPoll(req, res);
    // Should not throw, should return 400
    expect(res.statusCode).toBe(400);
  });

  it("should handle listActivePolls with no polls", async () => {
    const req = httpMocks.createRequest({ method: "GET" });
    const res = httpMocks.createResponse();
    // Mock Poll.findActive to return []
    const orig = require("../../models/Poll").findActive;
    require("../../models/Poll").findActive = jest.fn().mockResolvedValue([]);
    await pollController.listActivePolls(req, res);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res._getJSONData())).toBe(true);
    require("../../models/Poll").findActive = orig;
  });

  it("should handle getPollDetails with invalid id", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      params: { id: 999999 },
    });
    const res = httpMocks.createResponse();
    // Mock Poll.findById to return null
    const orig = require("../../models/Poll").findById;
    require("../../models/Poll").findById = jest.fn().mockResolvedValue(null);
    await pollController.getPollDetails(req, res);
    expect(res.statusCode).toBe(404);
    require("../../models/Poll").findById = orig;
  });

  it("should return 500 if Poll.create throws in createPoll", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        questions: [{ question_text: "Q?", type: "radio", options: ["A"] }],
      },
    });
    const res = httpMocks.createResponse();
    const orig = require("../../models/Poll").create;
    require("../../models/Poll").create = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await pollController.createPoll(req, res);
    expect(res.statusCode).toBe(500);
    require("../../models/Poll").create = orig;
  });

  it("should return 500 if Poll.findActive throws in listActivePolls", async () => {
    const req = httpMocks.createRequest({ method: "GET" });
    const res = httpMocks.createResponse();
    const orig = require("../../models/Poll").findActive;
    require("../../models/Poll").findActive = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await pollController.listActivePolls(req, res);
    expect(res.statusCode).toBe(500);
    require("../../models/Poll").findActive = orig;
  });

  it("should return 500 if Poll.findById throws in getPollDetails", async () => {
    const req = httpMocks.createRequest({ method: "GET", params: { id: 1 } });
    const res = httpMocks.createResponse();
    const orig = require("../../models/Poll").findById;
    require("../../models/Poll").findById = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await pollController.getPollDetails(req, res);
    expect(res.statusCode).toBe(500);
    require("../../models/Poll").findById = orig;
  });

  it("should return 500 if Poll.update throws in updatePoll", async () => {
    const req = httpMocks.createRequest({
      method: "PUT",
      params: { id: 1 },
      body: {},
    });
    const res = httpMocks.createResponse();
    const orig = require("../../models/Poll").update;
    require("../../models/Poll").update = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await pollController.updatePoll(req, res);
    expect(res.statusCode).toBe(500);
    require("../../models/Poll").update = orig;
  });

  it("should return 500 if Poll.delete throws in deletePoll", async () => {
    const req = httpMocks.createRequest({
      method: "DELETE",
      params: { id: 1 },
    });
    const res = httpMocks.createResponse();
    const orig = require("../../models/Poll").delete;
    require("../../models/Poll").delete = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await pollController.deletePoll(req, res);
    expect(res.statusCode).toBe(500);
    require("../../models/Poll").delete = orig;
  });

  it("should return 404 if poll not found in voteOnPoll", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      params: { id: 9999 },
      body: { option_ids: [[1]] },
    });
    const res = httpMocks.createResponse();
    const orig = require("../../models/Poll").findById;
    require("../../models/Poll").findById = jest.fn().mockResolvedValue(null);
    await pollController.voteOnPoll(req, res);
    expect(res.statusCode).toBe(404);
    require("../../models/Poll").findById = orig;
  });

  it("should return 400 if already voted in voteOnPoll", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      params: { id: 1 },
      body: { option_ids: [[1]] },
    });
    const res = httpMocks.createResponse();
    const origPoll = require("../../models/Poll").findById;
    const origVote = require("../../models/Vote").findByUserIdAndPollId;
    require("../../models/Poll").findById = jest
      .fn()
      .mockResolvedValue({ id: 1 });
    require("../../models/Vote").findByUserIdAndPollId = jest
      .fn()
      .mockResolvedValue([{}]);
    await pollController.voteOnPoll(req, res);
    expect(res.statusCode).toBe(400);
    require("../../models/Poll").findById = origPoll;
    require("../../models/Vote").findByUserIdAndPollId = origVote;
  });

  it("should return 500 if Vote.create throws in voteOnPoll", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      params: { id: 1 },
      body: { option_ids: [[1]] },
    });
    const res = httpMocks.createResponse();
    const origPoll = require("../../models/Poll").findById;
    const origVote = require("../../models/Vote").findByUserIdAndPollId;
    const origQ = require("../../models/Question").findByPollId;
    const origVoteCreate = require("../../models/Vote").create;
    require("../../models/Poll").findById = jest
      .fn()
      .mockResolvedValue({ id: 1 });
    require("../../models/Vote").findByUserIdAndPollId = jest
      .fn()
      .mockResolvedValue([]);
    require("../../models/Question").findByPollId = jest
      .fn()
      .mockResolvedValue([{ id: 1 }]);
    require("../../models/Vote").create = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await pollController.voteOnPoll(req, res);
    expect(res.statusCode).toBe(500);
    require("../../models/Poll").findById = origPoll;
    require("../../models/Vote").findByUserIdAndPollId = origVote;
    require("../../models/Question").findByPollId = origQ;
    require("../../models/Vote").create = origVoteCreate;
  });
});
