const express = require("express");
const mongoose = require("mongoose");
const { Sensor, User } = require("./db/schemas");
const calculator = require("./satisfactionCalculator")

const votes = require("./voteStore");
const sensorStore = require("./sensorStore");
const alerter = require("./alerting");
var voterStore = new votes();
var sensorData = new sensorStore();
var alerts = new alerter();
var Schema = require("./db/schemas");
var calc = new calculator;
//Load in dotenv for parsing environment variables (secrets and stuff)
const dotenv = require("dotenv");

const envLoaded = dotenv.config();


if (envLoaded.error) {
  console.log("Be aware .env file not found")
}

//Load in body parser for parsing json
const bodyParser = require("body-parser");
const app = express();

//Make sure the express server uses body parser
app.use(bodyParser.json());

//Setup CORS
var cors = require("cors");

app.use(cors());


/**
 * @param {string|id} submitter
 * @param {number} opinion 
 * Post route for votes, takes a submitting user and an opinion and stores them in the database. 
 * Ensures that a user can only vote once per minute
 */
app.post("/vote", async (req, res) => {
  const { submitter, opinion } = req.body;
  if (submitter == undefined || opinion == undefined) {
    res.statusCode = 400;
    res.send();
  }
  if (await voterStore.hasVotedRecently(submitter)) {
    console.log("User voted too often")
    res.status = 429;
    res.send()
    return
  }
  console.log("Voter is " + submitter);
  await voterStore.store(submitter, opinion);

  console.log("New set of votes: ");
  // voterStore.keys.forEach(vote => console.log(vote))
  await alertLoop()
  res.statusCode = 200;
  res.send();
});

//Sensor submission route, takes in sensor data and stores the newest value as an Entry in the database
app.post("/sensorSubmit", async (req, res) => {
  const { id, area, temperature, time } = req.body;
  if (
    id == undefined ||
    area === undefined ||
    temperature == undefined ||
    time == undefined
  ) {
    res.statusCode = 400;
    res.send();
  }

  console.log(
    "Got: {" + id + ', "' + area + '", ' + temperature + ', "' + time + '"}'
  );
  await sensorData.store(id, area, temperature, time);
  console.log("All sensor data");
  // sensorData.keys.forEach(sensor => console.log(sensor))

  res.statusCode = 200;
  res.send(sensorData.keys);
});

/**
 * Sets up the database connection to the cosmos DB database. 
 */
function setupDB() {
  mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Database connection successful");
  });
}

/**
 * Get route for the sensor data. Takes either a sensorID as the query param or if no param is used returns the data on all of the sensors registered in the DB
 */
app.get("/sensorData", async (req, res) => {
  // There is sensor data,
  if (req.query.id != undefined) {
    // Check if the request asks for a particular sensor
    let sensor = await sensorData.get(req.query.id);
    if (sensor == null) {
      res.statusCode = 404; // Couldn't find a sensor with that id
      res.send();
      console.log("/sensorData: failed to find the specified sensor");
    } else {
      // Return the sensor with the requested id
      res.statusCode = 200;
      res.send(sensor);
      console.log("/sensorData: returned specified sensor data");
    }
  } else {
    // Send back all the sensor data
    res.statusCode = 200;
    res.send(await sensorData.getSensors());
    console.log("/sensorData: returned all data");
  }
});

/**
 * Get route for alerts. Returns all active alerts in the system
 */
app.get("/alerts", async (req, res) => {
  res.status = 200;
  res.send(await alerts.getActiveAlerts());
});

/**
 * Post route for alert dismissal. Dismisses an active alert based on ID
 */
app.post("/dismissAlert", async (req, res) => {
  const { id } = req.body;
  let a = await alerts.dismissAlert(id);
  res.status = 200;
  res.send(a);
});

let server = app.listen(process.env.APP_PORT || 8080, async () => {
  setupDB();
  console.debug(`Server launched on port ${process.env.APP_PORT || 8080}\n`, envLoaded.parsed);

  // await alertLoop()
  // setInterval(alertLoop, 3.6e+6)
});

/**
 * Alerting loop. Setup as an interval in the above function
 * This function handles the alerting in one of its three forms.
 * Historical via historical delta
 * By votes via areaCheck
 * Via out of bounds information in boundsCheck
 */
async function alertLoop() {
  let sensors = await sensorData.getSensors()
  let votesByArea = await Promise.all(sensors.map(async s => {
    let votes = await voterStore.getVotesByLocation(s.area)
        let obj = {
        name: s.area,
        votes: votes
      }
      return obj
  }))

  // This code causes errors
  let content = await calc.areaCheck(votesByArea, sensors)
  
  
  if (content.length != 0) {
    console.log(content)
    alerts.createAlert("Temperature change request", content, alerts.alertType.TEMP_REQUEST)
  }

  // Predictive alerts based on historical data
  // Runs twice a day; from 8am - 9am and 12pm - 1pm
  let date = new Date();
  // Only from 8am - 9am and 12pm - 1pm UTC
  if(date.getUTCHours() == 8 || date.getUTCHours() == 12) {
    // Not on weekends
    if(date.getUTCDay() != 6 && date.getUTCDay() != 7) {
      content = await calc.historicalDelta(voterStore, sensorData)
    }
  }


  if (content.length != 0) {
    alerts.createAlert("Periodic adjustment request", content, alerts.alertType.PERIODIC_ADJUSTMENT)
  }

  content = await calc.boundsCheck(sensors)
  if (content.length != 0) {
     alerts.createAlert("Temperatures outside of bounds", content, alerts.alertType.TEMP_ERROR)
  }
}

module.exports = server;
