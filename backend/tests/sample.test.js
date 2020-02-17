const request = require("supertest")
const app = require('../app')



describe('Example test', () => {
    test('Should get a { test: "test" } object', async (done) => {
      const res = await request(app)
        .get('/')
        expect(res.statusCode).toEqual(200)
        expect(res.body.test).toContain("test")
        done()
    });
})

afterAll(async () => {
	await app.close()
})
