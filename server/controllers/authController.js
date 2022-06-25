const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const crypto = require("crypto")
//const bcrypt = require("bcrypt")
const { userAlertMails } = require('../mails/emailVerification')
const { sendUserAlongWithTokens } = require('../utils/sendUserAlongWithTokens')

//1.) EMAIL VERIFICATION THEN FINISH REGISTER
exports.emailVerification = asyncHandler(async (req, res) => {
    const { emailToken } = req.params
    if (!emailToken) { return res.status(403).json({ message: "Token is missing!" }) }

    const hashedResetToken = crypto.createHash("sha256").update(emailToken).digest("hex")
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
    user.emailOTP = undefined
    await user.save()

    sendUserAlongWithTokens(user, 201, res)

})

//2.) REGISTER TILL SEND VERIFY EMAIL
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
    /* const emailVerifyToken = newUser.createEmailVerificationToken()
    await newUser.save({ validateBeforeSave: false }) //if you don't save, verificationToken will not be saved in data

    //console.log(code, emailVerifyToken);
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/email_confirm/${emailVerifyToken}`
    const html = `Welcome to TurkishFoods webpage. Please confirm your email with clicking the link below: 
    ${resetPasswordUrl}\nIf you did not send this email, please ignore it` */
    //const emailVerifyToken = user.createEmailVerificationToken()
    const OTPCode = newUser.createEmailOtp()
    await newUser.save({ validateBeforeSave: false })

    /* const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/email_confirm/${emailVerifyToken}`
    const html = `Welcome to TurkishFoods webpage. Please confirm your email with clicking the link below: 
    ${resetPasswordUrl}\nIf you did not send this email, please ignore it` */
    const html = `
    <p>Your verification token:</p>
    <h1>${OTPCode}</h1>
    
    `

    await userAlertMails({
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

    //const emailVerifyToken = user.createEmailVerificationToken()
    const OTPCode = user.createEmailOtp
    await user.save({ validateBeforeSave: false })

    /* const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/email_confirm/${emailVerifyToken}`
    const html = `Welcome to TurkishFoods webpage. Please confirm your email with clicking the link below: 
    ${resetPasswordUrl}\nIf you did not send this email, please ignore it` */
    const html = `
    <p>Your verification token:</p>
    <h1>${OTPCode}</h1>
    
    `
    await userAlertMails({
        email: user.email,
        subject: "Email verification",
        html
    })

    res.status(200).json({ message: "Verification Mail has been sent your account. Please confirm" })


})

//4.) SEND FORGOT PASSWORD LINK AS EMAIL
exports.forgotPassword = asyncHandler(async (req, res, next) => {

    const { email } = req.body
    const user = await User.findOne({ email })
    //console.log(user);
    if (!user) {
        return next(new Error('No user found with this email'))
    }
    const resetToken = user.createPasswordResetToken()

    await user.save({ validateBeforeSave: false })

    //Send a Url to user's email address
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/password_reset/${resetToken}`
    const html = `Forgot your password? Submit a PATCH request with your new password and confirm password to: 
    ${resetPasswordUrl}\nIf you did not forget your password, please ignore this email`

    await userAlertMails({
        email: user.email,
        subject: "Changing password",
        html
    })
    res.status(200).json({ message: `Changing password confirmation mail sent to: ${user.email}` })
})

//5.) Along with mail change password
exports.resetPassword = asyncHandler(async (req, res, next) => {
    const { passwordToken } = req.params
    const { password } = req.body
    const hashedPasswordToken = crypto.createHash("sha256").update(passwordToken).digest("hex")
    const user = await User.findOne({   //If this turns a user means reset tokens are matching
        resetPasswordToken: hashedPasswordToken,
        resetPasswordTime: { $gt: Date.now() }
    }) //Reset token expired or not? Check it
    if (!user) {
        return res.status(403).json({ message: "invalid or expired token" })
    }
    /* const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt) */

    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordTime = undefined
    user.passwordOTP = undefined
    await user.save()

    sendUserAlongWithTokens(user, 201, res)
})

//6.) LOGIN
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(500).json({ message: "Missing information (email or password)" })
    }

    const user = await User.findOne({ email })
    if (!user) return res.status(500).json({ message: "No user could be found!" })

    const isMatch = await user.isPasswordTrue(password)
    if (!isMatch) return res.status(500).json({ message: "Wrong credentials" })

    sendUserAlongWithTokens(user, 201, res)
})