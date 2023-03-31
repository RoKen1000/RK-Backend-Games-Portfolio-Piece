const request = require('supertest')
const app = require('../db/app')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')
const connection = require('../db/connection')
const { response } = require('../db/app')

beforeEach(() => seed(testData));

describe("GET /api/categories", () => {
  it("200: Endpoint retrieves an array of all four objects in the categories table with each object having a slug and a description property", () => {
    return request(app)
    .get("/api/categories")
    .expect(200)
    .then((response) => {
        const retrievedCategoriesObject = response.body
        expect(retrievedCategoriesObject.categories.length).toBe(4);
        expect(retrievedCategoriesObject.categories).toBeInstanceOf(Array);
        retrievedCategoriesObject.categories.forEach((category) => {
            expect(category).toHaveProperty("slug"),
            expect(category).toHaveProperty("description")
        });
    })
  })
  it("404: When endpoint is mispelled, a 'not found' error is sent", () => {
    return request(app)
    .get("/api/*")
    .expect(404)
    .then((response) => {
        expect(response.body).toEqual({status: "404", msg: "Not found."})
    })
  })  
})

describe("GET /api/reviews/:review_id", () => {
    it("200: Endpoint can retrieve a review object based on the parameter sent to the endpoint and each object must have the following properties: review_id, title, review_body, designer, review_img_url, votes, category, owner, created_at", () => {
          return request(app)
          .get("/api/reviews/5")
          .expect(200)
          .then((response) => {
                const review = response.body
                expect(review.review).toBeInstanceOf(Object)
                expect(review.review).toHaveProperty("review_id")
                expect(review.review.review_id).toBe(5)
                expect(review.review).toHaveProperty("title")
                expect(review.review).toHaveProperty("review_body")
                expect(review.review).toHaveProperty("designer")
                expect(review.review).toHaveProperty("review_img_url")
                expect(review.review).toHaveProperty("votes")
                expect(review.review).toHaveProperty("category")
                expect(review.review).toHaveProperty("owner")
                expect(review.review).toHaveProperty("created_at")
        })
    })
    it("404: When given a parameter that does not exist in the table, a not found error message is returned", () => {
        return request(app)
        .get("/api/reviews/9999")
        .expect(404)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual({status: "404", msg: "Not found."})
        })
    })
    it("400: When given a parameter that is the wrong format a bad request error is sent", () => {
        return request(app)
        .get("/api/reviews/homer")
        .expect(400)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual(({status: "400", msg: "Bad request."}))
        })
    })
})

describe("GET /api/reviews", () => {
    it("200: Endpoint responds with an object with a review property which has an array of review objects as its value. Each value should have the required properties. The value for the comment_count property should reflect how many comments each review has. The review objects should be sorted in descending order.", () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((response) => {
            const retrievedReviewsObject = response.body
            expect(retrievedReviewsObject.reviews.length).toBe(13)
            retrievedReviewsObject.reviews.forEach((review) => {
                expect(review).toHaveProperty("owner")
                expect(review).toHaveProperty("title")
                expect(review).toHaveProperty("review_id")
                expect(review).toHaveProperty("category")
                expect(review).toHaveProperty("review_img_url")
                expect(review).toHaveProperty("created_at")
                expect(review).toHaveProperty("votes")
                expect(review).toHaveProperty("designer")
                expect(review).toHaveProperty("comment_count")
            })
            expect(retrievedReviewsObject.reviews).toBeSorted()
            expect(retrievedReviewsObject.reviews).toBeSortedBy("created_at", {descending: true, coerce: true})
        })
    })
})

