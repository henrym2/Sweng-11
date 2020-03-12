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
            "location": "2D008",
            "temperature": 21,
            "time": "33:25:19T29:2:2020"
        })
        sensorStore.store(12345678, "", 22, "33:25:19T29:2:2021")
        expect(sensorStore.get(12345678).temperature).toBe(22)
        done()
    })
})