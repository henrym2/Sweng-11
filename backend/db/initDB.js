const mongoose = require("mongoose")
const fs = require("fs")

const {User, Sensor, Alert, Entry, Vote} = require('./schemas')

mongoose.connect("mongodb://thermapolladmin:QApToM0zCSKNjX9ZrmAToRRx0yZdxx4Pxdkoo6rPkM3BomHhE94HGSux9Y79pRFuoHmk76fhpzz3cuiU9Fgrkg%3D%3D@thermapolladmin.mongo.cosmos.azure.com:10255/?ssl=true&appName=@thermapolladmin@");
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
      
      let rawData = fs.readFileSync('./db/db.json')
      let sensors = JSON.parse(rawData).sensors
      let users = JSON.parse(rawData).users
      let entries = JSON.parse(rawData).entries
      let alerts = JSON.parse(rawData).alerts
      let aModels = []
      let eModels = []
      let uModels = []
      entries.forEach(e => {
        eModels.push({
        _id: new mongoose.Types.ObjectId,
        ...e
        })
      })
      Entry.create(eModels, (err, ents) => {
        let s = new Sensor({...sensors[0]})
        s.entries.push(ents[0]._id)
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

      await User.create(users)
      


      
      
      
  }
)