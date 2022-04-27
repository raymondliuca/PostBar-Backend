// Dependencies
const express = require("express");
var methodOverride = require('method-override');
const isLoggedIn = require('../helper/isLoggedIn');

const router = express.Router();

router.use(methodOverride('_method'))

router.use(express.urlencoded({extended: true}));

// Import comment Controller
const commentCntrl = require("../controllers/comment");

// Routes
router.get("/comment/add", isLoggedIn, commentCntrl.comment_create_get);
router.post("/comment/add", commentCntrl.comment_create_post);
router.get("/comment/index", commentCntrl.comment_index_get);
router.get("/comment/delete", commentCntrl.comment_delete_get);

// Export router
module.exports = router;