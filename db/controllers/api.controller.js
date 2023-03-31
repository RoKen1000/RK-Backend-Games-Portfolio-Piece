const app = require("../app")
const apiJson = require("../../endpoints.json")

exports.selectJson = (request, response) => {
        response.status(200).send(apiJson)
    }