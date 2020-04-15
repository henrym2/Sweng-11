const mongoose = require("mongoose")
const fs = require("fs")
const dotenv = require("dotenv")
dotenv.config()

const {User, Sensor, Alert, Entry, Vote} = require('./schemas')

mongoose.connect(process.env.DB_STRING);
const initDB = mongoose.connection
initDB.on("error", console.error.bind(console, "DB Connection Error."))
  initDB.once("open", () => {
    console.log("DB Connection Successful.")
  })

mongoose.connection.dropDatabase().then(
  async () => {
      await User.createCollection()
      await Sensor.createCollection()
      await Alert.createCollection()
      await Entry.createCollection()
      await Vote.createCollection()
      
      let rawData = fs.readFileSync('./db/db.json')
      let sensors = JSON.parse(rawData).sensors
      let users = JSON.parse(rawData).users
      let entries = JSON.parse(rawData).entries
      let alerts = JSON.parse(rawData).alerts
      let votes = JSON.parse(rawData).votes
      
      let aModels = []
      let eModels = []
      let uModels = []
      let vModels = []

      let ent = await Entry.create(entries)
      let s = await Sensor.create({...sensors[0], _id: new mongoose.Types.ObjectId })
      s.entries.push(ent[0]._id)
      s = await s.save()
      console.log(s)
      alerts[0].content[0].sensorID = s._id
      await Alert.create(alerts)
      votes[0].time = new Date().toISOString()
      let vot = await Vote.create(votes)
      let us = users.map(u => new User({...u}))
      console.log(vot[0])
      us[0].votes.push(vot[0]._id)
      await User.create(us)
      // mongoose.disconnect()

      
  }
).catch(e => console.log(e))