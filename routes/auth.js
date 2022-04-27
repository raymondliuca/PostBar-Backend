const router = require('express').Router();
const {body} = require('express-validator');


// Inport Authentication Controller
const authCntrl = require("../controllers/auth");
const { getMaxListeners } = require('../models/User');




// Routes for Authentication
router.get('/auth/signup', authCntrl.auth_signup_get);
router.post("/auth/signup", [
    body('firstName').isLength({min: 3}).withMessage("First Nmae must have more than 3 letters"),
    body('lastName').isLength({min: 3}),
    body('emailAddress').isEmail(),
    body('password').isLength({min: 5})
], authCntrl.auth_signup_post);

router.get("/auth/signin", authCntrl.auth_signin_get);
router.post("/auth/signin", authCntrl.auth_signin_post);

router.get('/auth/logout', authCntrl.auth_logout_get);


module.exports = router;