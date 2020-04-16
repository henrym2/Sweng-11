const mongoose = require("mongoose")

const VotesSchema = mongoose.Schema({
    opinion: Number,
    time: Date,
    area: String
})

const UserSchema = mongoose.Schema({
    id: Number,
    name: String,
    desk: String,
    area: String,
    votes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Vote'
        }
    ]
})

const SensorSchema = mongoose.Schema({
    id: Number,
    area: String,
    temperature: Number,
    entries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Entry'
        }
    ]
})

const EntrySchema = mongoose.Schema({
    temperature: Number,
    time: Date,
    area: String
})

const AlertSchema = mongoose.Schema({
    title: String,
    type: Number,
    time: Date,
    active: Boolean,
    content: [
        {   
            sensorID: Number,
            area: String,
            temperature: Number,
            change: Number,
        }
        ]
    }
)

const User = mongoose.model('User', UserSchema)
const Sensor = mongoose.model('Sensor', SensorSchema)
const Alert = mongoose.model('Alert', AlertSchema)
const Entry = mongoose.model('Entry', EntrySchema)
const Vote = mongoose.model('Vote', VotesSchema)

module.exports = {User, Sensor, Alert, Entry, Vote }