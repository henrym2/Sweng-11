//const server = require('/server')
const fs = require('fs');
const { Vote } = require('./db/schemas')
const { User } = require('./db/schemas')

/**
 * Vote storage class for handling reads and writes associated with users and votes in the system
 */
class votes {
    constructor() {
        User.find({}).exec((err, res) => this.keys = res)
        this.users = User.find({})
        this.votes = Vote.find({})
        this.references = User.find({}).populate('votes')
    }
    /**
     * @description Updates the in memory votes list
     */
    async updateVotesList(){
        this.votes = await User.find({})
    }
    /**
     * @description Updates the in memory user list
     */
    async updateUserList(){
        this.votes = await Vote.find({})
    }
    /**
     * Updates the votes list but also populates the users references to votes
     */
    async updateReferenceList() {
        this.references = User.find({}).populate('votes')
    }
    /**
     * @description Storage method for adding a new vote against a user based on the users identifier
     * @param {string|id} identifier The identifier for a user in the system
     * @param {number} vote The opinion/vote of the user (an int in the range -2 -> 2)
     */

    async store(identifier, vote) {
        let u = undefined
        if (typeof identifier == "string") {
            u = await this.getByName(identifier)
        }
        else {
            u = await this.get(identifier)
        }
        if (u != undefined) {
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
    /**
     * @description Method used for getting a user by their ID
     * @param {number} id 
     */
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
    /**
     * @description Method used for checking if the last valid vote for a user was cast in the last minute
     *              If it was cast in the last minute then return true, else false
     * @param {string} identifier Users Name or nickname
     * @returns {boolean}
     */
    async hasVotedRecently(identifier) {
        let user = await this.getByName(identifier)
        await user.populate("votes").populate("votes").execPopulate();
        if(new Date(user.votes.slice(-1)[0].time) > new Date() - (60 * 1000)) {
            return true
        }
        return false
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
