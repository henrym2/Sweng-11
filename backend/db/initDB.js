const mongoose = require("mongoose")
const fs = require("fs")

const {User, Sensor, Alert, Entry, Vote} = require('./schemas')

mongoose.connect();
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
      entries.forEach(e => {
        eModels.push({
        _id: new mongoose.Types.ObjectId,
        ...e
        })
      })
      await Entry.create(eModels, (err, ents) => {
        let s = new Sensor({...sensors[0]})
        s.entries.push(eModels[0]._id)
        s.save((err) => {
        if (err) {
          console.log(err)
        }
      })
        alerts.forEach(a => {
          aModels.push({
            _id: new mongoose.Types.ObjectId,
            ...a
          })
        })
        aModels[0].content[0].sensorID = s._id
        Alert.create(aModels, (err) => {
          console.log(err)
        })
      })
      vModels = votes.map(v => { return {_id: new mongoose.Types.ObjectId, ...v }})
      await Vote.create(vModels, (err, v) => {
        let us = users.map(u => new User({...u}))
        console.log(v)
        us[0].votes.push(vModels[0]._id)
        User.create(us, (err) => console.log(err))
      })
      // mongoose.disconnect()

      
  }
).catch(e => console.log(e))