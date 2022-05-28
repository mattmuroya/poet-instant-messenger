const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  nameCanonical: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

chatroomSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.nameCanonical;
  },
});

module.exports = mongoose.model("Chatroom", chatroomSchema);
