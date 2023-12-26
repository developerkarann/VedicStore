const ErrorHandler = require('../utils/errorHandler');
const CatchAsyncError = require('../middleware/CatchAsyncError');
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto');



// Register a user

exports.registerUser = CatchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
        avtar: {
            public_id: 'sample id',
            url: 'sample/url'
        }
    });


    sendToken(user, 201, res)
})

// Login User

exports.loginUser = CatchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // Checking ifuser has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please enter your details", 400))
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler('Invalid Credentials'), 401)
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid password', 401))
    }

    sendToken(user, 200, res)

})

//Logout user

exports.logout = CatchAsyncError(async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out",
    })
})


// Generating Reset Password token and sending email

exports.forgotPassword = CatchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    // Get Reset Password Token

    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not request this email then plaese ignore it`;

    try {

        await sendEmail({
            email: user.email,
            subject: 'Ultimate E-commerce Password Recovery',
            message,
        })
        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))

    }
})


// Reset Password Functionality

exports.resetPassword = CatchAsyncError(async (req, res, next) =>{

     // Creating token hash
     resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

     const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now() },
     })
     if (!user) {
        return next(new ErrorHandler('Reset Password Token is invalid or has been expired', 400));
    }

    if (req.body.password != req.body.confirmPassword) {
        return next(new ErrorHandler('Password Does not match', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save();

    sendToken(user,200,res)

})