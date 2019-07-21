const validator = require('validator');
const postModel = require('../models/postModel');
const userModel = require('../models/userModels');
var jwt = require('jsonwebtoken');


const createPost = async (req, res) => {
    const { message, user_id } = req.body;

    let getToken = '';
    if (req.headers.authorization) {
        getToken = req.headers.authorization.split(' ')[1]
    }
    
    jwt.verify(getToken, process.env.JWT_PRIVATE_KEY, function(err, decoded) {
        if (!err) {
            if (message.length) {
                const post = new postModel({
                    message: validator.escape(message),
                    user_id: decoded._id,
                    name: decoded.name
                });
    
                post.save()
                    .then(result => {
                        return res.send({output: result, success: "Post has been created successfully."});
                    })
                    .catch(err => {
                        return res.json(err);
                    });
                
            } else {
                return res.status(404).json({ msg: "Post Content should not be empty" });
            }
        } else {
            res.status(404).json({ error: "Token is invalid." });
        }
    });
    
}

const getPosts = async (req, res) => {
    const posts = await postModel.find({});

    if (posts) {
        return res.json(posts);
    } else {
        return res.status(404).json({ msg: "No posts were found." });
    }
}

const deletePost = async (req, res) => {
    const removePost = await postModel.findByIdAndDelete(req.body.post_id);
    if (removePost) {
        return res.json(removePost);
    } else {
        return res.json({ error: `Could not remove the post. id: ${post_id}` });
    }
    
}

const editPost = async (req, res) => {
    const { post_id, text } = req.body.data;

    const updatePost = await postModel.findOneAndUpdate({ _id: post_id }, { $set: { message: validator.escape(text) } }, { new: true });

    if (updatePost) {
        return res.json(updatePost);
    } else {
        return res.json({ error: `Could not update the post. id: ${post_id}` });
    }
}

module.exports = {
    createPost,
    getPosts,
    deletePost,
    editPost
}