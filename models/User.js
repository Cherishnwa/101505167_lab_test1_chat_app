const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

// Important: enforce unique index

module.exports = mongoose.model("User", userSchema);
