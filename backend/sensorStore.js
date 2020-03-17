// Similar to voteStore
//const server = require('/server')
const fs = require('fs');
const { Sensor, Entry } = require("./db/schemas")

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
        /*
        let e = new Entry({
            _id: new mongoose.Types.ObjectId
            temp: temperature,
            time: time
        })
        let s = new Sensor({
            id: id,
            area: location,
            temperatures: [
                { e._id }
            ]
        })
        s.save(err => {
            console.log(err)
        })
        */
    }

    get(id) {
        return this.keys.find(s => s.id == id)
    }

    getByLocation(location) {
        return this.keys.find(l => l.location == location)
    }

    toString() {
        return this.keys.toString()
    }
}

module.exports = sensorStore