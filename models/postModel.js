const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
    message: {
        type: String,
        trim: true,
        required: [true, "Post Content is required."]
    },
    user_id: {
        type: String,
        trim: true,
        required: [true, "User ID is required to post."]
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required."]
    }
});

module.exports = model('Post', postSchema);