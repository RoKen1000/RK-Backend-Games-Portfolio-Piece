const app = require("../app")
const {checkCommentExists, deleteComment} = require("../models/comments.model")

exports.removeComment = (request, response, next) => {
    const commentId = request.params.comment_id
    return Promise.all([checkCommentExists(commentId), deleteComment(commentId)])
    .then(() => {
        return response.status(204).send()
    })
    .catch((err) => {
        next(err)
    })
}