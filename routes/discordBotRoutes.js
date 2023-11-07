const express = require('express')
const router = express.Router()
const discordBotController = require('../controllers/discordBotController')

const verifyJwt = require('../middleware/verifyJwt')

router.use(verifyJwt)

router.route('/')
    .post(discordBotController.PostReview)

module.exports = router;