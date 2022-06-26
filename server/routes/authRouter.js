const router = require('express').Router()
const { register, login, emailVerification, resendVerificationMail, forgotPassword, resetPassword } = require('../controllers/authController')
const { check } = require('express-validator')

/* Login | Register */
router.post('/register', register)
router.post('/login', login)
/* Verify Register */
router.get('/email_confirm/:otp', emailVerification)
router.post('/resend_verify/:id', resendVerificationMail)
/* Password Operations*/
router.post('/forgot_password', forgotPassword)
router.post('/password_reset/:passwordToken', resetPassword)

module.exports = router