//const server = require('/server')

class votes {
    constructor() {
        this.keys = {
            id,
            name,
            area,
            desk,
            vote,
        };
        this.length = 0;
        this.defaultValue = null;
    }
    
    store(id, name, area, desk, vote) {
        if (this.keys == undefined) {
            this.keys = {}
        };
        this.keys[id] = {id, name, area, desk, vote};
        this.length++;
    }
}

votes.prototype.store(123456, "John Test", "1A", "17", "hotter")
votes.prototype.store(123457, "John Test", "1A", "17", "colder")
votes.prototype.store(123458, "John Test", "1A", "17", "hotter")
votes.prototype.store(123456, "John Test", "1A", "17", "colder")

console.log(votes.prototype.keys)
