const sendgrid = require('@sendgrid/mail');
const dotenv = require("dotenv").config()

sendgrid.setApiKey(process.env.SENDGRID_KEY);

class alerter {
    /**
     * @final
     * @typedef
     * @description Constants for deciding on the type of alert to be sent.
     * TEMP_REQUEST - - A temperature change request email type
     * SENSOR_ERROR - - A sensor error email type, to be sent if a sensor or set of sensors fail to send data in a time frame
     * TEMP_ERROR   - - A temperature error, to be sent if the temperature in an error exceeds a legal limit
     */
    static alertType = {
        TEMP_REQUEST: 0,
        SENSOR_ERROR: 1,
        TEMP_ERROR:   2
    }
    constructor() {
        this.lastMail = new Array
        this.recipient = process.env.ALERT_RECIPIENT
        this.sender = process.env.ALERT_SENDER
    }
    /**
     * @typedef {{
     *              sensorID: number | void
     *              area: string
     *              temperature: number
     *              change: number
     *          }}  content
     * @param {string} subject subject should reference the subject of the email e.g "Temperature change request" 
     * @param {content[]} contentList content should contain a list of objects referencing Areas, their temperature, satisfaction and change
     * @param {alerter.alertType} type
     * @return {void} No return value
     */
    createAlert(subject, contentList, type) {
        const content = this.constructContent(contentList, type)
        
        let newMail = {
            to: this.recipient,
            from: this.sender,
            subject: subject,
            text: content,
        }
        
        this.sendAlert(newMail)
    }
    /**
     * 
     * @param {content[]} contentList 
     * @param {alerter.alertType} type 
     * @return {string}
     */
    constructContent(contentList, type) {
        this.lastMail = contentList
        let content = ""
        if (contentList.length == 0) {
            return "Error"
        }
        switch (type) {
            case alerter.alertType.TEMP_REQUEST:
                content += "Temperature request"
                contentList.forEach(e => {
                    content += `\n${e.area} is currently at ${e.temperature}. 
                    An ${e.change ? "n increase" : " decrease"} in temperature has been requested\n`
                })
                break;
            case alerter.alertType.SENSOR_ERROR:
                contentList.forEach(e => {
                    content += `\n${e.sensorID} in ${e.area} has not responded and appears to be down.\n`
                })
                break;
            case alerter.alertType.TEMP_ERROR:
                contentList.forEach(e => {
                    content +=  `\n${e.area} is currently at ${e.temperature}. This is outside of appropriate limits. 
                    A${e.change ? "n increase": " decrease"} in temperature is recommended\n`
                })
            default:
                break;
        }
        return content
    }
    /**
     * @typedef {{
     *              to: string
     *              from: string
     *              subject: string
     *              content: string
     *          }}  email
     * @param {email} email The email to be sent
     */
    sendAlert(email) {
        sendgrid.send(email)
        .then(() => this.lastMail = email)
        .catch((err) => console.error(err))
    } 
}
/**
 * @description Stub class that will be used for email template's
 */
class mailEngine {
    constructor(type) {
        this.type = type
        this.template = this.loadTemplate()
    }
    /**
     * @description Used to create a new mail with the given params
     */
    createMail() {

    }
    /**
     * @description Loads a template based on a file
     */
    loadTemplate() {

    }
}


module.exports = alerter