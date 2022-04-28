const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        topic: String,
        title: String,
        content: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('Post', postSchema);

module.exports = {Post};