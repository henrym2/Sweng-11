const express = require('express')

const votes = require('./voteStore')
const sensorStore = require('./sensorStore')
var voterStore = new votes()
var sensorData = new sensorStore()

//Load in dotenv for parsing environment variables (secrets and stuff)
const dotenv = require('dotenv')

const envLoaded = dotenv.config()

if(envLoaded.error) {
    throw envLoaded.error
}

//Load in body parser for parsing json
const bodyParser = require("body-parser")
const app = express()

//Make sure the express server uses body parser
app.use(bodyParser.json())
const port = process.env.APP_PORT;

//let votes = new Array();

app.get('/', (req, res) => {
    //Example of how you might construct a JSON response
    let exampleObject = {
        test: "test"
    }
    res.send(exampleObject)
})

app.post('/vote', (req, res) => {
    const { submitter, opinion } = req.body
    if (submitter == undefined || opinion == undefined){
        res.statusCode = 400
        res.send()
    }
    console.log("Voter is " + submitter)

    voterStore.store(submitter, opinion)

    console.log("New set of votes: ")
    voterStore.keys.forEach(vote => console.log(vote))
    res.statusCode = 200
    res.send(voterStore.keys)
})

app.post('/sensorSubmit', (req, res) => {
    const { id, location, temperature, time} = req.body
    if (id == undefined ||
        location === undefined ||
        temperature == undefined ||
        time == undefined) {
        res.statusCode = 400
        res.send()
    }

    console.log("Got: {" + id + ", \"" + location + "\", " + temperature + ", \"" + time + "\"}")
    sensorData.store(id, location, temperature, time)
    console.log("All sensor data")
    sensorData.keys.forEach(sensor => console.log(sensor))

    res.statusCode = 200
    res.send(sensorData.keys)
})

app.get('/sensorData', (req, res) => {
    if(sensorData.keys.length == 0) {   // If there is no sensor data,
        res.statusCode = 204            // Successful, no content returned
        res.send()
        console.log("/sensorData: no sensor data exists")
    } else {                             // There is sensor data,
        if(req.query.id != undefined) { // Check if the request asks for a particular sensor
            let desiredSensorIndex = sensorData.keys.findIndex(s => s.id == req.query.id)

            if(desiredSensorIndex == -1) {
                res.statusCode = 404    // Couldn't find a sensor with that id
                res.send()
                console.log("/sensorData: failed to find the specified sensor")
            } else {                    // Return the sensor with the requested id
                res.statusCode = 200
                res.send(sensorData.keys[desiredSensorIndex])
                console.log("/sensorData: returned specified sensor data")
            }

        } else {                        // Send back all the sensor data
            res.statusCode = 200
            res.send(sensorData.keys)
            console.log("/sensorData: returned all data")
        }
    }
})

let server = app.listen(port, () => {
    voterStore.populate()
    sensorData.populate()
    console.debug(
        `Server launched on port ${port}\n`,
        envLoaded.parsed
    )
    }
)

module.exports = server