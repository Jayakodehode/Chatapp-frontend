const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    text: {
      typr: String,
      required: true,
    },
  },
  users: Array,
  sende: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  timestamps: true,
});
module.exports = mongoose.model("messages", messageSchema);
