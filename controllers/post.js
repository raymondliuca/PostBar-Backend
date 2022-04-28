// API's for post Module

// Include model
const {Comment} = require("../models/Comment");
const {Post} = require("../models/Post");
const User = require("../models/User");
const moment = require("moment");

// HTTP GET - Load an Add post Form
exports.post_create_get = (req, res) => {
    res.render("post/add");
}

// HTTP POST - post
exports.post_create_post = (req, res) => {
    console.log(req.body);

    let post = new Post(req.body);
    console.log(req.user.is)
    post.author = req.user.is
    console.log(post)
    post.save()
    .then(() => {
        User.findById(post.author, (error, user) => {
            user.posts.push(post);
            user.save();
        });
    })
    .then(() => {
        res.json({post})
    })
    .catch((err) => {
        console.log(err);
        res.send("ERRRRORRRR!!!!!!");
    });
};

// HTTP GET - post Index
exports.post_index_get = (req, res) => {
    Post.find().populate('author')
    .then(posts => {
        // res.render("post/index", {posts: posts, moment}) // moment : moment
        res.json({posts})  //posts: posts
    })
    .catch(err => {
        console.log(err);
    });
};

// HTTP GET - post By ID
exports.post_show_get = (req, res) => {
    console.log(req.query.id);

    Post.findById(req.query.id).populate('comments')
    .then(post => {
        res.json({post})
    })
    .catch(err => {
        console.log(err);
    });
};

// HTTP DELETE - post
exports.post_delete_get = (req, res) => {
    console.log(req.query.id);
    Post.findByIdAndDelete(req.query.id)
    .then((post) => {
        // res.render("post/edit", {post})
        res.json({post})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP GET - Load post Edit Form
exports.post_edit_get = (req, res) =>{
    Post.findById(req.query.id)
    .then((post) => {
        // res.render("post/edit", {post})
        res.json({post})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP PUT - post Update
exports.post_update_put = (req, res) => {
    Post.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then((post) => {
        // res.redirect("/post/index");
        res.json({post})
    })
    .catch(err => {
        console.log(err);
    })
}

