//this module will display contact information

const domEl = require("./domElements")
const contactConent = require("./contactController")

const displayContact = () => {

    const contactHeader = "<h1>Contact Me</h1>"

    domEl.header.html(contactHeader) //adds the contact header to the dom

    const contactInfo = contactConent()

    domEl.content.html(contactInfo) //adds the contact info to the dom

}