const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    email_is_verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    state: String,
    county: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;