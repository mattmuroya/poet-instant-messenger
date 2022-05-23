const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const { resetTestData, closeConnection } = require("../utils/reset");

beforeAll(resetTestData, 10000);
afterAll(closeConnection);

describe("user registration", () => {
  test("can post valid new user registration", async () => {
    const res = await api
      .post("/api/users/register")
      .send({
        username: "Matt_Muroya",
        password: "hunter-2",
      })
      .expect(201);
    expect(res.body.user.username).toBe("Matt_Muroya");
    expect(res.body.user.friends).toHaveLength(0);
    expect(res.body.user.invitesReceived).toHaveLength(0);
    expect(res.body.user.invitesSent).toHaveLength(0);

    const savedUser = await User.findOne({ username: res.body.user.username });
    expect(savedUser.usernameCanonical).toBe("matt_muroya");
  });

  test("missing username returns 400", async () => {
    const res = await api
      .post("/api/users/register")
      .send({
        password: "hunter-2",
      })
      .expect(400);
    expect(res.error.text).toBe('{"error":"Username and password required."}');
  });

  test("missing password returns 400", async () => {
    const res = await api
      .post("/api/users/register")
      .send({
        username: "MattMuroya",
      })
      .expect(400);
    expect(res.error.text).toBe('{"error":"Username and password required."}');
  });

  test("duplicate username (case-insensitive) returns 409", async () => {
    const res = await api
      .post("/api/users/register")
      .send({
        username: "matt_muroya",
        password: "hunter-2",
      })
      .expect(409);
    expect(res.error.text).toBe('{"error":"Username unavailable."}');
  });

  test("username with invalid character returns 400", async () => {
    const res = await api
      .post("/api/users/register")
      .send({
        username: "mattmuroya ",
        password: "hunter-2",
      })
      .expect(400);
    expect(res.error.text).toBe(
      '{"error":"Username can contain only letters, numbers, and underscores."}'
    );
  });
});

describe("user login", () => {
  test("can log in with valid credentials", async () => {
    const res = await api
      .post("/api/users/login")
      .send({
        username: "user1",
        password: "user1234",
      })
      .expect(200);
    expect(typeof res.body.token).toBe("string");
  });

  test("can log in with case-insensitive username", async () => {
    const res = await api
      .post("/api/users/login")
      .send({
        username: "matt_muroya",
        password: "hunter-2",
      })
      .expect(200);
    expect(typeof res.body.token).toBe("string");
  });

  test("invalid credentails are rejected", async () => {
    const res = await api
      .post("/api/users/login")
      .send({
        username: "user2",
        password: "wrongPassword",
      })
      .expect(401);
    expect(res.error.text).toBe('{"error":"Invalid username or password."}');
  });
});

describe("getting user data", () => {
  test("can get user data with valid token", async () => {
    const loginRes = await api.post("/api/users/login").send({
      username: "admin",
      password: "admin1234",
    });
    const token = loginRes.body.token;
    const res = await api
      .get("/api/users")
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(200);
    expect(res.body.users).toHaveLength(10); // 10th user added in prev test
  });

  test("get user data rejected with missing/invalid token", async () => {
    const res = await api
      .get("/api/users")
      .set({
        Authorization: "bearer BAD_TOKEN",
      })
      .expect(401);
    expect(res.error.text).toBe('{"error":"Token missing or invalid."}');
  });

  test("can get user by id", async () => {
    const userToGet = await User.findOne({ username: "user1" });
    const id = userToGet._id.toString();
    const loginRes = await api.post("/api/users/login").send({
      username: "admin",
      password: "admin1234",
    });
    const res = await api
      .get(`/api/users/${id}`)
      .set({
        Authorization: `bearer ${loginRes.body.token}`,
      })
      .expect(200);
    expect(res.body.user.username).toBe("user1");
  });

  test("get user by id rejected with bad id", async () => {
    const loginRes = await api.post("/api/users/login").send({
      username: "admin",
      password: "admin1234",
    });
    const res = await api
      .get("/api/users/BAD_ID")
      .set({
        Authorization: `bearer ${loginRes.body.token}`,
      })
      .expect(400);
    expect(res.error.text).toBe('{"error":"Invalid userId."}');
  });
});
