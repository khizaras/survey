// Unit tests for adminController.js
const adminController = require("../../controllers/adminController");
const httpMocks = require("node-mocks-http");

describe("adminController", () => {
  it("should return 500 if Poll.findAll throws in listAllPolls", async () => {
    const req = httpMocks.createRequest({ method: "GET" });
    const res = httpMocks.createResponse();
    const orig = require("../../models/Poll").findAll;
    require("../../models/Poll").findAll = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await adminController.listAllPolls(req, res);
    expect(res.statusCode).toBe(500);
    require("../../models/Poll").findAll = orig;
  });

  it("should return 500 if Vote.findByPollId throws in listAllPolls", async () => {
    const req = httpMocks.createRequest({ method: "GET" });
    const res = httpMocks.createResponse();
    const origPoll = require("../../models/Poll").findAll;
    const origVote = require("../../models/Vote").findByPollId;
    require("../../models/Poll").findAll = jest
      .fn()
      .mockResolvedValue([{ id: 1 }]);
    require("../../models/Vote").findByPollId = jest
      .fn()
      .mockRejectedValue(new Error("fail"));
    await adminController.listAllPolls(req, res);
    expect(res.statusCode).toBe(500);
    require("../../models/Poll").findAll = origPoll;
    require("../../models/Vote").findByPollId = origVote;
  });

  it("should return array of polls with participants and department", async () => {
    const req = httpMocks.createRequest({ method: "GET" });
    const res = httpMocks.createResponse();
    const origPoll = require("../../models/Poll").findAll;
    const origVote = require("../../models/Vote").findByPollId;
    require("../../models/Poll").findAll = jest
      .fn()
      .mockResolvedValue([{ id: 1 }]);
    require("../../models/Vote").findByPollId = jest
      .fn()
      .mockResolvedValue([{ user_id: 1 }, { user_id: 2 }]);
    await adminController.listAllPolls(req, res);
    const data = res._getJSONData();
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty("participants");
    expect(data[0]).toHaveProperty("department");
    require("../../models/Poll").findAll = origPoll;
    require("../../models/Vote").findByPollId = origVote;
  });
});
