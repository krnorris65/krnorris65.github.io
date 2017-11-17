//this module will display contact information

const displayPage = require("../displayPage")
const contactConent = require("./contactController")

const displayContact = () => {
    
    const contactHeader = "<h1>Contact Me</h1>"

    const contactInfo = contactConent()

    displayPage(contactHeader, contactInfo)

}