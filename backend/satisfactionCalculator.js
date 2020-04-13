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

    async historicalDelta(voterStore, sensorData) {
        // Get latest vote on same day from last week
        let sensors = await sensorData.getSensors()
        let sensorsByArea = await Promise.all(sensors.map(async s => {
            let votes = await sensorData.getEntries(s.area)
            let obj = {
                name: s.area,
                votes: votes
            }
            return obj
        }))

        let votesByArea = await Promise.all(sensors.map(async s => {
          let votes = await voterStore.getVotesByLocation(s.area)
            let obj = {
                name: s.area,
                votes: votes
            }
            return obj
        }))

        console.log("Before:\n")
        votesByArea.forEach(area => console.log(area.votes))
        
        // Sort by time in reverse
        console.log("After:\n")
        votesByArea.forEach(area => {
            area.votes.sort(function(a, b) {
                let aDate = Date.parse(a.time)
                let bDate = Date.parse(b.time)
                if(aDate > bDate)
                    return -1
                else if(aDate === bDate)
                    return 0
                else
                    return 1
            })

            console.log(area.votes)
        })


        // Get closest vote consensus within 2 hours from that time
        votesByArea.forEach(area => {
            // Loop through the votes for this area
            area.votes.forEach(function(vote) {
                // Find the first occurrence between now a week ago and two hours earlier
                let oneWeekAgo = new Date()
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
                let twoHoursEarlier = new Date(oneWeekAgo)
                twoHoursEarlier.setHours(oneWeekAgo.getHours() - 2)
                
                let voteTime = new Date(vote.time)

                console.log("Checking " + voteTime + ", " + oneWeekAgo + ", " + twoHoursEarlier)
                if(voteTime < oneWeekAgo && voteTime > twoHoursEarlier) {
                    console.log("Found one:\n" + voteTime)
                    if(!('weekAgoRecentTime' in area))
                        area.weekAgoRecentTime = voteTime
                }
            })
        })

        // Compare with current time
        votesByArea.forEach(area => {
            if(!('weekAgoRecentTime' in area)) {
                console.log(area.weekAgoRecentTime)
            }
        })
        // Find sensor 

        // If not within 2 degrees

        // Send alert
    }

}

module.exports = calculator
