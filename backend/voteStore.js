//const server = require('/server')
const fs = require('fs');
const { Vote } = require('./db/schemas')
const { User } = require('./db/schemas')

class votes {
    constructor() {
        User.find({}).exec((err, res) => this.keys = res)
        this.keys = User.find({})
    }

    async updateVotesList(){
        this.keys = await User.find({})
    }

    async store(identifier, vote) {
        let u = this.get(identifier)
        if (identifier instanceof String) {
            let u = await this.getByName()
        }
        if (u != undefined){
            let v = await Vote.create({time: new Date().toISOString(), area: u.area, opinion: vote})
            u.votes.push(v._id)
            await u.save()
            await this.updateVotesList()
        } else {
            console.log("User not found")
        }
    }

    async get(id) {
        return this.keys.find(k => k.id == id) || User.findOne({id: id})
    }

    async getByName(name) {
        return this.keys.find(k => k.name == name) || User.findOne({name: name})
    }
}

module.exports = votes
