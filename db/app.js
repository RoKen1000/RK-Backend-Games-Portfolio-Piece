const express = require("express")
const {selectAllCategories} = require("./controllers/categories.controller")

const app = express();

app.use(express.json());

app.get("/api/categories", selectAllCategories);

module.exports = app