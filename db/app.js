const express = require("express")
const {selectAllCategories} = require("./controllers/categories.controller")
const {notFound, badRequest, malformedEndpoint, internalServerError} = require("./error-handling/errors")
const {selectReview, selectAllReviews} = require("./controllers/reviews.controller")


const app = express();

app.get("/api/categories", selectAllCategories);
app.get("/api/reviews/:review_id", selectReview);
app.get("/api/reviews", selectAllReviews);
app.all("/api/*", malformedEndpoint)

app.use(notFound);
app.use(badRequest);
app.use(internalServerError);

module.exports = app;