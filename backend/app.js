const express = require("express");
const mongoose = require("mongoose");
const { Sensor, User } = require("./db/schemas");

const votes = require("./voteStore");
const sensorStore = require("./sensorStore");
const alerter = require("./alerting");
var voterStore = new votes();
var sensorData = new sensorStore();
var alerts = new alerter();
var Schema = require("./db/schemas");

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
// var whitelist = ["http://localhost:3000", "https://thermapollfrontend.z22.web.core.windows.net"];
// var corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };

app.use(cors());

app.get("/", (req, res) => {
  //Example of how you might construct a JSON response
  let exampleObject = {
    test: "test"
  };
  res.send(exampleObject);
});

app.post("/vote", async (req, res) => {
  const { submitter, opinion } = req.body;
  if (submitter == undefined || opinion == undefined) {
    res.statusCode = 400;
    res.send();
  }
  console.log("Voter is " + submitter);

  await voterStore.store(submitter, opinion);

  console.log("New set of votes: ");
  // voterStore.keys.forEach(vote => console.log(vote))
  res.statusCode = 200;
  res.send(voterStore.keys);
});

app.post("/sensorSubmit", async (req, res) => {
  const { id, location, temperature, time } = req.body;
  if (
    id == undefined ||
    location === undefined ||
    temperature == undefined ||
    time == undefined
  ) {
    res.statusCode = 400;
    res.send();
  }

  console.log(
    "Got: {" + id + ', "' + location + '", ' + temperature + ', "' + time + '"}'
  );
  await sensorData.store(id, location, temperature, time);
  console.log("All sensor data");
  // sensorData.keys.forEach(sensor => console.log(sensor))

  res.statusCode = 200;
  res.send(sensorData.keys);
});

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

app.get("/alerts", async (req, res) => {
  res.status = 200;
  res.send(await alerts.getActiveAlerts());
});

app.post("/dismissAlert", async (req, res) => {
  const { id } = req.body;
  let a = await alerts.dismissAlert(id);
  res.status = 200;
  res.send(a);
});

let server = app.listen(process.env.APP_PORT || 8080, () => {
  setupDB();
  console.debug(`Server launched on port ${process.env.APP_PORT || 8080}\n`, envLoaded.parsed);
});


module.exports = server;