describe("GET /api/reviews/:review_id/comments", () => {
    it("200: Endpoint responds with an array of comments for the given review with the required properties. The comments should be ordered descending starting from the most recent comment.", () => {
        return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then((response) => {
            const retrievedCommentsObject = response.body
            expect(retrievedCommentsObject.comments.length).toBe(3)
            const {comments} = retrievedCommentsObject
            comments.forEach((comment) => {
                expect(comment).toHaveProperty("comment_id")
                expect(comment).toHaveProperty("votes")
                expect(comment).toHaveProperty("created_at")
                expect(comment).toHaveProperty("author")
                expect(comment).toHaveProperty("body")
                expect(comment).toHaveProperty("review_id")
                expect(comment.review_id).toBe(2)
            })
            expect(retrievedCommentsObject.comments).toBeSorted()
            expect(retrievedCommentsObject.comments).toBeSortedBy("created_at", {descending: true, coerce: true})
        })
    })
    it("200: Endpoint responds with an empty array if no comments are found for the review", () => {
        return request(app)
        .get("/api/reviews/10/comments")
        .expect(200)
        .then((response) => {
            const retrievedCommentsObject = response.body
            expect(retrievedCommentsObject.comments.length).toBe(0)
        })
    })
    it("404: Returns not found if review does not exist", () => {
        return request(app)
        .get("/api/reviews/9999/comments")
        .expect(404)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual({status: "404", msg: "Not found."})
        })
    })
    it("400: Returns a bad request error if an invalidly formatted request is sent", () => {
        return request(app)
        .get("/api/reviews/homer/comments")
        .expect(400)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual({status: "400", msg: "Bad request."})
        })
    })
})

describe("POST /api/reviews/:review_id/comments", () => {
    it("201: The endpoint can accept an object to post a comment to the system which is returned back to the client on success", () => {
        const newComment = {username: "bainesface", body: "I am a comment to fulfill the post request."}
        return request(app)
        .post("/api/reviews/10/comments")
        .send(newComment)
        .expect(201)
        .then((response) => {
            const returnedComment = response.body.comment
            expect(returnedComment).toHaveProperty("comment_id")
            expect(returnedComment).toHaveProperty("body")
            expect(returnedComment.body).toBe(newComment.body)
            expect(returnedComment).toHaveProperty("review_id")
            expect(returnedComment.review_id).toBe(10)
            expect(returnedComment).toHaveProperty("votes")
            expect(returnedComment).toHaveProperty("created_at")
            expect(returnedComment).toHaveProperty("author")
            expect(returnedComment.author).toBe(newComment.username)
        })
    })
    it("201: when passed an object that has additional unnecessary properties, the sytem ignores it when creating the comment", () => {
        const newComment = {username: "bainesface", body: "I am a comment to fulfill the post request.", propertyToBeIgnored: "unnessary info"}
        return request(app)
        .post("/api/reviews/10/comments")
        .send(newComment)
        .expect(201)
        .then((response) => {
            const returnedComment = response.body.comment
            expect(returnedComment).not.toHaveProperty("propertyToBeIgnored")
        })
    })
    it("404: Endpoint returns not found when a user tries to post a comment on a review that does not exist", () => {
        const newComment = {username: "bainesface", body: "I am a comment to fulfill the post request."}
        return request(app)
        .post("/api/reviews/9999/comments")
        .send(newComment)
        .expect(404)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual({status: "404", msg: "Not found."})
        })
    })
    it("400: When a comment is passed to an invalid path, a bad request error is returned", () => {
        const newComment = {username: "bainesface", body: "I am a comment to fulfill the post request."}
        return request(app)
        .post("/api/reviews/not-an-id/comments")
        .send(newComment)
        .expect(400)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual({status: "400", msg: "Bad request."})
        })
    })
    it("400: When passed a comment object that is missing a required property, a bad request error is returned", () => {
        const newComment = {username: "bainesface"}
        return request(app)
        .post("/api/reviews/10/comments")
        .send(newComment)
        .expect(400)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual({status: "400", msg: "Bad request."})
        })
    })
    it("404: When a comment is attempted to be posted by an invalid username, a bad request error is sent", () => {
        const newComment = {username: "homer", body: "I am a comment to fulfill the post request."}
        return request(app)
        .post("/api/reviews/10/comments")
        .send(newComment)
        .expect(404)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual({status: "404", msg: "Not found."})
        })
    })
})

