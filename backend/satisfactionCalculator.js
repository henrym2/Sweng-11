const votes = require('./voteStore')
const {Entry } = require('./db/schemas')
const alerter = require('./alerting.js')
const alert = new alerter()

const thresholdNeg = -1
const thresholdPos = 1
const upperLimit = 26
const lowerLimit = 17.5
class calculator {

    /**
     * 
     * @param {areaList[]} areaVotes An array of areas and the new opinions collected within the past hour
     * @param {sensors[]} sensors The current sensors and their updated data
     * @abstract This takes an array of all the areas and their new temperature opinions gathered 
     *           within the last hour and the sensors tied to those areas. It runs through all the areas within areaVotes, 
     *           aggregates the votes and calculates the new satisfaction rating that will generate the areas new temperature 
     *           before sending out the new temperature and associated data through a content array.
     * @return {content[]} Content array used for sending an alert as email and as a notification to the admin panel
     */
    async areaCheck (areaVotes, sensors) {
        let content = []
        // Go through each area
        await areaVotes.forEach(async area => {
            // A data structure for accumulating the votes that fall within the last hour
            let bucket = area.votes.map(vote => {
                let curr = new Date()
                let lim = new Date()
                lim.setHours(curr.getHours() - 1);
                let voteTime = new Date(vote.time)
                console.log(voteTime)
                if( lim <= voteTime && voteTime <= curr ) {
                    return vote
                }
            });

            let initVal = 0;
            //Goes through the bucket removing each vote and adding it to the new satisfaction variable
            let satisfaction = bucket.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.opinion
            }, initVal)
        
            if (satisfaction > 0) {
                satisfaction = satisfaction % thresholdNeg-2
            } else if (satisfaction < 0) {
                satisfaction = satisfaction % thresholdPos+2
            }

            //Sends the alert
            if (satisfaction < thresholdNeg || satisfaction > thresholdPos) {
                console.log("Sending Temperature Adjustment alert")
                let sensor = await sensors.find(s => s.area == area.name)
                content.push({
                    sensorID: sensor.id,
                    area: area.name,
                    temperature: sensor.temperature,
                    change: (satisfaction * -1)
                })
            }
        });
        return content
    }

    /**
     * 
     * @param {sensors[]} sensors The current sensors and their updated data
     * @abstract This goes through all the sensors and makes sure none of the temperatures is outside the legal bounds.
     *           At the time when written that was between 17.5 to 26 degrees celsius
     * @returns {content[]} Content array used for sending an alert as email and as a notification to the admin panel
     */
    async boundsCheck(sensors) {
        let content = []
        // Goes through each sensor and makes sure the temperature is within the set constant bounds
        sensors.forEach(s => {
            if (s.temperature > upperLimit || s.temperature < lowerLimit) {
                content.push({
                    sensorID: sensor.id,
                    area: area.name,
                    temperature: sensor.temperature
                })
            }
        })
        return content
    }

    /**
     * 
     * @param {votes} voterStore Reference to the votes object from app.js
     * @param {sensorStore} sensorData Reference to the sensor store object from app.js
     * @description Looks at the sensor data and votes from this time last week
     *              and calculates a comfortable temperature which is compared
     *              to the latest sensor data before returning suggested adjustments
     * @return {content[]} Content array used for sending an alert as email and as a notification to the admin panel
     */
    async historicalDelta(voterStore, sensorData) {
        //Get all currently connected sensors
        let sensors = await sensorData.getSensors()
        //Get all sensor entries for the last week
        let entries = await sensorData.getEntries()
        
        let oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        
        // Data structure for historical sensor data
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
        
        // Look through past votes for the latest vote from the same day from last week
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

            // Get the average of the votes within 4 hours of one week ago
            let voteSum = 0
            let voteCount = 0
            area.votes.forEach(function(vote) {
                let fourHoursLater = new Date(oneWeekAgo)
                fourHoursLater.setHours(oneWeekAgo.getHours() + 4)
                
                let voteTime = new Date(vote.time)

                // Only include votes within the 4 hour interval
                if(voteTime > oneWeekAgo && voteTime < fourHoursLater) {
                    voteSum += vote.opinion
                    voteCount++
                }

                return true
            })

            // Calculate the vote consensus
            area.averageVoteOfLastWeek = voteSum / voteCount
            console.log("Analyzed votes from area " + area.name + ", averageOfLastWeek was " + area.averageVoteOfLastWeek)

            // Sort our historical sensor data by time
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
                // Look through our past sensor data for...
                entriesByArea[area.name].every(entry => {
                    console.log("Area " + entry.area + " was " + entry.temperature + "℃  at " + entry.time + " [" + entry._id + "]")
                    
                    // The first sensor reading from now one week ago
                    if(Date.parse(entry.time) > oneWeekAgo) {
                        area.temperatureOneWeekAgo = entry.temperature
                        console.log("First sensor reading from now one week ago for area " + area.name + ": " + area.temperatureOneWeekAgo)
                        return false
                    }

                    return true
                })

                // Subtract the vote average to the temperature from a week ago
                // (We subtract here because a vote of 2 represents that an area was too hot,
                //  so we need to go the other way for a comfortable temperature)
                area.comfortableTemperature = area.temperatureOneWeekAgo + area.averageVoteOfLastWeek

                // See if last week's desired temperature is similar to the current temperature
                let latestSensorReading = entriesByArea[area.name][entriesByArea[area.name].length - 1].temperature

                console.log("Area " + area.name + "'s comfortable temperature was " + area.comfortableTemperature + ", the latest sensor reading for that area is " + latestSensorReading + "℃")
                console.log("Area " + area.name + " should be changed by " + (area.comfortableTemperature - latestSensorReading) + "℃")
                
                // Create an entry for our alert only if the estimated comfortable temperature
                // lies outside one degree of the current temperature
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
