// Similar to voteStore
//const server = require('/server')
const fs = require('fs');

class sensorStore {
    constructor() {
        this.keys = new Array
        this.defaultValue = null;
    }

    populate(){
        let rawdata = fs.readFileSync('mockSensorData.json');
        let sensors = JSON.parse(rawdata).sensors;
        this.keys = sensors
    }
    
    store(id, location, temperature, time) {
        let sensorIdx = this.keys.findIndex(s => s.id == id)
        this.keys[sensorIdx].temperature = temperature
        this.keys[sensorIdx].time = time
    }

    get(id) {
        return this.keys[id] || undefined
    }

    get(location) {
        for(sensor in this.keys) {
            if(sensor.location == location) {
                return sensor
            }
        }
        return undefined
    }

    toString() {
        return this.keys.toString()
    }
}

module.exports = sensorStore