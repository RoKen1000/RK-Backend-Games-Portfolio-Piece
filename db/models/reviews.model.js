const db = require("../connection")

exports.fetchReview = (requestQuery) => {
    return db.query('SELECT * FROM reviews WHERE review_id=$1;', [requestQuery])
    .then((review) => {
        if(review.rows.length === 0){
            return Promise.reject({msg: "404: not found. Review does not exist."})
        }
        return {review: review.rows[0]};
    })
}