const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const {
  resetTestData,
  closeConnection
} = require('../utils/reset');

beforeAll(resetTestData);
afterAll(closeConnection);

describe('user registration', () => {
  test('can post valid new user registration', async () => {
    const res = await api.post('/api/users/register')
      .send({
        username: 'mattmuroya',
        password: 'hunter-2'
      })
      .expect(201);
    expect(res.body.username).toBe('mattmuroya');
    expect(res.body.contacts).toHaveLength(0);
    expect(res.body.invitations).toHaveLength(0);
  });

  test('missing username returns 400', async () => {
    const res = await api.post('/api/users/register')
    .send({
      password: 'hunter-2'
    })
    .expect(400);
  expect(res.error.text).toBe('{"error":"username and password required"}')
  });

  test('missing password returns 400', async () => {
    const res = await api.post('/api/users/register')
    .send({
      username: 'mattmuroya'
    })
    .expect(400);
  expect(res.error.text).toBe('{"error":"username and password required"}')
  });

  test('duplicate username returns 409', async () => {
    const res = await api.post('/api/users/register')
    .send({
      username: 'mattmuroya',
      password: 'hunter-2'
    })
    .expect(409);
  expect(res.error.text).toBe('{"error":"username unavailable"}')
  });
});

describe('user login', () => {
  test('can log in with valid credentials', async () => {
    const res = await api.post('/api/users/login')
      .send({
        username: 'user1',
        password: 'user1234'
      })
      .expect(200);
    expect(res.body.username).toBe('user1');
    expect(typeof res.body.token).toBe('string');
  });

  test('invalid credentails are rejected', async () => {
    const res = await api.post('/api/users/login')
      .send({
        username: 'user2',
        password: 'wrongPassword'
      })
      .expect(401);
    expect(res.error.text).toBe('{"error":"invalid username or password"}');
  });
});

describe('getting user data', () => {
  test('can get user data with valid token', async () => {
    const loginRes = await api.post('/api/users/login')
      .send({
        username: 'admin',
        password: 'admin1234'
      });
    const token = loginRes.body.token;
    const res = await api.get('/api/users')
      .set({
        Authorization: `bearer ${token}`
      })
      .expect(200);
    expect(res.body).toHaveLength(4); // 4th user added in prev test
  });

  test('get user data rejected with missing/invalid token', async () => {
    const res = await api.get('/api/users')
      .set({
        Authorization: 'bearer BADTOKEN'
      })
      .expect(401);
    expect(res.error.text).toBe('{"error":"token missing or invalid"}');
  });
});