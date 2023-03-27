const db = require("../connection")

exports.fetchReview = (requestQuery) => {
    return db.query('SELECT * FROM reviews WHERE review_id=$1;', [requestQuery])
    .then((review) => {
        return {review: review.rows[0]};
    })
}