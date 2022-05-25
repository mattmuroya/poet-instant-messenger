const messageRouter = require("express").Router();
const {
  getMessages,
  sendMessage,
} = require("../controllers/messageController");

messageRouter.get("/:id", getMessages);
messageRouter.post("/", sendMessage);

module.exports = messageRouter;
