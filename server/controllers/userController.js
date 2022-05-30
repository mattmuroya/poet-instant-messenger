const User = require("../models/user");
const Message = require("../models/message");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    const users = await User.find({})
      .populate("friends", "username")
      .populate("invitesReceived", "username")
      .populate("invitesSent", "username");
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

module.exports.getRedactedUsers = async (req, res, next) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET);
    const data = await User.find({});
    const users = data.map((user) => {
      return { username: user.username, id: user._id.toString() };
    });
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id)
      .populate("friends", "username")
      .populate("invitesReceived", "username")
      .populate("invitesSent", "username");

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await User.findById(req.params.id)
      .populate("friends", "username")
      .populate("invitesReceived", "username")
      .populate("invitesSent", "username");
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      usernameCanonical: username.toLowerCase(),
    });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "Invalid username or password.",
      });
    }
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: 86400 }
    );
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usernameCanonical = username ? username.toLowerCase() : undefined;
    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password required.",
      });
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return res.status(400).json({
        error: "Username can contain only letters, numbers, and underscores.",
      });
    } else if (username.length > 32) {
      return res.status(400).json({
        error: "Username limited to 32 characters.",
      });
    } else if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters.",
      });
    } else if (await User.findOne({ usernameCanonical })) {
      return res.status(409).json({
        error: "Username unavailable.",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      usernameCanonical,
      passwordHash,
    });

    // for the demo app
    if (user.username !== "mightymorphinmatt") {
      const mattmuroya = await User.findOne({ username: "mightymorphinmatt" });
      if (mattmuroya) {
        await User.findByIdAndUpdate(user._id, {
          $push: { friends: mattmuroya._id },
        });
        await User.findByIdAndUpdate(mattmuroya._id, {
          $push: { friends: user._id },
        });
        await Message.create({
          sender: mattmuroya._id,
          recipient: user._id,
          text: "Hi! I'm Matt Muroya. Thanks for checking out Poet Instant Messenger! I'd love to hear your feedback, suggestions, or bug reports. Feel free to message me via email, LinkedIn, or right here in the app! :)",
        });
      }
    }
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.sendInvite = async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.token, process.env.JWT_SECRET);
    const { recipientId } = req.body;
    const sender = await User.findById(id);
    if (
      sender.friends.includes(recipientId) ||
      sender.invitesSent.includes(recipientId) ||
      sender.invitesReceived.includes(recipientId)
    ) {
      return res.status(409).json({
        error: "Duplicate invite.",
      });
    }
    const updatedRecipient = await User.findByIdAndUpdate(recipientId, {
      $push: {
        invitesReceived: id,
      },
    });
    if (!updatedRecipient) {
      return res.status(400).json({
        error: "Invalid userId.",
      });
    }
    const updatedSender = await User.findByIdAndUpdate(id, {
      $push: {
        invitesSent: recipientId,
      },
    });
    if (!updatedSender) {
      return res.status(400).json({
        error: "Invalid userId.",
      });
    }
    res.status(201).json({ recipientId });
  } catch (error) {
    next(error);
  }
};

module.exports.cancelInvite = async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.token, process.env.JWT_SECRET);
    const { recipientId } = req.body;
    const sender = await User.findById(id);
    const recipient = await User.findById(recipientId);
    if (
      !sender.invitesSent.includes(recipientId) ||
      !recipient.invitesReceived.includes(id)
    ) {
      return res.status(404).json({
        error: "Invite not found.",
      });
    }
    const updatedRecipient = await User.findByIdAndUpdate(recipientId, {
      $pull: {
        invitesReceived: id,
      },
    });
    if (!updatedRecipient) {
      return res.status(400).json({
        error: "Invalid userId.",
      });
    }
    const updatedSender = await User.findByIdAndUpdate(id, {
      $pull: {
        invitesSent: recipientId,
      },
    });
    if (!updatedSender) {
      return res.status(400).json({
        error: "Invalid userId.",
      });
    }
    res.status(201).json({ recipientId });
  } catch (error) {
    next(error);
  }
};

module.exports.acceptInvite = async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.token, process.env.JWT_SECRET);
    const { acceptedId } = req.body;

    const acceptor = await User.findById(id);
    const accepted = await User.findById(acceptedId);
    if (
      !acceptor.invitesReceived.includes(acceptedId) ||
      !accepted.invitesSent.includes(id)
    ) {
      return res.status(404).json({
        error: "Invite not found.",
      });
    }

    const updatedAccepted = await User.findByIdAndUpdate(acceptedId, {
      $push: {
        friends: id,
      },
      $pull: {
        invitesSent: id,
      },
    });
    if (!updatedAccepted) {
      return res.status(400).json({
        error: "Invalid userId.",
      });
    }
    const updatedAcceptor = await User.findByIdAndUpdate(id, {
      $push: {
        friends: acceptedId,
      },
      $pull: {
        invitesReceived: acceptedId,
      },
    });
    if (!updatedAcceptor) {
      return res.status(400).json({
        error: "Invalid userId.",
      });
    }
    res.status(201).json({ acceptedId });
  } catch (error) {
    next(error);
  }
};

module.exports.rejectInvite = async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.token, process.env.JWT_SECRET);
    const { rejectedId } = req.body;
    const rejector = await User.findById(id);
    const rejected = await User.findById(rejectedId);
    if (
      !rejector.invitesReceived.includes(rejectedId) ||
      !rejected.invitesSent.includes(id)
    ) {
      return res.status(404).json({
        error: "Invite not found.",
      });
    }
    const updatedRejected = await User.findByIdAndUpdate(rejectedId, {
      $pull: {
        invitesSent: id,
      },
    });
    if (!updatedRejected) {
      return res.status(400).json({
        error: "Invalid userId.",
      });
    }
    const updatedRejector = await User.findByIdAndUpdate(id, {
      $pull: {
        invitesReceived: rejectedId,
      },
    });
    if (!updatedRejector) {
      return res.status(400).json({
        error: "Invalid userId.",
      });
    }
    res.status(201).json({ rejectedId });
  } catch (error) {
    next(error);
  }
};
