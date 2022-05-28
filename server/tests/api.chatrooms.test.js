const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const { resetTestData, closeConnection } = require("../utils/reset");

beforeAll(resetTestData, 10000);
afterAll(closeConnection);

describe("reading default chatrooms", () => {
  test("can get list of default chatrooms", async () => {
    const res = await api.get("/api/chatrooms").expect(200);
    expect(res.body.chatrooms).toHaveLength(1);
    expect(res.body.chatrooms[0].name).toBe("General");
  });
});
