const app = require("../app")
const {fetchReview, fetchAllReviews, fetchComments} = require("../models/reviews.model")

exports.selectReview = (request, response, next) => {
    const requestQuery = request.params.review_id;
    fetchReview(requestQuery)
    .then((review) => {
        return response.status(200).send(review)
    })
    .catch((err) => {
        next(err)
    })
}

exports.retrieveComments = (request, response, next) => {
    const reviewId = request.params.review_id
    fetchComments(reviewId)
    
}