const app = require("../app")
const {fetchReview, fetchAllReviews, fetchComments, checkReviewExists, postComment} = require("../models/reviews.model")

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
        return response.status(200).send({reviews})
    })
}

exports.retrieveComments = (request, response, next) => {
    const reviewId = request.params.review_id
    return Promise.all([checkReviewExists(reviewId), fetchComments(reviewId)])
    .then((comments) => {
        const returnedComments = comments[1]
        return response.status(200).send({comments: returnedComments})
    })
    .catch((err) => {
        next(err)
    })
}

exports.sendComment = (request, response, next) => {
    const reviewId = request.params.review_id
    const comment = request.body
    return Promise.all([checkReviewExists(reviewId), postComment(reviewId, comment)])
    .then((returnedComment) => {
       
        const newComment = returnedComment[1][0]
        
        return response.status(201).send({comment: newComment})
    })
    .catch((err) => {
        next(err)
    })
}