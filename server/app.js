const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./utils/config');
const { info } = require ('./utils/info');

const {
  reqLogger,
  tokenExtractor,
  catchAll
} = require('./middleware/middleware');
const userRouter = require('./routes/userRouter');
// const chatRouter = require('./routes/chatRouter');
// const messageRouter = require('./routes/messageRouter');

(async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    info('MongoDB connected.');
  } catch (err) {
    info('MongoDB connection error: ', err.message);
  }
})();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

// REQUEST PROCESSORS
app.use(express.json());
app.use(reqLogger);
app.use(tokenExtractor)

// ROUTES
app.use('/api/users', userRouter);
// app.use('/api/chats', chatRouter);
// app.use('/api/messages', messageRouter);
app.use(catchAll);

module.exports = app;
