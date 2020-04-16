// Similar to voteStore
//const server = require('/server')
const fs = require('fs');
const { Sensor, Entry } = require("./db/schemas")

/**
 * Class for interacting with sensors and sensor entries in the systems database
 */
class sensorStore {
    constructor() {
        Sensor.find({}).exec((err, res ) => this.sensors = res)
        Entry.find({}).exec((err, res) => this.entries = res)
        Sensor.find({}).populate({path:"entries", options: {limit: 10}}).exec((err, res) => this.references = res)
    }

    async updateSensors() {
        this.sensors = await Sensor.find({}).populate({path:"entries", options: {limit: 10}})
    }

    async updateEntries() {
        this.entries = await Entry.find({limit: 100})
    }

    async updateReferences() {
        this.references = await Sensor.find({}).populate({path:"entries", options: {limit: 10}})
    }

    /**
     * @description Method for storing a new sensor entry. IF the sensor already exists in the DB the new entry is added against it
     *              ELSE the sensor is registered with the system, added to the database and the new entry is added against it
     * @param {number} id Sensor ID
     * @param {string} area Area the sensor is in
     * @param {number} temperature temperature read from the sensor
     * @param {Date} time Timestamp for the reading
     */
    async store(id, area, temperature, time) {
        let sensor = await this.get(id)
        if (sensor == undefined) {
            console.log("Sensor not found")
            sensor = await Sensor.create({
                id: id,
                area: area,
                temperature: temperature
            })
            console.log("Registered sensor")
            
        } 
        let e = await Entry.create({
            temperature: temperature,
            time: time,
            area: area
        })
        sensor.temperature = e.temperature
        sensor.entries.push(e._id)
        await sensor.save()
        await this.updateSensors()
        return true
    }

    async get(id) {
        let sensor = this.sensors.find(k => k.id == id)
        if (sensor == undefined) {
            return await Sensor.findOne({id: id}).populate({path:"entries", options: {limit: 100}}) 
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

    /**
     * @description Function for retrieving all sensors for a given location
     * @param {string} area Area from which the information being requested is in
     * @return {object[]}
     */
    async getByLocation(area) {
        let sensor = this.sensors.find(k => k.area == area) 
        if (sensor == undefined) {
            return await Sensor.find({area: area})
        }
        return sensor
        
    }
    /**
     * @description Function for retrieving all sensor entries for a given sensor location
     * @param {string} area Area from which the information being requested is in
     * @returns {object[]}
     */
    async getLocationHistory(area) {
        let hist = this.entries.filter(e => e.area == area)
        return hist
    }

    toString() {
        return this.keys.toString()
    }
}

module.exports = sensorStore