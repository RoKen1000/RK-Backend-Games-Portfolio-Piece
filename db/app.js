const express = require("express")
const {selectAllCategories} = require("./controllers/categories.controller")
const {notFound, badRequest, malformedEndpoint, internalServerError, cannotBeNull, invalidForeignKey} = require("./error-handling/errors")
const {selectReview, selectAllReviews, retrieveComments, sendComment, editReviewVotes} = require("./controllers/reviews.controller")
const {selectAllUsers} = require("./controllers/users.controller")
const {removeComment} = require("./controllers/comments.controller")
const {selectJson} = require("./controllers/api.controller")
const cors = require("cors")



const app = express();

app.use(cors())
app.use(express.json())

app.get("/api/categories", selectAllCategories);
app.get("/api/reviews/:review_id", selectReview);
app.get("/api/reviews", selectAllReviews);
app.get("/api/reviews/:review_id/comments", retrieveComments);
app.post("/api/reviews/:review_id/comments", sendComment);
app.patch("/api/reviews/:review_id", editReviewVotes);
app.get("/api/users", selectAllUsers)
app.delete("/api/comments/:comment_id", removeComment);
app.get("/api", selectJson)
app.all("/api/*", malformedEndpoint);

app.use(notFound);
app.use(badRequest);
app.use(cannotBeNull);
app.use(invalidForeignKey);
app.use(internalServerError);

module.exports = app;