const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const { resetTestData, closeConnection } = require("../utils/reset");

beforeAll(resetTestData, 10000);
afterAll(closeConnection);

describe("sending invites", () => {
  test("can send an invite with valid token (AB)", async () => {
    const loginRes = await api.post("/api/users/login").send({
      username: "userA",
      password: "user1234",
    });
    const userB = await User.findOne({ username: "userB" });
    const recipientId = userB._id.toString();
    const token = loginRes.body.token;
    const res = await api
      .put("/api/users/invite")
      .send({
        recipientId,
      })
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(201);
    expect(res.body.recipientId).toBe(recipientId);

    const userA = await User.findOne({ username: "userA" });
    const userBupdated = await User.findOne({ username: "userB" });

    expect(userA.invitesSent).toHaveLength(1);
    expect(userBupdated.invitesReceived).toHaveLength(1);
  });

  test("sending request with exp token returns 401", async () => {
    const userD = await User.findOne({ username: "userD" });
    const recipientId = userD._id.toString();
    await api
      .put("/api/users/invite")
      .send({
        recipientId,
      })
      .set({
        Authorization: `bearer ${process.env.EXPIRED_TOKEN}`,
      })
      .expect(401);

    const userC = await User.findOne({ username: "userC" });
    const userDupdated = await User.findOne({ username: "userD" });

    expect(userC.invitesSent).toHaveLength(0);
    expect(userDupdated.invitesReceived).toHaveLength(0);
  });

  test("invite request with bad recipientId fails", async () => {
    const loginRes = await api.post("/api/users/login").send({
      username: "userC",
      password: "user1234",
    });
    const userD = await User.findOne({ username: "userD" });
    const recipientId = userD._id.toString();
    const token = loginRes.body.token;
    const res = await api
      .put("/api/users/invite")
      .send({
        recipientId: "628983a161bcbd373da975c6",
      })
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(400);
    expect(res.error.text).toBe('{"error":"Invalid userId."}');

    const userC = await User.findOne({ username: "userC" });
    const userDupdated = await User.findOne({ username: "userD" });

    expect(userC.invitesSent).toHaveLength(0);
    expect(userDupdated.invitesReceived).toHaveLength(0);
  });

  test("invite fails if there is already an invite pending", async () => {
    const loginRes = await api.post("/api/users/login").send({
      username: "userA",
      password: "user1234",
    });
    const userB = await User.findOne({ username: "userB" });
    const recipientId = userB._id.toString();
    const token = loginRes.body.token;
    const res = await api
      .put("/api/users/invite")
      .send({
        recipientId,
      })
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(409);
    expect(res.error.text).toBe('{"error":"Duplicate invite."}');

    const userA = await User.findOne({ username: "userA" });
    const userBupdated = await User.findOne({ username: "userB" });

    expect(userA.invitesSent).toHaveLength(1);
    expect(userBupdated.invitesReceived).toHaveLength(1);
  });

  test("invite fails if users are already friends", async () => {
    const loginRes = await api.post("/api/users/login").send({
      username: "user1",
      password: "user1234",
    });
    const user2 = await User.findOne({ username: "user2" });
    const recipientId = user2._id.toString();
    const token = loginRes.body.token;
    const res = await api
      .put("/api/users/invite")
      .send({
        recipientId,
      })
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(409);
    expect(res.error.text).toBe('{"error":"Duplicate invite."}');

    const user1 = await User.findOne({ username: "user1" });
    const user2updated = await User.findOne({ username: "user2" });

    expect(user1.invitesSent).toHaveLength(0);
    expect(user2updated.invitesReceived).toHaveLength(0);
  });
});

describe("cancelling invites", () => {
  test("can send an invite with valid token (CD)", async () => {
    const loginRes = await api.post("/api/users/login").send({
      username: "userC",
      password: "user1234",
    });
    const userD = await User.findOne({ username: "userD" });
    const recipientId = userD._id.toString();
    const token = loginRes.body.token;
    const res = await api
      .put("/api/users/invite")
      .send({
        recipientId,
      })
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(201);
    expect(res.body.recipientId).toBe(recipientId);

    const userC = await User.findOne({ username: "userC" });
    const userDupdated = await User.findOne({ username: "userD" });

    expect(userC.invitesSent).toHaveLength(1);
    expect(userDupdated.invitesReceived).toHaveLength(1);
  });

  test("cancel invite fails if the Id is not found", async () => {
    const loginRes = await api.post("/api/users/login").send({
      username: "userC",
      password: "user1234",
    });
    const userD = await User.findOne({ username: "userD" });
    const token = loginRes.body.token;
    const res = await api
      .put("/api/users/invite/cancel")
      .send({
        recipientId: "628983a161bcbd373da975c6",
      })
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(400);
    expect(res.error.text).toBe('{"error":"Invalid userId."}');

    const userC = await User.findOne({ username: "userC" });
    const userDupdated = await User.findOne({ username: "userD" });

    expect(userC.invitesSent).toHaveLength(1);
    expect(userDupdated.invitesReceived).toHaveLength(1);
  });

  test("can cancel a pending invite with valid Id", async () => {
    const loginRes = await api.post("/api/users/login").send({
      username: "userC",
      password: "user1234",
    });
    const userD = await User.findOne({ username: "userD" });
    const recipientId = userD._id.toString();
    const token = loginRes.body.token;
    const res = await api
      .put("/api/users/invite/cancel")
      .send({
        recipientId,
      })
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(201);
    expect(res.body.recipientId).toBe(recipientId);

    const userC = await User.findOne({ username: "userC" });
    const userDupdated = await User.findOne({ username: "userD" });

    expect(userC.invitesSent).toHaveLength(0);
    expect(userDupdated.invitesReceived).toHaveLength(0);
  });
});

describe("accepting invites", () => {
  test("can accept an invite request", async () => {
    const loginRes = await api.post("/api/users/login").send({
      username: "userB",
      password: "user1234",
    });

    const userA = await User.findOne({ username: "userA" });
    const acceptedId = userA._id.toString();

    const token = loginRes.body.token;
    const res = await api
      .put("/api/users/invite/accept")
      .send({
        acceptedId,
      })
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(201);
    expect(res.body.acceptedId).toBe(acceptedId);

    const userB = await User.findOne({ username: "userB" });
    const userAupdated = await User.findOne({ username: "userA" });

    expect(userAupdated.friends).toContainEqual(userB._id);
    expect(userB.friends).toContainEqual(userAupdated._id);
    expect(userAupdated.invitesSent).toHaveLength(0);
    expect(userB.invitesReceived).toHaveLength(0);
  });
});

describe("rejecting invites", () => {
  test("can reject an invite request", async () => {
    const loginRes = await api.post("/api/users/login").send({
      username: "userF",
      password: "user1234",
    });

    const userE = await User.findOne({ username: "userE" });
    const rejectedId = userE._id.toString();

    const token = loginRes.body.token;
    const res = await api
      .put("/api/users/invite/reject")
      .send({
        rejectedId,
      })
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(201);
    expect(res.body.rejectedId).toBe(rejectedId);

    const userF = await User.findOne({ username: "userF" });
    const userEupdated = await User.findOne({ username: "userE" });

    expect(userF.friends).toHaveLength(0);
    expect(userEupdated.friends).toHaveLength(0);
    expect(userF.invitesReceived).toHaveLength(0);
    expect(userEupdated.invitesSent).toHaveLength(0);
  });
});
