const mongoose = require("mongoose");
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const validator = require('validator')
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 30,
        minLength: 4
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        maxLength: 30,

    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        maxLength: 30,
        validate: [validator.isEmail, "Please insert a valid email address"]
    },
    password: {
        type: String,
        required: true,
        maxLength: 1024,
        minLength: 4
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: Object,
        default: {
            url: "https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-avatar-icon-png-image_695765.jpg",
            public_id: String
        }
    },
    role: {
        type: String,
        enum: ["admin", "co-host", "user"],
        default: "user"
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "male"
    },
    mobile: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    story: {
        type: String,
        default: "Ahmet Erdonmez FullStack web developer @2022. JavaScript, CSS, SASS, React, React-Hooks, ContextApi, Redux, Next js, Python, Java etc.",
        maxLength: 200
    },

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    /* isOnline: {
        type: Boolean,
        default: false
    }, */
    resetPasswordToken: String,
    resetPasswordTime: Date,
    emailVerificationToken: String,
    emailVerificationTime: Date,
    emailOTP: String,
    passwordOTP: String


}, { timestamps: true })

UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isPasswordTrue = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

//Create access token
UserSchema.methods.createJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "14d"
    })
}

//Create refresh token
UserSchema.methods.createReFreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: "15d"
    })
}

//Forgot password
UserSchema.methods.createPasswordResetToken = function () {
    //generate crypto token
    const resetToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    //console.log({ resetToken }, this.resetPasswordToken);
    this.resetPasswordTime = Date.now() + 60 * 60 * 1000 //60 minutes

    return resetToken
}

//Email Verification
UserSchema.methods.createEmailVerificationToken = function () {
    //generate crypto token
    const resetToken = crypto.randomBytes(20).toString("hex")
    this.emailVerificationToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    //console.log({ resetToken }, "before click in model", this.emailVerificationToken);
    this.emailVerificationTime = Date.now() + 60 * 60 * 1000 //60 minutes

    return resetToken
}

UserSchema.methods.createEmailOtp = function () {
    let code = ""
    for (let i = 0; i < 5; i++) {
        code += Math.round(Math.random() * 9)
    }
    this.emailOTP = code

    return code
}
UserSchema.methods.createPasswordOtp = function () {
    let code = ""
    for (let i = 0; i < 5; i++) {
        code += Math.round(Math.random() * 9)
    }
    this.passwordOTP = code

    return code
}

const User = mongoose.model("User", UserSchema);

module.exports = User;