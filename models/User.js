// Denpendencies

const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema( {

    firstName: {
        type: String,
        require: true,
        minlength: [3, "First name must be more than 3 characters"],
        maxlength: [99, "This is too much man ... Chill!!!"]
    },
    lastName: {
        type: String,
        require: true,
        minlength: [3, "First name must be more than 3 characters"],
        maxlength: [99, "This is too much man ... Chill!!!"]
    },
    emailAddress: {
        type: String,
        require: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: [6, "Your password should be at least 6 characters"]

    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
},
{
    timestamps: true 
});



// verifyPassword
userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;