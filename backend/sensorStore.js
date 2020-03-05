// Similar to voteStore
//const server = require('/server')
const fs = require('fs');

class sensorStore {
    constructor() {
        this.keys = new Array
        this.length = 0;
        this.defaultValue = null;
    }

    populate(){
        let rawdata = fs.readFileSync('mockSensorData.json');
        let sensors = JSON.parse(rawdata).sensors;
        this.keys = sensors
    }
    
    store(id, location, temperature, time) {
        if (isFinite(id)) {     // had issues with "instanceof"
            this.keys[id] = {location, temperature, time}
            this.length++;
        } else {
            for (k in this.keys) {
                if (k.location == location) {
                    this.keys[k.id] = {location, temperature, time}
                }
            }
        }
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