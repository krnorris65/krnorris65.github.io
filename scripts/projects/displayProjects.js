//this module will display project information

const displayPage = require("../displayPage")
const projectConent = require("./projectsController")

const displayContact = () => {
    
    const projectHeader = "<h1>Kristen's Projects</h1>"

    const projectInfo = projectConent()

    displayPage(projectHeader, projectInfo)

}