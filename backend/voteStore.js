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
        this.keys = users.map(e => {
            let obj = e
            obj.vote = 0
            return obj
        })
    }
    
    store(identifier, vote) {
        if (identifier instanceof Number) {
            for (let i = 0; i < this.keys.length; i++) {
                if (this.keys[i].id == identifier) {
                    this.keys[i].vote = vote
                }
            }
        } else {
            for (let i = 0; i < this.keys.length; i++) {
                if (this.keys[i].name == identifier) {
                    this.keys[i].vote = vote
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

