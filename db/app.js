const express = require("express")
const {selectAllCategories} = require("./controllers/categories.controller")
const {notFound, badRequest, malformedEndpoint} = require("./error-handling/errors")
const {selectReview} = require("./controllers/reviews.controller")


const app = express();

app.use(express.json());

app.get("/api/categories", selectAllCategories);
app.get("/api/reviews/:review_id", selectReview)

app.use("/api/*", malformedEndpoint);
app.use("/api/reviews/:review_id", notFound)
app.use("/api/reviews/*", badRequest)

module.exports = app;