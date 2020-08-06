const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  notes: String,
  noticeDate: {
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
