const express = require("express")
const {selectAllCategories} = require("./controllers/categories.controller")
const {notFound} = require("./error-handling/categories.error")

const app = express();

app.use(express.json());

app.get("/api/categories", selectAllCategories);

app.use("/api/*", notFound);

module.exports = app;