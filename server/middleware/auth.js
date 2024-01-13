const ErrorHandler = require('../utils/errorHandler');
const CatchAsyncError = require('./CatchAsyncError')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


exports.isAuthenticatedUser = CatchAsyncError(async (req, res, next) => {

    const { token } = req.cookies;
    // console.log(token)
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTk3MGY2ZGFlMjIxMmUyNjY1NjIyNSIsImlhdCI6MTcwNDkwMjE0MSwiZXhwIjoxNzA1MzM0MTQxfQ.9XOHcagwoxboj4f6i6kU4CPn6oldoIAjUs83VAc-WFA'
    if (!token) {
        return next(new ErrorHandler('Please login to access this resource', 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_KEY);

    const data = await User.findById(decodedData.id);
    // console.log(data)
    req.user = data

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