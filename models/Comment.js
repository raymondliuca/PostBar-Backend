// Dependencies
const { accepts } = require("express/lib/request");
const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    content: String,
    order: Number,
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
});


// Create Model with the name Article
const Comment = mongoose.model("Comment", commentSchema);


module.exports = {Comment};