const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");
const Message = require("../models/message");

const populateProdData = async () => {
  await Message.deleteMany({});
  await User.deleteMany({});

  // create admin
  await api.post("/api/users/register").send({
    username: "mattmuroya",
    password: process.env.mattmuroya,
  });

  // create users

  await api.post("/api/users/register").send({
    username: "p0k3m0n_m45t3r",
    password: process.env.p0k3m0n_m45t3r,
  });

  await api.post("/api/users/register").send({
    username: "iLuvNickCarter99",
    password: process.env.iLuvNickCarter99,
  });

  await api.post("/api/users/register").send({
    username: "xXx_NIRVANA_xXX",
    password: process.env.xXx_NIRVANA_xXX,
  });

  await api.post("/api/users/register").send({
    username: "ZeldaaaGirl94",
    password: process.env.ZeldaaaGirl94,
  });

  await api.post("/api/users/register").send({
    username: "mj_numba_23",
    password: process.env.mj_numba_23,
  });
};

const closeConnection = async () => {
  await mongoose.connection.close();
};

const populate = async () => {
  await populateProdData();
  await closeConnection();
  console.log("production Db reset complete");
};

module.exports = {
  // populateProdData,
  // closeConnection,
  populate,
};
