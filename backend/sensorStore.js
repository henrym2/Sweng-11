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

        Sensor.findOne({id: id}).exec((err, s) => {
            let e = new Entry({
                _id: new mongoose.Types.ObjectId,
                temperature: temperature,
                time: time
            })
            Entry.create(e, (err, ent) => {
                s.push(ent._id)
                s.save(err => {
                    console.log(err)
                })
            })
        })
        
        
        if(this.keys[sensorIdx] == undefined) {
            this.keys.push({id, location, temperature, time})
        } else {
            this.keys[sensorIdx].temperature = temperature
            this.keys[sensorIdx].time = time
        }
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