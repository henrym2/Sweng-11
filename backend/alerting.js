const sendgrid = require('@sendgrid/mail');
const {HTMLTemplates, textTemplates } = require('./mailTemplates.js')
const { Alert } = require('./db/schemas')
const dotenv = require("dotenv").config()

sendgrid.setApiKey(process.env.SENDGRID_KEY);

class alerter {    
    constructor() {
        this.lastMail = new Array
        this.recipient = process.env.ALERT_RECIPIENT
        this.sender = process.env.ALERT_SENDER
        /**
        * @final
        * @typedef
        * @description Constants for deciding on the type of alert to be sent.
        * TEMP_REQUEST - - A temperature change request email type
        * SENSOR_ERROR - - A sensor error email type, to be sent if a sensor or set of sensors fail to send data in a time frame
        * TEMP_ERROR   - - A temperature error, to be sent if the temperature in an error exceeds a legal limit
        */
        this.alertType = {
            TEMP_REQUEST: 0,
            SENSOR_ERROR: 1,
            TEMP_ERROR:   2
        }
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
        const { HTMLContent, textContent } = this.constructContent(contentList, type)
        let newMail = {
            to: this.recipient,
            from: this.sender,
            subject: subject,
            html: HTMLContent,
            text: textContent
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
        if (contentList.length == 0) {
            return "Error"
        }
        switch (type) {
            case this.alertType.TEMP_REQUEST:
                return {
                    HTMLContent: HTMLTemplates.TEMP_REQUEST(contentList),
                    textContent: textTemplates.TEMP_REQUEST(contentList)
                }
            case this.alertType.SENSOR_ERROR:
                return {
                    HTMLContent: HTMLTemplates.SENSOR_ERROR(contentList),
                    textContent: textTemplates.SENSOR_ERROR(contentList)
                }
            case this.alertType.TEMP_ERROR:
                return {
                    HTMLContent: HTMLTemplates.TEMP_ERROR(contentList),
                    textContent: textTemplates.TEMP_ERROR(contentList)
                }
            default:
                console.error("Incorrect alert type:", type)
        }
        return {
            HTMLContent: "",
            textContent: ""
        }
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
        .then(() => {
            this.lastMail = email
            let a = new Alert({
                title: email.subject,
                content: email.content,
                time: new Date().toISOString(),
                active: true,
            })
            a.save(err => console.log(err))
        })
        .catch((err) => console.error(err))
    }

    async getActiveAlerts(){
        return await Alert.find({active: true}).populate("content.sensor")
    }
    
    async dismissAlert(id){
        let a = await Alert.findOne({_id: id})
        a.active = false
        await a.save()
        return a
    }
}

module.exports = alerter