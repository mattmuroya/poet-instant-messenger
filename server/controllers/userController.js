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
    const user = await User.findOne({ username });
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
    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password required.",
      });
    } else if (username.length > 32) {
      return res.status(400).json({
        error: "Username limited to 32 characters.",
      });
    } else if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters.",
      });
    } else if (await User.findOne({ username })) {
      return res.status(409).json({
        error: "Username unavailable.",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      passwordHash,
    });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};
