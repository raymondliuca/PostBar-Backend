// Dependencies
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const path = require('path');

// Port Configuration
const PORT = process.env.PORT;

// Initialize Express Application
const app = express();

app.use(express.urlencoded({extended: true}));

// Look for static files here (CSS, JS Images Video, Audio)
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

const expressLayouts = require("express-ejs-layouts");

// Look into views folder for a file named as layout.ejs
app.use(expressLayouts);

let session = require('express-session');
let passport = require("./helper/ppConfig");



app.use(session({
  secret: process.env.secret,
  saveUninitialized: true,
  resave: false,
  cookie: {maxAge: 360000}
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Share the information with all pages
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});


// Import Routes
const commentRoutes = require("./routes/comments");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");

// Mount Routes
app.use('/', commentRoutes);
app.use('/', postRoutes);
app.use('/', authRoutes);

// NodeJS to look in a folder called views for all ejs files.
app.set("view engine", "ejs");

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Connection with mongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
() => {
    console.log("mongodb connected successfully!");
});

app.listen(PORT, () => console.log(`App is running on ${PORT}`));


