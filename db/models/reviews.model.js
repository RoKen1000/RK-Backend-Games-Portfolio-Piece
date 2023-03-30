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


exports.fetchAllReviews = () => {
    return db.query('SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;')
    .then((reviews) => {
        return reviews.rows
    })
}

exports.checkReviewExists = async (reviewIdentifier) => {
        const dbOutput = await db.query('SELECT * FROM reviews WHERE review_id = $1;', [reviewIdentifier])

        if (dbOutput.rows.length === 0){
            return Promise.reject({status: "404", msg: "Not found."})
        }
    }

exports.fetchComments = async (reviewIdentifier) => {
    return db.query('SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.review_id FROM comments WHERE review_id = $1 ORDER BY comments.created_at DESC;', [reviewIdentifier])
    .then( async (comments) => {
        return comments.rows
    })
}

exports.postComment = async (reviewIdentifier, commentToBePosted) => {
    return db.query('INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING *;', [commentToBePosted.username, commentToBePosted.body, reviewIdentifier])
    .then((comment) => {
        return comment.rows;
    })
}