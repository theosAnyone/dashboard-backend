const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimitter')



router.route('/')
    .post(loginLimiter, authController.login)

router.route('/signUp')
    .post(loginLimiter, authController.signUp)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

module.exports = router
