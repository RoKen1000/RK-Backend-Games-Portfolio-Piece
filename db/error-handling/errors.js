const app = require("../app")

exports.malformedEndpoint = (request, response, next) => {
    return response.status(404).send({status: "404", msg: "Not found."})
}

exports.notFound = (err, request, response, next) => {
    if(!err.code){
        return response.status(404).send({status: "404", msg: "Not found."})
    } else next(err);
}

exports.badRequest = (err, request, response, next) => {
    if(err.code === "22P02"){
        return response.status(400).send({status: "400", msg: "Bad request."})
    }
}