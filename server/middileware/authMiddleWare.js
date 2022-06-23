const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

exports.protect = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization
    //console.log(token);
    if (!token) {
        return res.status(500).json({ message: 'You are not logged in' })
    }
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
    if (!decoded) {
        return res.status(500).json({ message: 'Authentication error' })
    }
    const currentUser = await User.findById(decoded.id)
    req.user = currentUser
    next()
})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(500).json({ message: "You are not allowed to access this" })
        }
        next()
    }
}