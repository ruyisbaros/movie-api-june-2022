const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const crypto = require("crypto")
const { sendVerifyEmail } = require('../mails/emailVerification')

//1.) EMAIL VERIFICATION
exports.emailVerification = asyncHandler(async (req, res) => {
    const { token } = req.params
    if (!token) { return res.status(403).json({ message: "Token is missing!" }) }

    const hashedResetToken = crypto.createHash("sha256").update(token).digest("hex")
    //console.log("after click in mail", hashedResetToken);

    const user = await User.findOne({   //If this turns a user means reset tokens are matching
        emailVerificationToken: hashedResetToken,
        emailVerificationTime: { $gt: Date.now() }
    }) //Reset token expired or not? Check it
    //console.log(user);

    if (!user) {
        return res.status(403).json({ message: "Invalid or expired Token!" })
    }
    if (user.isVerified) { return res.status(403).json({ message: "User is already verified!" }) }

    user.isVerified = true;
    user.emailVerificationToken = undefined
    user.emailVerificationTime = undefined
    await user.save()

    const accessToken = user.createJwtToken()
    const refreshToken = user.createReFreshToken()

    //console.log(refreshToken);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/v1/auth/refresh_token",
        maxAge: 14 * 24 * 60 * 60 * 1000  //14 days

    })

    //const fulledUser = await User.findById(user._id)/* .populate("followers followings ", "-password") */

    res.status(201).json({ accessToken, user, message: "You Registered successfully" })

})

//2.) REGISTER
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
        gender
    })

    //----------VERIFY EMAIL -------
    /* let code = ""
    for (let i = 0; i < 5; i++) {
        code += Math.round(Math.random() * 9)
    } */
    const emailVerifyToken = newUser.createEmailVerificationToken()
    await newUser.save({ validateBeforeSave: false }) //if you don't save, verificationToken will not be saved in data

    //console.log(code, emailVerifyToken);
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/email_confirm/${emailVerifyToken}`
    const html = `Welcome to TurkishFoods webpage. Please confirm your email with clicking the link below: 
    ${resetPasswordUrl}\nIf you did not send this email, please ignore it`

    await sendVerifyEmail({
        email: newUser.email,
        subject: "Email verification",
        html
    })

    res.status(200).json({ message: "Verification Mail has been sent your account. Please confirm" })
})

//3.) The users who didn't verify their email
exports.resendVerificationMail = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) return res.status(403).json({ message: "User not found" })
    if (user.isVerified) { return res.status(403).json({ message: "User is already verified!" }) }

    const emailVerifyToken = user.createEmailVerificationToken()
    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/email_confirm/${emailVerifyToken}`
    const html = `Welcome to TurkishFoods webpage. Please confirm your email with clicking the link below: 
    ${resetPasswordUrl}\nIf you did not send this email, please ignore it`
    /* const html = `
    <p>Your verification token:</p>
    <h1>${emailVerifyToken}</h1>
    
    ` */
    await sendVerifyEmail({
        email: user.email,
        subject: "Email verification",
        html
    })

    res.status(200).json({ message: "Verification Mail has been sent your account. Please confirm" })


})



//4.) LOGIN
exports.login = asyncHandler(async (req, res) => {

})