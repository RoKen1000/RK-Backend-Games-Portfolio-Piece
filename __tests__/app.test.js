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
        expect(response.body).toEqual({msg: "404: not found. Endpoint does not exist."})
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
        .get("/api/reviews/14")
        .expect(404)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual({msg: "404: not found. Review does not exist."})
        })
    })
    it("400: When given a parameter that is the wrong format a bad request error is sent", () => {
        return request(app)
        .get("/api/reviews/homer")
        .expect(400)
        .then((response) => {
            const errorMessage = response.body
            expect(errorMessage).toEqual(({msg: "400: bad request. Invalid Format. Request must be an integer."}))
        })
    })
})

afterAll(() => connection.end())