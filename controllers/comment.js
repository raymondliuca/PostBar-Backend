// API's for comment Module

// Include model
const {Comment} = require("../models/Comment");
const {Post} = require("../models/Post");
const moment = require("moment");



// HTTP POST - comment
exports.comment_create_post = (req, res) => {
    console.log(req.body)
    let comment = new Comment(req.body);
    comment.author = req.body.author.is
    comment.save()
    .then((post) => {
        Post.findById(req.body.post)
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

exports.comment_show_get = (req, res) => {
    console.log(req.query.id);

    Comment.findById(req.query.id).populate('author')
    .then(comment => {
        res.json({comment})
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
