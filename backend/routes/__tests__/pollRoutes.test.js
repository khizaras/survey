// Example test for API endpoint
const request = require("supertest");
const app = require("../../src/server");
describe("Poll API", () => {
  it("should return 200 for GET /api/polls", async () => {
    const res = await request(app).get("/api/polls");
    expect(res.statusCode).toEqual(200);
  });
});
