const Store = require('../voteStore')

describe('Constructor', () => {
    test('Ensure constructor returns instance', async (done) => {
        const voteStore = new Store()
        voteStore.store(123456, 1)
        voteStore.store(123457, 1)
        voteStore.store(123458, 1)
        expect(voteStore.keys).toBeDefined()
        done()
    })
})

describe('Populate and store', () => {
    test('Ensure population is successful and storage is possible', async (done) => {
        const voteStore = new Store()
        voteStore.populate()
        expect(voteStore.keys[0]).toBeDefined()
        voteStore.store(123456, 1)
        expect(voteStore.get(123456).vote).toBe(1)
        done()
    })
})