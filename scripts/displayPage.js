const domEl = require("../scripts/domElements")

const displayPage = (pageHeader, pageContent) => {

    domEl.header.html(pageHeader) //adds the page header to the dom

    domEl.content.html(pageContent) //adds the content of page to the dom

}

module.exports = displayPage