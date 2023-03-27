const express = require("express")
const {selectAllCategories} = require("./controllers/categories.controller")
const {notFound} = require("./error-handling/categories.error")
const {selectReview} = require("./controllers/reviews.controller")
const {reviewNotFound} = require("./error-handling/reviews.error")

const app = express();

app.use(express.json());

app.get("/api/categories", selectAllCategories);
app.get("/api/reviews/:review_id", selectReview)

app.use("/api/*", notFound);
app.use("/api/reviews/:review_id", reviewNotFound)

module.exports = app;