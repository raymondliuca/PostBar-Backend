
// API's

// HTTP GET - Index
exports.index_get = (req, res) => {
    res.render("home/index", {welcomeMessage: "Welcome to Post Bar"});
}
