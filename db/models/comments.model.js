const db = require("../connection")

exports.checkCommentExists = async (commentIdentifier) => {
    const dbOutput = await db.query('SELECT * FROM comments WHERE comment_id = $1;', [commentIdentifier])
    
    if (dbOutput.rows.length === 0){
        return Promise.reject({status: "404", msg: "Not found."})
    }
}

exports.deleteComment = (commentIdentifier) => {
    return db.query('DELETE FROM comments WHERE comment_id = $1', [commentIdentifier])
}