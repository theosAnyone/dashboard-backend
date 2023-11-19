const Teacher = require('../models/Teacher')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { default: mongoose } = require('mongoose')



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

const updateTeacher = asyncHandler(async(req,res) => {

    const {teacher_id, first_name, last_name, anyone_profile } = req.body


    if(!teacher_id || !first_name || !last_name ) return res.status(400).json({message:'all fields are required'})
    const teacher = await Teacher.findById(teacher_id).exec()
    if(!teacher) return res.status(400).json({message:"no teacher found"});
    teacher.first_name = first_name;
    teacher.last_name = last_name;
    teacher.anyone_profile = anyone_profile;
    const updated_teacher = await teacher.save()

    if(!updated_teacher) return res.status(304).json({message:"error teacher not updated"})
    res.json(updated_teacher)
})

const addTeacherReview = asyncHandler(async(req,res) => {
    const {teacher_id, review_id} = req.body;

    if(!teacher_id || !review_id) return res.status(400).json({message:'missing fields'})

    const teacher = await Teacher.findById(teacher_id).exec()

    if(!teacher) return res.status(400).json({message:'no teacher found'})

    if(!mongoose.Types.ObjectId.isValid(review_id)) return res.status(400).json({message:`Not valid ObjectId ${review_id}`})

    const object_review = new mongoose.Types.ObjectId(review_id)

    teacher.reviews.push(object_review)

    const updated_teacher = await teacher.save()

    if(!updated_teacher) return res.status(500).json({message:"error updating teacher"})

    res.json(updated_teacher);
})

module.exports = {
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    addTeacherReview,
}