const express = require('express')

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

let votes = new Array();

app.get('/', (req, res) => {
    //Example of how you might construct a JSON response
    let exampleObject = {
        test: "test"
    }
    res.send(exampleObject)
})

app.post('/vote', (req, res) => {
    let newVote = {
        submitter: req.body.submitter,
        opinion: req.body.opinion
    }
    console.log("Voter is " + newVote.submitter)

    if(!votes.some(vote => vote.submitter == newVote.submitter))
        votes.push(newVote)
    
    console.log("New set of votes: ")
    votes.forEach(vote => console.log(vote))

    res.send("ok\n")
})

let server = app.listen(port, () => {
    console.debug(
        `Server launched on port ${port}\n`,
        envLoaded.parsed
    )
    }
)

module.exports = server