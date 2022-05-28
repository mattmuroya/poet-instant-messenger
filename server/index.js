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
    console.log(onlineUsers);
  });

  socket.on("send_message", (message) => {
    socket
      .to(onlineUsers[message.recipient.id])
      .emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    // io.emit("get_disconnected_user");
    info("user disconnected");
  });

  // socket.on("receive_disconnected_user", (user) => {
  //   delete onlineUsers[user.id];
  // });
});

server.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