describe("PATCH /api/reviews/:review_id", () => {
    it("200: Path accepts a vote increment object and responds with the updated review containing the updated vote count", () => {
        const newVoteObject = {inc_votes: 1}
        return request(app)
        .patch("/api/reviews/1")
        .send(newVoteObject)
        .expect(200)
        .then((response) => {
            const returnedReview = response.body.updatedReview
            expect(returnedReview).toHaveProperty("review_id")
            expect(returnedReview).toHaveProperty("title")
            expect(returnedReview).toHaveProperty("category")
            expect(returnedReview).toHaveProperty("designer")
            expect(returnedReview).toHaveProperty("owner")
            expect(returnedReview).toHaveProperty("review_body")
            expect(returnedReview).toHaveProperty("review_img_url")
            expect(returnedReview).toHaveProperty("created_at")
            expect(returnedReview).toHaveProperty("votes")
            expect(returnedReview.votes).toBe(2)
        })
    })
    it("200: Endpoint can be passed an object with unnecessary additional properties and can ignore them when updating the review", () => {
        const newVoteObject = {propertyToBeIgnored: 500, inc_votes: 1}
        return request(app)
        .patch("/api/reviews/1")
        .send(newVoteObject)
        .expect(200)
        .then((response) => {
            const returnedReview = response.body.updatedReview
            expect(returnedReview).not.toHaveProperty("propertyToBeIgnored")
            expect(returnedReview.votes).toBe(2)
            expect(returnedReview.votes).not.toBe(501)
        })
    })
    it("404: Endpoint returns not found when a user tries to vote on a review that does not exist", () => {
        const newVoteObject = {propertyToBeIgnored: 500, inc_votes: 1}
        return request(app)
        .patch("/api/reviews/9999")
        .send(newVoteObject)
        .expect(404)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual({status: "404", msg: "Not found."})
        })
    })
    it("400: voteObject sent must contain an inc_votes property otherwise a bad request error is sent", () => {
        const newVoteObject = {propertyToBeIgnored: 500}
        return request(app)
        .patch("/api/reviews/1")
        .send(newVoteObject)
        .expect(400)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual({status: "400", msg: "Bad request."})
        })
    })
    it("400: the inc_votes property value must be a number otherwise a bad request error is sent", () => {
        const newVoteObject = {inc_votes: "homer"}
        return request(app)
        .patch("/api/reviews/1")
        .send(newVoteObject)
        .expect(400)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual({status: "400", msg: "Bad request."})
        })
    })
    it("400: Endpoint returns a bad request error if votes are attempted to be incremented on an invalidly formatted endpoint", () => {
        const newVoteObject = {inc_votes: 2}
        return request(app)
        .patch("/api/reviews/homer")
        .send(newVoteObject)
        .expect(400)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual({status: "400", msg: "Bad request."})
        })
    })
})

describe("DELETE /api/comments/:comment_id", () => {
    it("204: Endpoint can delete a comment when passed the comment's comment_id", () => {
        return request(app)
        .delete("/api/comments/1")
        .expect(204)
    })
    it("404: Endpoint returns a not found error if the comment_id does not exist", () => {
        return request(app)
        .delete("/api/comments/9999")
        .expect(404)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual({status: "404", msg: "Not found."})
        })
    })
    it("400: Endpoint returns bad request when sent a comment_id that is invalidly formatted", () => {
        return request(app)
        .delete("/api/comments/bainesface")
        .expect(400)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual({status: "400", msg: "Bad request."})
        })
    })
})

describe("GET /api/users", () => {
    it("200: Endpoint responds with an array of objects of all users with the required properties", () => {
        return request(app)
        .get("/api/users")
        .expect(200)
        .then((response) => {
            const returnedUsers = response.body.users 
            expect(returnedUsers.length).toBe(4)
            returnedUsers.forEach((user) => {
                expect(user).toHaveProperty("username")
                expect(user).toHaveProperty("name")
                expect(user).toHaveProperty("avatar_url")
              }) 
         })
    })
})
afterAll(() => connection.end())