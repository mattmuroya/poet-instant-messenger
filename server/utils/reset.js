const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");
const Message = require("../models/message");

const resetTestData = async () => {
  await Message.deleteMany({});
  await User.deleteMany({});

  // create admin

  const admin = await api.post("/api/users/register").send({
    username: "admin",
    password: "admin1234",
  });

  // create users 1 and 2 as friends

  const user1 = await api.post("/api/users/register").send({
    username: "user1",
    password: "user1234",
  });

  const user2 = await api.post("/api/users/register").send({
    username: "user2",
    password: "user1234",
  });

  await User.findByIdAndUpdate(user1.body.user.id, {
    $push: { friends: user2.body.user.id },
  });

  await User.findByIdAndUpdate(user2.body.user.id, {
    $push: { friends: user1.body.user.id },
  });

  await Message.create({
    sender: user1.body.user.id,
    recipient: user2.body.user.id,
    text: "hey user2!",
  });

  await Message.create({
    sender: user2.body.user.id,
    recipient: user1.body.user.id,
    text: "omg what's up user1!",
  });

  // create users A, B, C, D for admin testing

  const userA = await api.post("/api/users/register").send({
    username: "userA",
    password: "user1234",
  });

  const userB = await api.post("/api/users/register").send({
    username: "userB",
    password: "user1234",
  });

  const userC = await api.post("/api/users/register").send({
    username: "userC",
    password: "user1234",
  });

  const userD = await api.post("/api/users/register").send({
    username: "userD",
    password: "user1234",
  });

  // ===

  const userE = await api.post("/api/users/register").send({
    username: "userE",
    password: "user1234",
  });

  const userF = await api.post("/api/users/register").send({
    username: "userF",
    password: "user1234",
  });

  await User.findByIdAndUpdate(userE.body.user.id, {
    $push: { invitesSent: userF.body.user.id },
  });

  await User.findByIdAndUpdate(userF.body.user.id, {
    $push: { invitesReceived: userE.body.user.id },
  });

  // await User.findByIdAndUpdate(admin.body.user.id, {
  //   $push: {
  //     friends: { $each: [userA.body.user.id, userB.body.user.id] },
  //     invitesReceived: userC.body.user.id,
  //     invitesSent: userD.body.user.id,
  //   },
  // });

  // await User.findByIdAndUpdate(userA.body.user.id, {
  //   $push: {
  //     friends: admin.body.user.id,
  //   },
  // });

  // await User.findByIdAndUpdate(userB.body.user.id, {
  //   $push: {
  //     friends: admin.body.user.id,
  //   },
  // });

  // await User.findByIdAndUpdate(userC.body.user.id, {
  //   $push: {
  //     invitesSent: admin.body.user.id,
  //   },
  // });

  // await User.findByIdAndUpdate(userD.body.user.id, {
  //   $push: {
  //     invitesReceived: admin.body.user.id,
  //   },
  // });

  //=====

  // const res = await api.post('/api/users/sign-on')
  //   .send({
  //     screenName: 'admin',
  //     password: 'admin1234'
  //   });

  // const token = res.body.token;

  // const room = await api.post('/api/rooms')
  //   .set({
  //     Authorization: `bearer ${token}`
  //   })
  //   .send({
  //     users: [
  //       admin.body.id,
  //       root.body.id
  //     ]
  //   });

  // await api.post('/api/messages')
  //   .set({
  //     Authorization: `bearer ${token}`
  //   })
  //   .send({
  //     author: admin.body.id,
  //     room: room.body.id,
  //     text: 'this is an existing messages',
  //     timestamp: 'Fri May 01 2022 18:00:00 GMT-1000 (Hawaii-Aleutian Standard Time)'
  //   });
};

const closeConnection = async () => {
  await mongoose.connection.close();
};

const reset = async () => {
  await resetTestData();
  await closeConnection();
  console.log("test Db reset complete");
};

module.exports = {
  resetTestData,
  closeConnection,
  reset,
};
