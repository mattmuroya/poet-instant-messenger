const messageRouter = require("express").Router();
const { sendMessage } = require("../controllers/messageController");

messageRouter.post("/", sendMessage);

module.exports = messageRouter;
