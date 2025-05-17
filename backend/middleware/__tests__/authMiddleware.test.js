// Unit tests for authMiddleware.js
const authMiddleware = require("../../middleware/authMiddleware");

describe("authMiddleware", () => {
  it("should call next if user is authenticated", () => {
    const req = { user: { id: 1 } };
    const res = {};
    const next = jest.fn();
    authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if user is not authenticated", () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
  });
});
