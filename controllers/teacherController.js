const Teacher = require('../models/Teacher')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')



const getAllTeachers = asyncHandler(async (req, res) => {
    const teachers = Teacher.find().select("-password").lean()
    if(!teachers?.length){
        return res.status(400).json({message:'No teachers found'})
    }
    res.json(teachers)

})

const getTeacherById = asyncHandler(async(req,res) => {
    const {teacher_id} = req.params
    const teacher = await Teacher.findById(teacher_id).lean().exec()

    if(!teacher) return res.status(400).json({message:'No teacher found'})
    res.json(teacher)
})


module.exports = {
    getAllTeachers,
    getTeacherById,
}