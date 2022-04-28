// API's for comment Module

// Include model
const {Comment} = require("../models/Comment");
const {Post} = require("../models/Post");
const moment = require("moment");

// HTTP GET - Load an Add comment Form
exports.comment_create_get = (req, res) => {
    res.render("comment/add");
}

// HTTP POST - comment
exports.comment_create_post = (req, res) => {
    
    let comment = new Comment(req.body);
    comment.user = req.user.is
    comment.save()
    .then(() => {
        // Save comment to authors as well
        Post.findByIdAndUpdate(req.body._id, req.body, {new: true})
        .then((post) => {
            post.comments.push(comment);
            post.save();
            res.json({post})
        })
    })
    .catch((err) => {
        console.log(err);
        res.send("ERRRRORRRR!!!!!!");
    });
};

// HTTP GET - comment Index
exports.comment_index_get = (req, res) => {
    Comment.find().populate('author')
    .then(comments => {
        res.render("comment/index", {comments: comments, moment}) // moment : moment
    })
    .catch(err => {
        console.log(err);
    });
};

// HTTP DELETE - comment
exports.comment_delete_get = (req, res) => {
    console.log(req.query.id);
    Comment.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect("/comment/index")
    })
    .catch(err => {
        console.log(err);
    })
}
