const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    notes: String
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;