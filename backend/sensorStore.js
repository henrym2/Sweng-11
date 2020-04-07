// Similar to voteStore
//const server = require('/server')
const fs = require('fs');
const { Sensor, Entry } = require("./db/schemas")

class sensorStore {
    constructor() {
        Sensor.find({}).exec((err, res ) => this.sensors = res)
        Entry.find({}).exec((err, res) => this.entries = res)
        Sensor.find({}).populate("entries").exec((err, res) => this.references = res)
    }

    async updateSensors() {
        this.sensors = await Sensor.find({})
    }

    async updateEntries() {
        this.entries = await Entry.find({})
    }

    async updateReferences() {
        this.references = await Sensor.find({}).populate("entries")
    }

    async store(id, area, temperature, time) {
        let sensor = await this.get(id)
        if (sensor == undefined) {
            console.log("Sensor not found")
            sensor = await Sensor.create({
                id: id,
                location: area,
                temperature: temperature
            })
            console.log("Registered sensor")
            
        } 
        let e = await Entry.create({
            temperature: temperature,
            time: time,
            area: area
        })
        
        sensor.entries.push(e._id)
        await sensor.save()
        await this.updateSensors()
        return true
    }

    async get(id) {
        let sensor = this.sensors.find(k => k.id == id)
        if (sensor == undefined) {
            return await Sensor.findOne({id: id}).populate("entries") 
        }
        return sensor
    }

    async getSensors() {
        await this.updateSensors()
        return this.sensors
    }

    async getAll() {
        await this.updateReferences()
        return this.references
    }

    async getEntries() {
        await this.updateEntries()
        return this.entries
    }


    async getByLocation(location) {
        let sensor = this.sensors.find(k => k.location == location) 
        if (sensor == undefined) {
            return await Sensor.find({location: location})
        }
        return sensor
        
    }

    async getLocationHistory(location) {
        let hist = this.entries.filter(e => e.location == location)
        return hist
    }

    toString() {
        return this.keys.toString()
    }
}

module.exports = sensorStore