const app = require("../app")
const {fetchCategories} = require("../models/categories.model")

exports.selectAllCategories = (request, response, next) => {
    fetchCategories()
    .then((categories) => {
        return response.status(200).send(categories)
    })
    .catch((err) => {
        return err
    })
}