const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  county: {
    type: String,
    required: true,
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Events",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
