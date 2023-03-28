const request = require('supertest')
const app = require('../db/app')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')
const connection = require('../db/connection')

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
    it.only("200: Endpoint responds with an object with a review property which has an array of review objects as its value. Each of the objects should have an owner, title, review_id, category, review_img_url, created_at, votes, designer and comment_count properties. The value for the comment_count property should reflect how many comments each review has. The review objects should be sorted in descending order.", () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((response) => {
            const retrievedReviewsObject = response.body
            expect(retrievedReviewsObject.reviews).toBeInstanceOf(Array)
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

afterAll(() => connection.end())