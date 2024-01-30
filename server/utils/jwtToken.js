
// Creating token and saving it into cookie
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // Options for coockie

    const option = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        // httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: "/",
    };


    res.status(statusCode).cookie('token', token, option).json({
        success: true,
        user,
        token
    });


}


// removing token from the cookie
const removeToken = (statusCode, res) => {
       const none = '';
    // Options for coockie

    const option = {
        expires: new Date(Date.now()),
        // httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: "/",
    };


    res.status(statusCode).cookie('token', none, option).json({
        success: true,
        message: "Logged Out",
    });


}



module.exports = { removeToken, sendToken };