const express = require("express")
const {selectAllCategories} = require("./controllers/categories.controller")
const {notFound, badRequest, malformedEndpoint, internalServerError} = require("./error-handling/errors")
const {selectReview, selectAllReviews, retrieveComments, sendComment} = require("./controllers/reviews.controller")


const app = express();

app.use(express.json())

app.get("/api/categories", selectAllCategories);
app.get("/api/reviews/:review_id", selectReview);
app.get("/api/reviews", selectAllReviews);
app.get("/api/reviews/:review_id/comments", retrieveComments)

app.post("/api/reviews/:review_id/comments", sendComment)

app.all("/api/*", malformedEndpoint)

app.use(notFound);
app.use(badRequest);
app.use(internalServerError);

module.exports = app;