const express = require('express')

const votes = require('./voteStore')
var voterStore = new votes()

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
    res.send()
})

app.post('/sensorSubmit', (req, res) => {
    res.send()
})

let server = app.listen(port, () => {
    voterStore.populate()
    console.debug(
        `Server launched on port ${port}\n`,
        envLoaded.parsed
    )
    }
)

module.exports = server