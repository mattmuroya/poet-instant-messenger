const messageRouter = require("express").Router();
const {
  getMessages,
  getChatroomMessages,
  sendMessage,
} = require("../controllers/messageController");

messageRouter.get("/:id", getMessages);
messageRouter.get("/chatroom/:id", getChatroomMessages);
messageRouter.post("/", sendMessage);

module.exports = messageRouter;
