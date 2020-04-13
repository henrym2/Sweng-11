textTemplates = {
    TEMP_REQUEST: (content) => { 
        let tableContent = new String()
        content.forEach(e => {
            tableContent +=
            (`  - Area: ${e.area}, Temperature: ${e.temperature}, Change: ${e.change < 0 ? "Increase": "Decrease"}
            `)
        })
        return (
`Temperature Change request

The temperatures in the following areas are considered unsatisfactory:    
    ${tableContent}

All other areas are satisfied with the current temperature.
        `)
    },
    TEMP_ERROR: (content) => { 
        let tableContent = new String()
        content.forEach(e => {
            tableContent +=
            (`  - Area: ${e.area}, Temperature: ${e.temperature}
            `)
        })
        return (
`Acceptable Temperature issues

Temperatures in the following areas are outside acceptable office conditions:   
    ${tableContent}

All other areas are within acceptable levels
        `)
    },
    SENSOR_ERROR: (content) => { 
        let tableContent = new String()
        content.forEach(e => {
            tableContent +=
            (`  - Sensor ID: ${e.sensorID}, Area: ${e.area}
            `)
        })
        return (
`Some sensors are currently offline

The following sensors have not been sending temperature data over an extended period of time: 
    ${tableContent}

All other sensors are operating correctly
        `)
    },
    PERIODIC_ADJUSTMENT: (content) => { 
        let tableContent = new String()
        content.forEach(e => {
            tableContent +=
            (`  - Area: ${e.area}, Temperature: ${e.temperature}, Change: ${e.change < 0 ? "Increase": "Decrease"}
            `)
        })
        return (
`Periodic adjustments

Historical trends predict the following temperature requests:    
    ${tableContent}

All other areas are satisfied with the current temperature.
        `)
    }
}

HTMLTemplates = {
    TEMP_REQUEST: (content) => { 
        let tableContent = new String()
        content.forEach(e => {
            tableContent +=
            (`<tr style="height: 17px;">
                <td style="width: 33.3333%; height: 17px;">${e.area}</td>
                <td style="width: 33.3333%; height: 17px;">${e.temperature}</td>
                <td style="width: 33.3333%; height: 17px;">${e.change < 0 ? "Increase": "Decrease"}</td>
            </tr>`)
        })
        return (
        `<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>ThermaPoll temperature change request</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body>
            <p>Temperature Change request</p>
            <p>The temperatures in the following areas are considered unsatisfactory:</p>
            <table style="border-collapse: collapse; width: 100%; height: 34px;" border="1">
                <tbody>
                    <tr style="height: 17px;">
                        <td style="width: 33.3333%; height: 17px;">Area</td>
                        <td style="width: 33.3333%; height: 17px;">Current Temperature</td>
                        <td style="width: 33.3333%; height: 17px;">Change Requested</td>
                    </tr>
                    ${tableContent}
                </tbody>
            </table>
            <p>All other areas are satisfied with the current temperature.</p>
        </body>
        </html>`)
    },
    TEMP_ERROR: (content) => {
        let tableContent = new String()
        content.forEach(e => {
            tableContent += (
                `<tr>
                    <td style="width: 50%;">${e.area}</td>
                    <td style="width: 50%;">${e.temperature}</td>
                </tr>`
            )
        })
        return (
            `<!doctype html>
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>ThermaPoll temperature error</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </head>
            <body>
                <p>Acceptable Temperature error</p>
                <p>Temperatures in the following areas are outside acceptable office conditions of 17.5&ordm;C to 23.5&ordm;C</p>
                <table style="border-collapse: collapse; width: 100%;" border="1">
                    <tbody>
                        <tr>
                            <td style="width: 50%;">Area</td>
                            <td style="width: 50%;">Current Temperature</td>
                        </tr>
                        ${tableContent}
                    </tbody>
                </table>
                <p>Please resolve these temperature discrepencies</p>
            </body>`
        )
    },
    SENSOR_ERROR: (content) => {
        let tableContent = new String()
        content.forEach(e => {
            tableContent += (
                `<tr style="height: 17px;">
                    <td style="width: 50%; height: 17px;">${e.sensorID}</td>
                    <td style="width: 50%; height: 17px;">${e.area}</td>
                </tr>`
            )
        })
        return (
            `<!doctype html>
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>ThermaPoll temperature sensor error report</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </head>
            <body>
                <p>
                    <span style="font-weight: 400;">Some sensors are currently offline.</span>
                </p>
                <p>The following sensors have not been sending temperature data over an extended period of time.</p>
                <table style="border-collapse: collapse; width: 100%; height: 17px;" border="1">
                    <tbody>
                        <tr style="height: 17px;">
                            <td style="width: 50%; height: 17px;">Sensor ID</td>
                            <td style="width: 50%; height: 17px;">Area</td>
                        </tr>
                        ${tableContent}
                    </tbody>
                </table>
                <p>All other sensors are operating correctly &nbsp;</p>
            </body>`
        )
    },
    PERIODIC_ADJUSTMENT: (content) => { 
        let tableContent = new String()
        content.forEach(e => {
            tableContent +=
            (`<tr style="height: 17px;">
                <td style="width: 33.3333%; height: 17px;">${e.area}</td>
                <td style="width: 33.3333%; height: 17px;">${e.temperature}</td>
                <td style="width: 33.3333%; height: 17px;">${e.change < 0 ? "Increase": "Decrease"}</td>
            </tr>`)
        })
        return (
        `<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>ThermaPoll periodic adjustments</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body>
            <p>Periodic adjustments</p>
            <p>Historical trends predict the following temperature requests:</p>
            <table style="border-collapse: collapse; width: 100%; height: 34px;" border="1">
                <tbody>
                    <tr style="height: 17px;">
                        <td style="width: 33.3333%; height: 17px;">Area</td>
                        <td style="width: 33.3333%; height: 17px;">Current Temperature</td>
                        <td style="width: 33.3333%; height: 17px;">Change predicted</td>
                    </tr>
                    ${tableContent}
                </tbody>
            </table>
            <p>All other areas are satisfied with the current temperature.</p>
        </body>
        </html>`)
    }
}

console.log(textTemplates.TEMP_REQUEST([{temperature: 1, area: "test", change: -1}]))

module.exports = {
    HTMLTemplates: HTMLTemplates,
    textTemplates: textTemplates
}