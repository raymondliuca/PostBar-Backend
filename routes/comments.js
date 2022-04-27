// Dependencies
const express = require("express");
var methodOverride = require('method-override');
const isLoggedIn = require('../helper/isLoggedIn');

const router = express.Router();

router.use(methodOverride('_method'))

router.use(express.urlencoded({extended: true}));

// Import Article Controller
const articleCntrl = require("../controllers/article");

// Routes
router.get("/article/add", isLoggedIn, articleCntrl.article_create_get);
router.post("/article/add", articleCntrl.article_create_post);
router.get("/article/index", articleCntrl.article_index_get);
router.get("/article/detail", articleCntrl.article_show_get);
router.get("/article/delete", articleCntrl.article_delete_get);
router.get("/article/edit", articleCntrl.article_edit_get);
router.put("/article/update", articleCntrl.article_update_put);

// Export router
module.exports = router;