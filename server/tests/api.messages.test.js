const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const Message = require("../models/message");
const { resetTestData, closeConnection } = require("../utils/reset");

beforeAll(resetTestData, 10000);
afterAll(closeConnection);

describe("sending messages", () => {
  test("can post new message", async () => {
    const userA = await User.findOne({ username: "userA" });
    const loginRes = await api.post("/api/users/login").send({
      username: "admin",
      password: "admin1234",
    });
    const token = loginRes.body.token;
    const res = await api
      .post("/api/messages")
      .send({
        recipient: userA._id.toString(),
        text: "Hello, world!",
      })
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(201);
    expect(res.body.message.text).toBe("Hello, world!");

    console.log(res.body.message);

    const messages = await Message.find({});
    expect(messages).toHaveLength(1);
  });
});
