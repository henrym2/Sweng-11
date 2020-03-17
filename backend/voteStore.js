//const server = require('/server')
const fs = require('fs');
const { Vote } = require('./db/schemas')
const { User } = require('./db/schemas')

class votes {
    constructor() {
        this.keys = new Array
    }

    populate(){
        let rawdata = fs.readFileSync('mockUserData.json');
        let users = JSON.parse(rawdata).users;
        this.keys = users
    }
    store(identifier, vote) {
        let voterIdx = this.keys.findIndex(v => {
            if(v.id === identifier) return true
            if(v.name === identifier) return true
        })
        if (voterIdx == undefined) {
            this.keys.push()
        }
        this.keys[voterIdx].vote = vote

        let u = await User.find({name: identifier})
        if (u != undefined){
            let v = new Vote({
                time: new Date(),
                area: u.area,
                opinion: vote
            })
            u.votes.push(v._id)
            u.save()
        }
    }

    get(id) {
        return this.keys.find(v => v.id == id)
    }
}

module.exports = votes
