const request = require('supertest')
const app = require('../db/app')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')
const connection = require('../db/connection')

beforeEach(() => seed(testData));

describe("GET /api/categories", () => {
  it("200: Endpoint retrieves an array of all four objects in the categories table each with a slug and a description property", () => {
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
})

afterAll(() => connection.end())