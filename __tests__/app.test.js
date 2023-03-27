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
    .then(({body}) => {
        const categories = body.rows;
        expect(categories.length).toBe(4);
        expect(categories).toBeInstanceOf(Array);
        categories.forEach((category) => {
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

afterAll(() => connection.end())