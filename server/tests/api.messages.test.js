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

    const messages = await Message.find({});
    expect(messages).toHaveLength(4); // three test messages prepopulated
  });

  test("second user can respond with new message", async () => {
    const admin = await User.findOne({ username: "admin" });
    const loginRes = await api.post("/api/users/login").send({
      username: "userA",
      password: "user1234",
    });
    const token = loginRes.body.token;
    const res = await api
      .post("/api/messages")
      .send({
        recipient: admin._id.toString(),
        text: "Howzit!",
      })
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(201);
    expect(res.body.message.text).toBe("Howzit!");

    const messages = await Message.find({});
    expect(messages).toHaveLength(5);
  });

  test("post message fails with missing text", async () => {
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
        // text: "",
      })
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(400);
    expect(res.error.text).toBe('{"error":"Message body cannot be empty."}');

    const messages = await Message.find({});
    expect(messages).toHaveLength(5);
  });
});

describe("reading messages", () => {
  test("retrieve messages between two users", async () => {
    const userA = await User.findOne({ username: "userA" });
    const loginRes = await api.post("/api/users/login").send({
      username: "admin",
      password: "admin1234",
    });
    const token = loginRes.body.token;
    const res = await api
      .get(`/api/messages/${userA._id.toString()}`)
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(200);
    // console.log(res.body.messages);
    expect(res.body.messages).toHaveLength(2);
  });
});
