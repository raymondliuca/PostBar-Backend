// Middleware for user to check

// module.exports = (req, res, next) => {
//     if(!req.user)
//     {
//         res.redirect('/auth/signin')
//     }
//     else {
//         next();
//     }
// }

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    // token from header
    // const token = req.header("x-auth-token")
    // console.log(token)

    // Token from authorization header
    console.log(req.header)
    console.log(process.env.secret)
    var authorizationToken = req.header("Authorization")
    authorizationToken = authorizationToken.replace("Bearer ", "")
    console.log(authorizationToken);
    const token = authorizationToken 

    if (!token){
        return res.json({
            "message": "Aha!! You are not allowed to view this page!!!"
        }).status(401)
    }

    try {
        const decoded = jwt.verify(token, process.env.secret);
        req.user = decoded.user;
        next();
    }
    catch(error) {
        return res.json({
            "message": "Your Token is Invalid!!!"
        });
    }
}