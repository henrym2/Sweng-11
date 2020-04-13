const votes = require('./voteStore')
const voteStorage = new votes()
const alerter = require('./alerting.js')
const alert = new alerter()

const thresholdNeg = -1
const thresholdPos = 1
class calculator {

    /**
     * 
     * @param {areaList[]} areaList 
     * @param {votes[]} voteStore
     * @abstract The basic idea is that it takes in the list of areas and all the current votes
     *           then it runs through the areas list aggregates all the votes from that area and 
     *           checks to see if the number of votes in the past hour passes the critical mass 
     *           which for now is just half the area. 
     *              
     *           I would really liked this looked over as I think this is what's needed but 
     *           I'm not fully sure.
     */
    areaCheck (areaVotes, sensors) {
        let content = []
        areaVotes.forEach(area => {
            let bucket = area.votes.map(vote => {
                let curr = new Date()
                console.log(curr)
                let lim = new Date()
                lim.setHours(curr.getHours() - 1);
                console.log(lim)
                let voteTime = new Date(vote.time)
                console.log(voteTime)
                if( lim <= voteTime && voteTime <= curr ) {
                    return vote
                }
            });

            let initVal = 0;
            let satisfaction = bucket.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.opinion
            }, initVal)

            if (thresholdNeg < satisfaction || satisfaction < thresholdPos) {
                let sensor = sensors.find(s => s.area == area.name)
                content.push({
                    sensorID: sensor.id,
                    area: area.name,
                    temperature: sensor.temperature,
                    change: satisfaction
                })
            }
        });
        return content
    }

    historicalDelta(sensors) {

    }

}

module.exports = calculator
