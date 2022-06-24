const router = require('express').Router()
const { register, login, emailVerification, resendVerificationMail, forgotPassword, resetPassword } = require('../controllers/authController')
const { check } = require('express-validator')


router.post('/register', register)
router.post('/login', login)
router.get('/email_confirm/:emailToken', emailVerification)
router.post('/resend_verify/:id', resendVerificationMail)
/* Password */
router.post('/forgot_password', forgotPassword)
router.post('/password_reset/:passwordToken', resetPassword)

module.exports = router