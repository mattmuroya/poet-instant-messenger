const Message = require("../models/message");
const jwt = require("jsonwebtoken");

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.token, process.env.JWT_SECRET);
    const { recipient, text } = req.body;
    if (!text) {
      return res.status(400).json({
        error: "Message body cannot be empty.",
      });
    }
    const message = await Message.create({
      sender: id,
      recipient,
      text,
    });
    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};
