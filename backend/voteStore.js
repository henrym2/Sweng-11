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
        if (identifier instanceof Number) {
            this.keys[identifier].vote = vote
        } else {
            for (k in keys) {
                if (k.name == identifier) {
                    this.keys[k.id].vote = vote
                }
            }
        }
        // this.length++;
    }

    get(id) {
        return this.keys[id] || undefined
    }
}

module.exports = votes

