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
    if(sensorStore.length == 0) {   // If there is no sensor data,
        res.statusCode = 204        // Successful, no content returned
    } else {                        // There is sensor data,
        res.statusCode = 200        // Request received and processed OK
        res.send(sensorStore.keys)  // Return the sensor data
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