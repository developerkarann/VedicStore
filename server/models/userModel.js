const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userScehma = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        maxLength: [30, 'Name cannot exceed 30 character'],
        minLength: [4, 'Name should have more than 4 character'],
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
        minLength: [8, 'Password should have 8 character'],
        select: false,
    },
    avtar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userScehma.pre('save', async function (next) {

    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})


// JWT TOKEN

userScehma.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

//Compare Password

userScehma.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Generating Password Reset Token

userScehma.methods.getResetPasswordToken = function () {

    //Genetrating Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hashing and adding to user schema

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('User', userScehma)
