// Dependencies
const express = require("express");
var methodOverride = require('method-override');
const isLoggedIn = require('../helper/isLoggedIn');

const router = express.Router();

router.use(methodOverride('_method'))

router.use(express.json())

// Import Author Controller
const postCntrl = require("../controllers/author");

// Routes
router.get("/post/add", isLoggedIn, postCntrl.post_create_get);
router.post("/post/add", isLoggedIn, postCntrl.post_create_post);
router.get("/post/index", postCntrl.post_index_get);
router.get("/post/detail", postCntrl.post_show_get);
router.delete("/post/delete", isLoggedIn, postCntrl.post_delete_get);
router.get("/post/edit", isLoggedIn, postCntrl.post_edit_get);
router.put("/post/update", isLoggedIn, postCntrl.post_update_put);

// Export router
module.exports = router;