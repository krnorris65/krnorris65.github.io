//this module will display the home page

const displayPage = require("../displayPage")

const displayHome = () => {

    const homeHeader = `
    
        <h1>Kristen Norris</h1>
        <h2 id="cohort">NSS Cohort 22</h2>
    `
    const homeInfo = ""
        
    displayPage(homeHeader, homeInfo) 
        
    $("#page-filter").html("")
    $("#page-footer").html("")

}

module.exports = displayHome