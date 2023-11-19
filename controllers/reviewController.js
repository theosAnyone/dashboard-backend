const { default: mongoose } = require('mongoose')
const Review = require('../models/Review')
const asyncHandler = require('express-async-handler')


const AddReview = asyncHandler(async (req,res) => {
    
    const {
        teacherId,
        userId,
        note,
        demos,
        tags,
        url
    } = req.body

    if(!teacherId || !userId || !note || !demos || !tags || !url) return res.status(400).json({message:'missing fields'})
    if(!mongoose.Types.ObjectId.isValid(teacherId) || !mongoose.Types.ObjectId.isValid(userId)) return res.status(500).json({message:`Not valid ObjectId ${review_id}`})
    const object_teacher = new mongoose.Types.ObjectId(teacherId)
    const object_user = new mongoose.Types.ObjectId(userId)
    const review = new Review({
        Teacher:object_teacher,
        User:object_user,
        note:note,
        demos,
        tags,
        url:url,
    })
    
    const saved_review = await review.save()

    return res.json(saved_review)


})  

 const getReviews = asyncHandler(async (req,res)=>{
    const reviews = await Review.find({}).lean().exec()
    if(!reviews?.length){
        return res.status(400).json({message:"No reviews found"})
    }
    res.json(reviews)

 })

 const getUserReviews = asyncHandler(async (req,res)=>{
    const {user_id} = req.params
    const reviews = await Review.find({User:user_id}).lean().exec()
    if(!reviews){
        return res.status(400).json({message:"No reviews found"})
    }
    res.json(reviews)
 })

 const getReviewByID = asyncHandler(async (req,res)=>{
    const {review_id} = req.params
    const review = await Review.findById(review_id).lean().exec()
    if(!review){
        return res.status(400).json({message:"No review found"})
    }
    res.json(review)
 })

module.exports = {
    AddReview,
    getReviews,
    getReviewByID,
    getUserReviews,
}