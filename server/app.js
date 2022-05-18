const express = require("express");
const app = express();
const mongoose = require("mongoose");
const info = require("./utils/info");
const { MONGODB_URL } = require("./utils/config");
const reqLogger = require("./middleware/reqLogger");
const tokenExtractor = require("./middleware/tokenExtractor");

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
// const chatRouter = require('./routes/chatRouter');
// const messageRouter = require('./routes/messageRouter');
const catchHandler = require("./middleware/catchHandler");
const errorHandler = require("./middleware/errorHandler");

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
app.use(tokenExtractor);

// REQUEST ROUTERS
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
// app.use('/api/chats', chatRouter);
// app.use('/api/messages', messageRouter);

// CATCH HANDLER
app.use(catchHandler);

// ERROR HANDLER
app.use(errorHandler);

module.exports = app;
