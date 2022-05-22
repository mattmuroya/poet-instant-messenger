const User = require("../models/user");
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

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id)
      .populate("friends", "username")
      .populate("invitesReceived", "username")
      .populate("invitesSent", "username");
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
      sender.invitesSent.includes(recipientId)
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

module.exports.acceptInvite = async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.token, process.env.JWT_SECRET);
    const { acceptedId } = req.body;
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
