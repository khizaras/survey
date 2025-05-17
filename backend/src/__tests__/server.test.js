// Mock authMiddleware to always set req.user
jest.mock("../../middleware/authMiddleware", () => (req, res, next) => {
  req.user = { id: 1, name: "Test User", email: "test@example.com" };
  next();
});

// Unit tests for server.js error handling
const request = require("supertest");
const app = require("../../src/server");

describe("server.js", () => {
  it("should return 404 for unknown route", async () => {
    const res = await request(app).get("/api/unknown");
    expect(res.statusCode).toBe(404);
  });

  it("should handle internal server error", async () => {
    // Simulate error by calling error handler directly
    const err = new Error("Test error");
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    app._router.stack[app._router.stack.length - 1].handle(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
