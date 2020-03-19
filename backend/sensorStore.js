// Similar to voteStore
//const server = require('/server')
const fs = require('fs');
const { Sensor, Entry } = require("./db/schemas")

class sensorStore {
    constructor() {
        Sensor.find({}).exec((err, res ) => this.keys = res)
    }

    async updateKeys() {
        this.keys = await Sensor.find({})
    }

    async store(id, area, temperature, time) {
        let sensor = await this.get(id)
        let e = await Entry.create({
            temperature: temperature,
            time: time,
            area: area
        })
        sensor.entries.push(e._id)
        await sensor.save()
        await this.updateKeys()
    }

    async get(id) {
        return await Sensor.findOne({id: id}).populate("entries") 
    }

    async getAll() {
        return this.keys || await Sensor.find({})
    }

    async getByLocation(location) {
        return this.keys.find(k => k.location == location) || await Sensor.find({location: location})
    }

    toString() {
        return this.keys.toString()
    }
}

module.exports = sensorStore