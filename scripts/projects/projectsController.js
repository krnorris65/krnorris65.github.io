//generates content for projects page
const projectFilter = require("../pageFilter")
const projectDOM = require("./productsInfo")

const projectsContent = () => {
    return $.ajax({
        "url": "https://personal-site-cf1b8.firebaseio.com/projects.json",
        "method": "GET"  
    }).then(
        projectDb => {
            let projectString = "";
            
    
            // builds project section
            projectString += `
            <section id="projects">
            `

            //iterates through projects
            // const pInfo = projectDOM(projectDb)
            const pInfo = projectFilter(projectDb, projectDOM)
            debugger

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
