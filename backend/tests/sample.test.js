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
  test('Testing submission routes handling', async (done) => {
    const user = {
      submitter: "John",
      opinion: -1
    }
    let res = await request(app)
      .post('/vote')
      .send(user)
    expect(res.statusCode).toEqual(200)
    console.log(res.body)

    const malformedUser = {
      test: "incorrect"
    }
    res = await request(app)
      .post('/vote')
      .send(malformedUser)
    expect(res.statusCode).toEqual(400)
    done()
  })
})

describe("Sensor test", () => {
  test("Testing sensor routes handling", async (done) => {
    const sensor = {
        "id": 12345678,
        "location": "B5",
        "temperature": 19.5,
        "time": "01:02:03T20:12:2020"
    }
    let res = await request(app)
      .post('/sensorSubmit')
      .send(sensor)
    expect(res.statusCode).toEqual(200)
    console.log(res.body)

    const malformedSensor = {
      "test": "incorrect"
    }

    res = await request(app)
      .post('/sensorSubmit')
      .send(malformedSensor)
    expect(res.statusCode).toEqual(400)
    done();
  })
})

afterAll(async () => {
	await app.close()
})
