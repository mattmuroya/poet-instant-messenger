const Chatroom = require("../models/chatroom");

module.exports.getChatrooms = async (req, res, next) => {
  try {
    console.log("chat");
    // const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    // const users = await User.find({})
    //   .populate("friends", "username")
    //   .populate("invitesReceived", "username")
    //   .populate("invitesSent", "username");
    // res.json({ users });
    const chatrooms = await Chatroom.find({});
    res.status(200).json({ chatrooms });
  } catch (error) {
    next(error);
  }
};
