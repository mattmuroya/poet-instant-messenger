const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const { PORT } = require("./utils/config");
const info = require("./utils/info");

const server = http.createServer(app);
const io = new Server(server);

const onlineUsers = {};

io.on("connection", (socket) => {
  info("---");
  info("user connected");
  info(socket.id);

  socket.on("user_online", (user) => {
    onlineUsers[user.id] = socket.id;
    // console.log(onlineUsers);
  });

  socket.on("typing", (data) => {
    if (onlineUsers[data.recipient.id]) {
      io.to(onlineUsers[data.recipient.id]).emit("chat_typing", data.typing);
    }
  });

  socket.on("send_message", (message) => {
    if (onlineUsers[message.recipient.id]) {
      io.to(onlineUsers[message.recipient.id]).emit("receive_message", message);
    }
  });

  socket.on("disconnect", () => {
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    }
    info("user disconnected");
  });
});

server.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
