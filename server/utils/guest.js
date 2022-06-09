const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

// const User = require("../models/user");
// const Message = require("../models/message");

const createGuest = async () => {
  // await Message.deleteMany({});
  // await User.deleteMany({});

  await api.post("/api/users/register").send({
    username: "guest",
    password: process.env.GUEST_PW,
  });
};

const closeConnection = async () => {
  await mongoose.connection.close();
};

const populateGuest = async () => {
  await createGuest();
  await closeConnection();
  console.log("guest utility completed execution.");
};

module.exports = {
  populateGuest,
};
