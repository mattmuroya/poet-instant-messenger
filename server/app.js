const express = require("express");
const app = express();
const mongoose = require("mongoose");
const info = require("./utils/info");
const { MONGODB_URL } = require("./utils/config");
const reqLogger = require("./middleware/reqLogger");
const tokenValidator = require("./middleware/tokenValidator");

const userRouter = require("./routes/userRouter");
// const chatRouter = require('./routes/chatRouter');
// const messageRouter = require('./routes/messageRouter');

(async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    info("MongoDB connected.");
  } catch (err) {
    info("MongoDB connection error: ", err.message);
  }
})();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

// REQUEST PROCESSORS
app.use(express.json());
app.use(reqLogger);
app.use(tokenValidator);

// REQUEST ROUTERS
app.use("/api/users", userRouter);
// app.use('/api/chats', chatRouter);
// app.use('/api/messages', messageRouter);

// CATCH ROUTE
app.use((_req, res) => {
  res.status(404).json({
    error: "Unknown endpoint.",
  });
});

module.exports = app;
