// Mock authMiddleware to always set req.user
jest.mock("../../middleware/authMiddleware", () => (req, res, next) => {
  req.user = { id: 1, name: "Test User", email: "test@example.com" };
  next();
});

// Example test for API endpoint
const request = require("supertest");
const app = require("../../src/server");
describe("Poll API", () => {
  it("should return 200 for GET /api/polls", async () => {
    const res = await request(app).get("/api/polls");
    expect(res.statusCode).toEqual(200);
  });
});
