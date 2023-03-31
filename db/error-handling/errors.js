const { response } = require("../app")
const app = require("../app")

exports.malformedEndpoint = (request, response, next) => {
    return response.status(404).send({status: "404", msg: "Not found."})
}

exports.notFound = (err, request, response, next) => {
    if(!err.code && err.status !== "400"){
        return response.status(404).send({status: "404", msg: "Not found."})
    } else next(err);
}

exports.badRequest = (err, request, response, next) => {
    if(err.code === "22P02" || err.status === "400"){
        return response.status(400).send({status: "400", msg: "Bad request."})
    }else next(err);
}

exports.cannotBeNull = (err, request, response, next) => {
    if(err.code === "23502"){
        return response.status(400).send({status: "400", msg: "Bad request."})
    }else next(err);
}

exports.invalidForeignKey = (err, request, response, next) => {
    if(err.code === "23503"){
        return response.status(404).send({status: "404", msg: "Not found."})
    }else next(err);
}

exports.internalServerError = (err, request, response, next) => {
    console.log(err)
    return response.status(500).send({status: 500, msg: "Internal Server Error."})
}