const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

//REGISTER
exports.register = asyncHandler(async (req, res) => {
    const { fullName, username, password, email, gender } = req.body
    let transformedUserName = username.toLowerCase().replace(/ /g, "")

    const user_name = await User.findOne({ username: transformedUserName })
    if (user_name) {
        return res.status(401).json({ message: "This username is already in use." })
    }
    const user_email = await User.findOne({ email })
    if (user_email) {
        return res.status(401).json({ message: "This email is already in use." })
    }

    if (password.length < 4) {
        return res.status(401).json({ message: "Password must be at least 4 characters" })
    }

    const newUser = await User.create({
        fullName,
        username: transformedUserName,
        password,
        email,
        gender,

    })

    const accessToken = newUser.createJwtToken()
    const refreshToken = newUser.createReFreshToken()

    //console.log(refreshToken);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/v1/auth/refresh_token",
        maxAge: 14 * 24 * 60 * 60 * 1000  //14 days

    })

    const fulledUser = await User.findById(newUser._id)/* .populate("followers followings ", "-password") */

    res.status(201).json({ accessToken, fulledUser, message: "You Registered successfully" })
})

//LOGIN
exports.login = asyncHandler(async (req, res) => {

})