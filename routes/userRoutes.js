const express = require('express')
const router = express.Router()
const usersControllers = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJwt')

router.use(verifyJWT)

router.route('/')
    .get(usersControllers.getAllUsers)
    .patch(usersControllers.updateUser)
    .delete(usersControllers.delteUser)

router.route('/id/:userId')
    .get(usersControllers.getUserByid)

module.exports = router;