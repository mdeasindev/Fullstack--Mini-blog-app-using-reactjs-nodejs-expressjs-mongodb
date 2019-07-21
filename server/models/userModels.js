const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required."]
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    }
});

module.exports = model('User', UserSchema);