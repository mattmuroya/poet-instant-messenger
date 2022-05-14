const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    const users = await User.find({})
      .populate("contacts", "username")
      .populate("invitations", "username");
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "token missing or invalid",
    });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await User.findById(req.params.id)
      .populate("contacts", "username")
      .populate("invitations", "username");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "token missing or invalid",
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  res.status(200).json({
    id: user._id.toString(),
    username: user.username,
    token,
  });
});

userRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "username and password required",
    });
  }

  if (username.length > 32) {
    return res.status(400).json({
      error: "username limited to 32 characters",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: "password must be at least 8 characters",
    });
  }

  if (await User.findOne({ username })) {
    return res.status(409).json({
      error: "username unavailable",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    passwordHash,
  });
  await user.save();
  res.status(201).json(user);
});

module.exports = userRouter;
