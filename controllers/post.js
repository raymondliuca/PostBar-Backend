// API's for Author Module

// Include model
const {Article} = require("../models/Article");
const {Author} = require("../models/Post");
const moment = require("moment");

// HTTP GET - Load an Add Author Form
exports.author_create_get = (req, res) => {
    res.render("author/add");
}

// HTTP POST - Author
exports.author_create_post = (req, res) => {
    console.log(req.body);

    let author = new Author(req.body);

    // Save Author
    author.save()
    .then((author) => {
        // res.redirect("/author/index");
        res.json({author})
    })
    .catch((err) => {
        console.log(err);
        res.send("ERRRRORRRR!!!!!!");
    });
};

// HTTP GET - Author Index
exports.author_index_get = (req, res) => {
    Author.find().populate('articles')
    .then(authors => {
        // res.render("author/index", {authors: authors, moment}) // moment : moment
        res.json({authors})  //authors: authors
    })
    .catch(err => {
        console.log(err);
    });
};

// HTTP GET - Author By ID
exports.author_show_get = (req, res) => {
    console.log(req.query.id);

    Author.findById(req.query.id).populate('articles')
    .then(author => {
        res.render("author/detail", {author, moment})
    })
    .catch(err => {
        console.log(err);
    });
};

// HTTP DELETE - Author
exports.author_delete_get = (req, res) => {
    console.log(req.query.id);
    Author.findByIdAndDelete(req.query.id)
    .then((author) => {
        // res.render("author/edit", {author})
        res.json({author})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP GET - Load Author Edit Form
exports.author_edit_get = (req, res) =>{
    Author.findById(req.query.id)
    .then((author) => {
        // res.render("author/edit", {author})
        res.json({author})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP PUT - Author Update
exports.author_update_put = (req, res) => {
    Author.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then((author) => {
        // res.redirect("/author/index");
        res.json({author})
    })
    .catch(err => {
        console.log(err);
    })
}

