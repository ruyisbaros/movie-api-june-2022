const router = require('express').Router()
const { register, login, emailVerification, resendVerificationMail } = require('../controllers/authController')
const { check } = require('express-validator')


router.post('/register', register)
router.post('/login', login)
router.get('/email_confirm/:token', emailVerification)
router.post('/resend_verify/:id', resendVerificationMail)

module.exports = router