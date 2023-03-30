const app = require("../app")
const {fetchUsers} = require("../models/users.model")


exports.selectAllUsers = (request, response, next) => {
    fetchUsers()
    .then((retrievedUsers) => {
        return response.status(200).send({users: retrievedUsers})
    })
}