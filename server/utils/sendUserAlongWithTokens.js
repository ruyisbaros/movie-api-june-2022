
exports.sendUserAlongWithTokens = (user, statusCode, res) => {
    const accessToken = user.createJwtToken()
    const refreshToken = user.createReFreshToken()

    //console.log(refreshToken);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/v1/auth/refresh_token",
        maxAge: 14 * 24 * 60 * 60 * 1000  //14 days

    })

    //const fulledUser = await User.findById(user._id)/* .populate("followers followings ", "-password") */

    res.status(statusCode).json({ accessToken, user })
}