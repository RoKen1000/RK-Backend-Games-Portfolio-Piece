const db = require("../connection")

exports.fetchReview = (requestQuery) => {
    return db.query('SELECT * FROM reviews WHERE review_id=$1;', [requestQuery])
    .then((review) => {
        if(review.rows.length === 0){
            return Promise.reject({status: "400", msg: "Bad request."})
        }
        return {review: review.rows[0]};
    })
}

// exports.fetchComments = (reviewIdentifier) => {
//     return db.query('SELECT * FROM comments JOIN reviews ON comments.review_id = review.review_id ORDER BY comments.created_at DESC;')
//     .then((comments) => {
//         return {comments: comments.rows}
//     })
// }