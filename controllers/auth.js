// API's for Authentication

const User = require("../models/User");
const bcrypt = require('bcrypt');
let passport = require("../helper/ppConfig");
const salt = 10;
const moment = require("moment");
const {validationResult} = require('express-validator');
const jwt = require("jsonwebtoken")

// HTTP GET - signup - to load the signup form


exports.auth_signup_get = (req, res) => {   
    res.render("auth/signup");
}

// HTTP POST - signup - to post the data

exports.auth_signup_post = (req, res) => {
    console.log(req.body);

    let user = new User(req.body);

    let hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash);

    user.password = hash;

    //Save User
    user.save()
    .then(() => {
        // res.redirect("/auth/signin");
        res.json({user, "message": "User Created Successfully!!!"})
    })
    .catch((err) => {

        if (err.code == 11000) {
            // req.flash("error", " Email already exists")
            // res.redirect('/auth/signin')
            res.json({"message": "Email Already Exists"})
        }
        else {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                // res.stautus(400).json(errors: errors.array);
                // req.flash("validationErrors", errors.errors);
                // res.redirect('/auth/signup')
                res.json({"message": "Validation Errors", "ValidationErrors": errors, errors})
            }
            res.json({"message": "Error Creating User. Please try again later."})
        }

        // console.log(err);
        // res.send("ERRRRORRRR!!!!!!");
    });
}
// HTTP GET -signin - to load the signin form

exports.auth_signin_get = (req, res) => {
    res.render("auth/signin");
}

// HTTP POST -signin - to post the data

// exports.auth_signin_post = 
//     passport.authenticate("local", {
//         successRedirect: "/",
//         failureRedirect: "/auth/signin",
//         failureFlash: "Invalid username or password",
//         successFlash: "You logged in successfully."
// })

exports.auth_signin_post = async (req, res) => {
    let { emailAddress, password} = req.body

    try{
        let user = await User.findOne({emailAddress})
        console.log(user)

        if(!user)
        {
            return res.json({"message": "User Not Found!!!"}).status(400)
        }
        const isMatch = await bcrypt.compareSync(password, user.password)

        if(!isMatch)
        {
            return res.json({"message": "Password Not Match!!!"}).status(400)
        }

        const payload = {
            user: {
                is: user._id,
                name: user.firstName
            }
        };
        jwt.sign(
            payload,
            process.env.secret,
            {expiresIn: 3600000},
            (err, token) => {
                if(err) throw err;
                res.json({ token }).status(200);
            }
        )
    }
    catch (error) {
        res.json({"message": "You are not logged in!"}).status(400)
    }
}

// HTTP GET -logout - to logout the user

exports.auth_logout_get = (req, res) => {
    // This will clear the session
    req.logout();
    req.flash("success", "You are successfully logged out.")
    res.redirect('/auth/signin');
}