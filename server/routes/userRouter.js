const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

userRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

userRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: 'username and password required'
    });
  }

  if (username.length > 32) {
    return res.status(400).json({
      error: 'username limited to 32 characters'
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: 'password must be at least 8 characters'
    });
  }

  if (await User.findOne({ username })) {
    return res.status(409).json({
      error: 'username unavailable'
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    passwordHash
  });
  await user.save();
  res.status(201).json(user);
});

module.exports = userRouter;
