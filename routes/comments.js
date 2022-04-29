// Dependencies
const express = require("express");
var methodOverride = require('method-override');
const isLoggedIn = require('../helper/isLoggedIn');

const router = express.Router();

router.use(methodOverride('_method'))
router.use(express.json())

// Import comment Controller
const commentCntrl = require("../controllers/comment");

// Routes

router.post("/comment/add", isLoggedIn, commentCntrl.comment_create_post);
router.get("/comment/detail", commentCntrl.comment_show_get);

// Export router
module.exports = router;