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
        let entries = await sensorData.getEntries()
        
        // let oneWeekAgo = new Date(1586960008361) // fixed date value for testing
        let oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        console.log("One week ago: " + oneWeekAgo)
        
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

        // Data structure to hold our alert data
        let content = []
        
        // Get latest vote on same day from last week
        console.log(votesByArea)
        votesByArea.every(area => {
            console.log()
            if(area == undefined)
                return false
            // console.log("Votes in area " + area.name + ": " + area.votes)
            
            // Rare case where no votes were made for this area for the past week
            if(area.votes == undefined) {
                console.error("Error in calculator.historicalDelta(): Couldn't find any votes for area " + area.name + " from this time last week, ignoring area...")
                return false
            }

            // console.log("Before:")
            // console.log(area.votes)

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

            // console.log("\nAfter:")
            // console.log(area.votes)

            // Get the average of the votes within 4 hours of one week ago
            let voteSum = 0
            let voteCount = 0
            area.votes.forEach(function(vote) {
                let fourHoursLater = new Date(oneWeekAgo)
                fourHoursLater.setHours(oneWeekAgo.getHours() + 4)
                
                let voteTime = new Date(vote.time)

                // console.log("Processing vote from " + vote.time + " for Area " + area.name)
                // Only include votes within the 4 hour interval
                if(voteTime > oneWeekAgo && voteTime < fourHoursLater) {
                    voteSum += vote.opinion
                    voteCount++
                }
                return true
            })

            area.averageVoteOfLastWeek = voteSum / voteCount
            console.log("Analyzed votes from area " + area.name + ", averageOfLastWeek was " + area.averageVoteOfLastWeek)

            entries.sort(function(a, b) {
                let aDate = Date.parse(a.time)
                let bDate = Date.parse(b.time)
                if(aDate > bDate)
                    return 1
                else if(aDate === bDate)
                    return 0
                else
                    return -1
            })

            // console.log(entriesByArea)
            if(entriesByArea[area.name] == undefined) {
                console.log("Votes were found for area " + area.name + ", but no corresponding sensor data was found, ignoring area...")
            } else {
                entriesByArea[area.name].every(entry => {
                    console.log("Area " + entry.area + " was " + entry.temperature + "℃  at " + entry.time + " [" + entry._id + "]")
                    
                    // Find the first sensor reading from now one week ago
                    if(Date.parse(entry.time) > oneWeekAgo) {
                        area.temperatureOneWeekAgo = entry.temperature
                        console.log("First sensor reading from now one week ago for area " + area.name + ": " + area.temperatureOneWeekAgo)
                        return false
                    }
                    return true
                })

                // Add the vote average to the temperature from a week ago
                area.comfortableTemperature = area.temperatureOneWeekAgo + area.averageVoteOfLastWeek

                // See if last week's desired temperature is similar to the current temperature
                let latestSensorReading = entriesByArea[area.name][entriesByArea[area.name].length - 1].temperature
                console.log("Area " + area.name + "'s comfortable temperature was " + area.comfortableTemperature + ", the latest sensor reading for that area is " + latestSensorReading + "℃")
                console.log("Area " + area.name + " should be changed by " + (area.comfortableTemperature - latestSensorReading) + "℃")
                if(latestSensorReading > area.comfortableTemperature + 1) {
                    content.push({
                        sensorID: sensor.id,
                        area: area.name,
                        temperature: sensor.temperature,
                        change: Math.ceil(area.comfortableTemperature - latestSensorReading)
                    })
                } else if(latestSensorReading < area.comfortableTemperature - 1) {
                    content.push({
                        area: area.name,
                        temperature: latestSensorReading,
                        change: Math.floor(area.comfortableTemperature - latestSensorReading)
                    })
                }
            }

            return true
        })

        return content
    }
}

module.exports = calculator
