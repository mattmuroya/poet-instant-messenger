const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const { resetTestData, closeConnection } = require("../utils/reset");
const jwt = require("jsonwebtoken");

beforeAll(resetTestData, 10000);
afterAll(closeConnection);

describe("saved token validation", () => {
  test("valid token returns new token with 24h expiry", async () => {
    const loginRes = await api.post("/api/users/login").send({
      username: "admin",
      password: "admin1234",
    });
    const token = loginRes.body.token;
    // pause 3s after login so reauthorization issues new token
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 3000)
    );
    const res = await api
      .post("/api/auth/")
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(200);
    const newToken = res.body.newToken;
    expect(newToken).not.toBe(token);

    const newTokenDecoded = jwt.verify(newToken, process.env.JWT_SECRET);
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    // new exp time should be 24 hours from now
    // (within 10s to account for slow network/script)
    expect(newTokenDecoded.exp).toBeGreaterThanOrEqual(
      currentTimeInSeconds + 86400 - 10
    );
    expect(newTokenDecoded.exp).toBeLessThanOrEqual(
      currentTimeInSeconds + 86400 + 10
    );
  });

  test("expired token returns 401", async () => {
    const res = await api
      .post("/api/auth/")
      .set({
        Authorization: `bearer ${process.env.EXPIRED_TOKEN}`,
      })
      .expect(401);
    expect(res.error.text).toBe('{"error":"Token expired."}');
  });

  test("malformed token returns 401", async () => {
    const res = await api
      .post("/api/auth/")
      .set({
        Authorization: `bearer BAD_TOKEN`,
      })
      .expect(401);
    expect(res.error.text).toBe('{"error":"Token missing or invalid."}');
  });

  test("missing token returns 401", async () => {
    const res = await api
      .post("/api/auth/")
      .set({
        Authorization: ``,
      })
      .expect(401);
    expect(res.error.text).toBe('{"error":"Token missing or invalid."}');
  });
});
