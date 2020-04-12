//const server = require('/server')
const fs = require('fs');
const { Vote } = require('./db/schemas')
const { User } = require('./db/schemas')

class votes {
    constructor() {
        User.find({}).exec((err, res) => this.keys = res)
        this.users = User.find({})
        this.votes = Vote.find({})
        this.references = User.find({}).populate('votes')
    }

    async updateVotesList(){
        this.votes = await User.find({})
    }

    async updateUserList(){
        this.votes = await Vote.find({})
    }

    async updateReferenceList() {
        this.references = User.find({}).populate('votes')
    }

    async store(identifier, vote) {
        let u = undefined
        if (typeof identifier == "string") {
            u = await this.getByName(identifier)
        }
        else {
            u = await this.get(identifier)
        }
        if (u != undefined){
            let v = await Vote.create({
                time: new Date().toISOString(), 
                area: u.area, 
                opinion: vote
            })
            u.votes.push(v._id)
            await u.save()
            await this.updateVotesList()
        } else {
            console.log("User not found")
        }
    }

    async get(id) {
        let user = undefined
        if (this.users.length > 0){   
            user = this.users.find(k => k._id == id)
        }
        if (user == undefined){
            return await User.findOne({id: id})
        }
        return user
    }

    async getAllUsers() {
        await this.updateUserList()
        return this.users
    }

    async getAllVotes() {
        await this.updateVotesList()
        return this.votes
    }

    async getVotesByLocation(area) {
        return await Vote.find({area: area})
    }

    async getAll() {
        await this.updateReferenceList()
        return this.references
    }

    async getByName(name) {
        let user = undefined
        if (this.users.length > 0){        
            user = this.users.find(k => k.name == name) 
        }
        if (user == undefined) {
            return await User.findOne({name: name})
        }
        return user
    }
}

module.exports = votes
