const app = require("../app")

exports.reviewNotFound = (err, request, response, next) => {
    return response.status(404).send({msg: "404: not found. Review does not exist."})
}