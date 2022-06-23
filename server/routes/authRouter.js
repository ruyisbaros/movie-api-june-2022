const router = require('express').Router()
const { register, login } = require('../controllers/authController')
const { check } = require('express-validator')


router.post('/register', register)
router.post('/login', login)

module.exports = router