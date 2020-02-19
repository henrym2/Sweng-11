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

describe('Submission test', () => {
  test('Should get a 200 success response', async (done) => {
    const user = {
      submitter: "John",
      opinion: -1
    }
    const res = await request(app)
      .post('/vote')
      .send(user)
      expect(res.statusCode).toEqual(200)
      done()
  })
})

afterAll(async () => {
	await app.close()
})
