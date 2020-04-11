const Store = require("../sensorStore")

describe('Constructor', () => {
    test('Ensure constructor returns instance', async (done) => {
        const sensorStore = new Store()
        expect(sensorStore.defaultValue).toBeNull()
        expect(sensorStore.keys).toBeDefined()
        done()
    })
})

describe('Populate and store', () => {
    test("Ensure the populate mocking code runs and populates", async (done) => {
        const sensorStore = new Store()
        sensorStore.populate()
        expect(sensorStore.keys[0]).toStrictEqual({
            "id": 12345678,
            "area": "2D008",
            "temperature": 21,
            "time": "33:25:19T29:2:2020"
        })
        sensorStore.store(12345678, "", 22, "33:25:19T29:2:2021")
        expect(sensorStore.get(12345678).temperature).toBe(22)
        done()
    })
})

describe('Get all sensor data', () => {
    test("Ensure the data received corresponds to the data posted previously", async (done) => {
        const sensorStore = new Store()

        sensorStore.populate()
        sensorStore.store({
            "id": 3,
            "area": "2D042",
            "temperature": 21.3,
            "time": "12:06:21T18:3:2020"
        })
        sensorStore.store({
            "id": 83,
            "area": "2D041",
            "temperature": 20.9,
            "time": "12:06:40T18:3:2020"
        })
        sensorStore.store({
            "id": 36,
            "area": "2D040",
            "temperature": 20.8,
            "time": "12:06:56T18:3:2020"
        })

        expect(JSON.stringify(sensorStore.keys) == JSON.stringify({
            "sensors": [
                {
                    "id": 3,
                    "area": "2D042",
                    "temperature": 21.3,
                    "time": "12:06:21T18:3:2020"
                },
                {
                    "id": 83,
                    "area": "2D041",
                    "temperature": 20.9,
                    "time": "12:06:40T18:3:2020"
                },
                {
                    "id": 36,
                    "area": "2D040",
                    "temperature": 20.8,
                    "time": "12:06:56T18:3:2020"
                }
            ]
        }))
        done()
    })
})