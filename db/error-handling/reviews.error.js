const app = require("../app")

exports.reviewNotFound = (err, request, response, next) => {
    if(!err.code){
        return response.status(404).send({msg: "404: not found. Review does not exist."})
    }
    else next(err)
}

exports.badReviewRequest = (err, request, response, next) => {
    if(err.code === "22P02"){
        return response.status(400).send({msg: "400: bad request. Invalid Format. Request must be an integer."})
    }
}