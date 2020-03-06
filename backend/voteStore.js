//const server = require('/server')
const fs = require('fs');

class votes {
    constructor() {
        this.keys = new Array
        this.length = 0;
        this.defaultValue = null;
    }

    populate(){
        let rawdata = fs.readFileSync('mockUserData.json');
        let users = JSON.parse(rawdata).users;
        this.keys = users
    }
    
    store(identifier, vote) {
        let voterIdx = this.keys.findIndex(v => {
            if (identifier instanceof Number && v.id == identifier){
                return v
            } else if(v.name == identifier) {
                return v
            }
        })
        if (voterIdx == undefined) {
            this.keys.push()
        }
        this.keys[voterIdx].vote = vote
    }

    get(id) {
        return this.keys[id] || undefined
    }
}

module.exports = votes

