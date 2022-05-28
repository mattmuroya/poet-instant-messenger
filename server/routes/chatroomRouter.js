const chatroomRouter = require("express").Router();
const { getChatrooms } = require("../controllers/chatroomController");

chatroomRouter.get("/", getChatrooms);

module.exports = chatroomRouter;
