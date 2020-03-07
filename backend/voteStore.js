//const server = require('/server')
const fs = require('fs');

class votes {
    constructor() {
        this.keys = new Array
    }

    populate() {
        let rawdata = fs.readFileSync('mockUserData.json');
        let users = JSON.parse(rawdata).users;
        this.keys = users
    }
    
    store(id, vote) {
        if (typeof(id) == 'number') {
            for(let i = 0; i < this.keys.length; i++) {
                if (this.keys[i].id == id) {
                    this.keys[i].vote = vote
                }
            }
        }
        else {
            for (k in keys) {
                if (k.name == id) {
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