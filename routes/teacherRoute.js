const express = require('express')
const router = express.Router()
const teacherController = require('../controllers/teacherController')
const verifyJwt = require('../middleware/verifyJwt')

// router.use(verifyJwt)

router.route('/')
    .get(teacherController.getAllTeachers)
    .patch(teacherController.updateTeacher)


router.route('/id/:teacher_id') 
    .get(teacherController.getTeacherById)

module.exports = router;