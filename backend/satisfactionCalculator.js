const votes = require('./voteStore')
const voteStorage = new votes()
const alerter = require('./alerting.js')
const alert = new alerter()
const timebucket = require('timebucket')

class calculator {

    /**
     * 
     * @param {areaList[]} areaList 
     * @param {votes[]} voteStore
     * @abstract The basic idea is that it takes in the list of areas and all the current votes
     *           then it runs through the areas list aggreates all the votes from that area and 
     *           checks to see if the number of votes in the past hour passes the critical mass 
     *           which for now is just half the area. 
     *              
     *           I would really liked this looked over as I think this is what's needed but 
     *           I'm not fully sure.
     */
    areaCheck (areaList, voteStore) {
        for(let j = 0; j < areaList.length; j++) {
            let tempArray = new Array
            for(let i = 0; i < voteStore.keys.length; i++) {
                if (voteStore.keys[i].area == areaList[j]) {
                    tempArray[i] = voteStore.keys[i]
                }
            }
            let critMass = 0;
            for(let i = 0; i < tempArray.length; i++) {
                if (tempArray[i].timeStamp == timebucket('h').subtract(1) + '') {
                    critMass++
                }
            }
            if(areaList[i].size/2 == critMass) {
                let num = calculate(voteStore, areaList[i].name)
                this.alerter(areaList[i].name, 0, num)
            }
        }
    }

    /**
     * 
     * @param {votes[]} voteStore 
     * @param {string} areaToCheck
     * @returns {number} The new temperature 
     */
    calculate (voteStore, areaToCheck) {
        let tempArray = new Array

        for(let i = 0; i < voteStore.keys.length; i++) {
            if (voteStore.keys[i].area == areaToCheck && voteStore.keys[i].vote != null) {
                tempArray[i] = voteStore.keys[i]
            }
        }

        let vote = 0;
        for(let i = 0; i < tempArray.length; i++) {
            vote += tempArray[i].vote
        }
        return vote/tempArray.length
    }
    alerter(areaToChange, currentTemp, newTemp) {
        
        let content = [{
            area: areaToChange,
            currentTemp: currentTemp,
            tempChange: newTemp
        }]
        alerter.createAlert("Temperature change request", content, 0);
    }
}

// output = calculator.prototype.calculate(voteStorage, '1A')
// console.log("\n" + output)
// console.log(timebucket('h') + '')
module.exports = calculator