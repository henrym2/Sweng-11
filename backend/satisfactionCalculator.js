const votes = require('./voteStore')
const {Entry } = require('./db/schemas')
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
        //Get all currently connected sensors
        let sensors = await sensorData.getSensors()
        // Setup
        //Get all sensor entries for the last week
        let entries = await Entry.find({"time": {"$gte": (new Date().getHours() -7)}})
        
        //Access with entriesByArea[area]
        let entriesByArea = entries.reduce((allEntries, entry) => {
            //Construct a Hash map of entry areas to entries where the keys are area names and values are entries
            if (entry.area in allEntries) {
                allEntries[entry.area].push(entry)
            } else {
                allEntries[entry.area] = [entry]
            }
            return allEntries
        }, {})

        let votesByArea = await Promise.all(sensors.map(async s => {
            let votes = await voterStore.getVotesByLocation(s.area)
            let obj = {
                name: s.area,
                votes: votes
            }
            return obj
        }))
        
        // Get latest vote on same day from last week
        votesByArea.forEach(area => {
            //Calculate the average of the temperature of the areas
            let averageTemp = entriesByArea[area.name].reduce((acc, curr) => {
                acc + curr.temperature
            }, 0) / entriesByArea[area.name]

            let sensor = sensors.find(s => s.area == area.name)

            console.log("Before:")
            console.log(area.votes)

            // Sort votes for this area by time in reverse
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

            console.log("\nAfter:")
            console.log(area.votes)

            // Get closest vote consensus within 2 hours from that time
            // Loop through the votes for this area
            area.votes.every(function(vote) {
                let oneWeekAgo = new Date()
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
                let twoHoursEarlier = new Date(oneWeekAgo)
                twoHoursEarlier.setHours(oneWeekAgo.getHours() - 2)
                
                let voteTime = new Date(vote.time)

                console.log("Checking " + voteTime + ", " + oneWeekAgo + ", " + twoHoursEarlier)
                if(voteTime < oneWeekAgo && voteTime > twoHoursEarlier) {
                    console.log("Found one:\n" + voteTime)
                    // Find closest sensor entry for this time using the same logic
                    console.log("Sensor readings:" + averageTemp)
                    if(averageTemp > (sensor.temperature+2) && averageTemp < (sensor.temperature-2)) {
                        //Unfinished, assume we would add all the changes to a single content array and then send them as a block?

                        return false    // Equivalent to break in Array.every()
                    }
                    // Use the vote opinion with the average sensor reading at that time and
                    // if they're more than two degrees higher or lower than the current
                    // temperature, send an alert suggesting to take action
                    
                }
                return true
            })
        })
    }
}

module.exports = calculator
