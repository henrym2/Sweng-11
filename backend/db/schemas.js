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
        {vote: mongoose.Types.ObjectId}
    ]
})
/**
 * @typedef {{
 *          opinion: {Number} Value of the most recent vote
 *          time   : {Date} DateTime stamp for the newest vote
 *          }} vote
 * @param {int} id The ID of the user we want to update
 * @param {vote} vote The new value of vote to push to the array
 */
UserSchema.statics.addVote = async function(id, vote) {
    let v = new Vote(vote)
    await v.save()
    let u = this.find({id: id})
    u.votes.push(v._id)
    u.save()
}

const SensorSchema = mongoose.Schema({
    id: Number,
    area: String,
    temperatures: [
        {
            entry: mongoose.Types.ObjectId
        }
    ]
})

const EntrySchema = mongoose.Schema({
    temperature: Number,
    time: Date,
    area: String
})

/**
 * @typedef {{
    *       temperature: {Number} Value of the most recent temperature reading
    *       time   : {Date} DateTime stamp for the newest temperature input
    *       }} entry
    * @param {int} id The ID of the user we want to update
    * @param {entry} entry The new value of vote to push to the array
    */
SensorSchema.statics.addEntry = async function(id, entry) {
    let e = new TempEntry(entry)
    await e.save()
    let s = this.find({id: id})
    s.temperatures.push(e._id)
    s.save()
}

const AlertSchema = mongoose.Schema({
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
const TempEntry = mongoose.model('TempEntry', EntrySchema)
const Vote = mongoose.model('Vote', VotesSchema)

module.exports = {User, Sensor, Alert}