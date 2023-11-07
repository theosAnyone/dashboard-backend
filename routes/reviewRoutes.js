const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')

const verifyJwt = require('../middleware/verifyJwt')

router.use(verifyJwt)

router.route('/')
    .get(reviewController.getReviews)
    .post(reviewController.AddReview)

router.route('/id/:review_id')
    .get(reviewController.getReviewByID)

router.route('/user/:user_id')
    .get(reviewController.getUserReviews)

module.exports = router;