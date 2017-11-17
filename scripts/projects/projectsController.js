//generates content for projects page
const projectDOM = require("./productsInfo")

$("input[name='projectsFilter']")

const projectsContent = () => {
    $.ajax({
        "url": "data/database.json",
        "method": "GET"  
    }).then(
        projectInfo => {
            const projectDb = projectInfo.project;

            let projectString = "";

            //builds search input on DOM
            projectString += `
                <p>Search: <input type="text" name="projectsFilter" placeholder="search all projects"></p>
            `

            // builds project section
            projectString += `
                <section id="projects">
            `

            //iterates through projects
            const pInfo = projectDOM(projectDb)

            projectString += pInfo
            
            //closing tag for project section
            projectString += `
                </section>
            `

            return projectString
        }
    )

}

module.exports = projectsContent
