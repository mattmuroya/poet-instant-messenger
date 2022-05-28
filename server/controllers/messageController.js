const Message = require("../models/message");
const jwt = require("jsonwebtoken");

module.exports.getMessages = async (req, res, next) => {
  // need to retrieve direct messages between two users (both to and from)
  try {
    const { id } = jwt.verify(req.token, process.env.JWT_SECRET);
    const recipient = req.params.id;
    const messages = await Message.find({
      $or: [
        { sender: id, recipient: recipient },
        { sender: recipient, recipient: id },
      ],
    })
      .populate("sender", "username")
      .populate("recipient", "username");
    // if (!messages) {
    //   return res.status(404).json({
    //     error: "Messages not found.",
    //   });
    // }
    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};

module.exports.getChatroomMessages = async (req, res, next) => {
  try {
    const chatroom = req.params.id;
    const messages = await Message.find({
      chatroom,
    }).populate("sender", "username");
    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.token, process.env.JWT_SECRET);
    const { recipient, chatroom, text } = req.body;
    if (!text) {
      return res.status(400).json({
        error: "Message body cannot be empty.",
      });
    }
    let message = await Message.create({
      sender: id,
      recipient,
      chatroom,
      text,
    });
    message = await Message.findById(message._id)
      .populate("sender", "username")
      .populate("recipient", "username")
      .populate("chatroom", "name");
    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};
