const ErrorHandler = require('../utils/errorHandler');
const CatchAsyncError = require('./CatchAsyncError')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


exports.isAuthenticatedUser = CatchAsyncError(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Please login to access this resource', 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_KEY);

    req.user = await User.findById(decodedData.id);

    next()
})


// Authorize Roles

exports.authorizeRoles = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allow to access this resource`, 403))
        }

        next();
    };

};