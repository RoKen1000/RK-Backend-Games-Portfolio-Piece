const app = require("../app")

exports.notFound = (request, response, next) => {
    return response.status(404).send({msg: "404: not found. Endpoint does not exist."})
}