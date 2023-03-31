const db = require("../connection");
const categories = require("../data/test-data/categories");
const reviews = require("../data/test-data/reviews");

exports.fetchReview = (requestQuery) => {
    return db.query('SELECT owner, title, reviews.review_id, review_body, category, review_img_url, reviews.created_at, reviews.votes, designer, owner, CAST(COUNT(comments.review_id) AS INT) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE reviews.review_id = $1 GROUP BY reviews.review_id;', [requestQuery])
    .then((review) => {
        if(review.rows.length === 0){
            return Promise.reject({status: "404", msg: "Not found."})
        }
        return {review: review.rows[0]};
    })
}

exports.fetchAllReviews = (requestQuery) => {
    
    return db.query('SELECT slug FROM categories;')

    .then((categories) => {

        const returnedCategories = categories.rows.map((category) => {
            return category.slug
        })
        
        const categoryArray = []
        let order = "desc"
        let sortBy = "created_at"

        let queryString = `SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id`

        if(requestQuery.order){
            if(!["asc", "desc"].includes(requestQuery.order)){
                return Promise.reject({status: "400", msg: "Bad request."})
            }
            order = requestQuery.order
        }

        if(requestQuery.sort_by){
            if(!["owner", "title", "review_id", "category", "review_img_url", "created_at", "votes", "designer", "review_id"].includes(requestQuery.sort_by)){
                return Promise.reject({status: "400", msg: "Bad request."})
            }
            sortBy = requestQuery.sort_by
        }

        if(requestQuery.category){

            if(!returnedCategories.includes(requestQuery.category)){
                return Promise.reject({status: "404", msg: "Not found."})
            }
            queryString += ` WHERE reviews.category = $1`
            categoryArray.push(requestQuery.category)
        }

        queryString += ` GROUP BY reviews.review_id ORDER BY ${sortBy} ${order};`
        
        return db.query(queryString, categoryArray) 
    })
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

exports.fetchComments = (reviewIdentifier) => {
    return db.query('SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.review_id FROM comments WHERE review_id = $1 ORDER BY comments.created_at DESC;', [reviewIdentifier])
    .then((comments) => {
        return comments.rows
    })
}

exports.postComment = (reviewIdentifier, commentToBePosted) => {
    return db.query('INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING *;', [commentToBePosted.username, commentToBePosted.body, reviewIdentifier])
    .then((comment) => {
        return comment.rows;
    })
}

exports.patchVotes = (reviewIdentifier, votes) => {
    return db.query('UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;', [votes, reviewIdentifier])
    .then((returnedReview) => {
        return returnedReview.rows
    })
}