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
            
            //builds search input on DOM
            // projectString += `
            // <p>Search: <input type="text" name="projectsFilter" placeholder="search all projects"></p>
            // `

            const searchBar = $("#page-filter").append(`<p>Search: <input type="text" name="projectsFilter" placeholder="search all projects"></p>`)
            
            // builds project section
            projectString += `
            <section id="projects">
            `

            const pSearch = $("input[name='projectsFilter']")[0]

            //iterates through projects
            // const pInfo = projectDOM(projectDb)
            const pInfo = projectFilter(projectDb, projectDOM, pSearch)
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
