import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    const users = await User.find({})
      .populate("contacts", "username")
      .populate("invitations", "username");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await User.findById(req.params.id)
      .populate("contacts", "username")
      .populate("invitations", "username");
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
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
      { id: user._id.toString(), username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    res.status(200).json({
      id: user._id.toString(),
      username: user.username,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
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
    const user = new User({
      username,
      passwordHash,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
