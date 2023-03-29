const app = require("../app")
const {fetchReview, fetchAllReviews, fetchComments, checkReviewExists} = require("../models/reviews.model")

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

exports.selectAllReviews = (request, response, next) => {
    fetchAllReviews()
    .then((reviews) => {
        return response.set(200).send({reviews})
    })
}

exports.retrieveComments = (request, response, next) => {
    const reviewId = request.params.review_id
    
    fetchComments(reviewId)
    .then((comments) => {
        return response.set(200).send({comments})
    })
    .catch((err) => {
        next(err)
    })
}