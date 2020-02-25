const sendgrid = require('@sendgrid/mail');
const dotenv = require("dotenv").config()

sendgrid.setApiKey(process.env.SENDGRID_KEY);

class alerter {
    constructor() {
        this.lastMail = {}
        this.recipient = process.env.ALERT_RECIPIENT
        this.sender = process.env.ALERT_SENDER
    }
    /*

    */
    createAlert(subject, content) {

        let newMail = {
            to: this.recipient,
            from: this.sender,
            subject: subject,
            text: content,
        }
        
        this.sendAlert(newMail)
    }

    sendAlert(email) {
        sendgrid.send(email)
        .then(() => this.lastMail = email)
        .catch((err) => console.error(err))
    } 

}

let a = new alerter()
a.createAlert("test","test")

module.exports = alerter