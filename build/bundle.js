(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const navigation = [
    {
        "display": "Home"
    },
    {
        "display": "Resume"
    },
    {
        "display": "Contact"
    },
    {
        "display": "Projects"
    },
    {
        "display": "Blog"
    }
]

const navElement = document.getElementById("nav-items");

const navList = document.createElement("ul")

navigation.forEach(
    page => {
        const navEl = document.createElement("li")
        navEl.classList.add("navLink")
        navEl.id = `nav_${page.display}`

        const navLink = document.createElement("a")
        navLink.href = "#"
        navLink.appendChild(document.createTextNode(page.display))

        navEl.appendChild(navLink)
        navList.appendChild(navEl)
    }
)
navElement.appendChild(navList)

module.exports = null
},{}],2:[function(require,module,exports){
//generates content for contact page
const contactContent = () => {

    return $.ajax({ //need to return ajax function so that contactContent can access the string returned in .then()
        "url": "https://personal-site-cf1b8.firebaseio.com/contact.json",
        "method": "GET"
    })
        .then(
            contactDb => {
                let contactString = "";

                //builds contact by email section
                contactString += `
                <section>
                    <h4 class="contact">Send an email:</h4>
                    <ul id="send-email"> 
                        <li class="email"><a href="mailto:${contactDb.email}">${contactDb.email}</a></li>
                    </ul>
                </section>
            `
                //builds contact through social section
                contactString += `
                <section>
                    <h4 class="contact">Connect on social media:</h4>
                    <ul id="social-media">
            `

                //iterates through each social site
                contactDb.social.forEach(site => {
                    contactString += `
                    <li class="social"><a href="${site.url}">${site.service}</a></li>
                `
                })

                //closing tags for unordered list and contact section
                contactString += `
                </ul>
                </section>
            `

                return contactString
            }
        )
}

module.exports = contactContent
},{}],3:[function(require,module,exports){
//this module will display contact information

const displayPage = require("../displayPage")
const contactConent = require("./contactController")

const displayContact = () => {
    contactConent().then(contactString => {
        
        const contactHeader = "<h1>Contact Me</h1>"
        const contactInfo = contactString
        
        displayPage(contactHeader, contactInfo) //displayPage needs to be within the contactContent().then because it is dependent on the string that is returned when the then function runs
        
    })
}

module.exports = displayContact
},{"../displayPage":4,"./contactController":2}],4:[function(require,module,exports){
const domEl = require("./domElements")

const outputEl = domEl()

const displayPage = (pageHeader, pageContent) => {

    const headerEl = outputEl.header
    headerEl.html(pageHeader) //adds the page header to the dom

    const contentEl = outputEl.content
    contentEl.html(pageContent) //adds the content of page to the dom

}


module.exports = displayPage
},{"./domElements":5}],5:[function(require,module,exports){
//this module captures the dom elements that will be written to when each page is called

const domElements = () => {
    const domObject = Object.create(null, {
        "header": {
            value: $("#page-header")
        },
        "content": {
            value: $("#page-content")
        },
        "filter": {
            value: $("#page-filter")
        }
    })
    return domObject
}


module.exports = domElements
},{}],6:[function(require,module,exports){
$(document).ready(function () {
    //display navigation
    const navBar = require("./buildNavigation")
    
    //display contact
    const contactPage = require("./contact/displayContact")
    // contactPage()

    
    //display projects
    const projectPage = require("./projects/displayProjects")
    projectPage()

    //display resume
    const resumePage = require("./resume/displayResume")
    // resumePage()
    
    //display blog



})


},{"./buildNavigation":1,"./contact/displayContact":3,"./projects/displayProjects":8,"./resume/displayResume":11}],7:[function(require,module,exports){
const domEl = require("./domElements")

const filterPage = (dbArray, func) => {
    const outputEl = domEl()
    let pageLoad = ""
    
    if (dbArray.length > 0) {
        //create search input
        outputEl.filter.append(`<p>Search: <input type="text" name="pageFilter" placeholder="search all"></p>`)

        const pageSearch = $("input[name='pageFilter']")[0]
            
        pageLoad = func(dbArray) //initial page load
        
        pageSearch.addEventListener(
            "keyup",
            event => {
                if(event.target.value.length >= 3) {
                //convert what is being filtered to lowercase
                    const userFilterString = event.target.value.toLowerCase()

                    const pageFilter = dbArray.filter(filteredItem => {
                        return filteredItem.name.toLowerCase().includes(userFilterString) ||
                        filteredItem.description.toLowerCase().includes(userFilterString)
                    }
                    )

                    debugger

                    if(pageFilter.length === 0) {
                        pageLoad = "<h3>Search Results Not Found</h3>"
                    } else {
                        pageLoad = func(pageFilter) //displays filtered items
                    }
                } else {
                    // outputEl.content.html = " "
                    pageLoad= func(dbArray) //displays initial page load if selector has less than three characters
                }
            }
        )

    }
    return pageLoad
}

module.exports =  filterPage
},{"./domElements":5}],8:[function(require,module,exports){
//this module will display project information

const displayPage = require("../displayPage")
const projectContent = require("./projectsController")

const displayProject = () => {
    
    projectContent().then( productString => {
        const projectHeader = "<h1>Kristen's Projects</h1>"
        const projectInfo = productString
    
        displayPage(projectHeader, projectInfo)
    })

}

module.exports = displayProject

//instead of having the filter on the projects page, it might be better to have it on this page
},{"../displayPage":4,"./projectsController":10}],9:[function(require,module,exports){
const projectDOM = (itemArray) => {
    let projectList = ""
    itemArray.forEach(
        project => {
            projectList += `
            <article class="project">
                <h2 class="project-name">${project.name}</h2>
                <p class="project-date"><b>Date Completed:</b> ${project.date_completed}</p>
                <p class="project-tech"><b>Technologies Used:</b> ${project.technologies_used}</p>
                <p class="project-team"><b>Teammates (if applicable):</b> ${project.teammates}</p>
                <p class="project-description">${project.description}</p>
            </article>
            `

        }
    )
    return projectList
    
}

module.exports = projectDOM
},{}],10:[function(require,module,exports){
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

},{"../pageFilter":7,"./productsInfo":9}],11:[function(require,module,exports){
//this module will display resume information

const displayPage = require("../displayPage")
const resumeContent = require("./resumeController")

const displayResume = () => {
    
    resumeContent().then( resumeString => {
        const resumeHeader = "<h1>Job History for Kristen Norris</h1>"
        const resumeInfo = resumeString
    
        displayPage(resumeHeader, resumeInfo)
    })

}

module.exports = displayResume
},{"../displayPage":4,"./resumeController":12}],12:[function(require,module,exports){
//generates content for resume page

const resumeContent = () => {

    return $.ajax({
        "url": "https://personal-site-cf1b8.firebaseio.com/resume.json",
        "method": "GET"
    })
        .then(
            resumeDb => {
                let resumeString = ""
                
                resumeDb.forEach( job => {
                    resumeString += `
                    <article class="job">
                        <header>
                            <h2 class="company">${job.company} (${job.location})</h2>
                            <h2 class="title">${job.position}</h2>
                            <h3>${job.startDate} - ${job.endDate}</h3>
                        </header>
                        <section>
                            <p class="summary"><b>Summary: </b>${job.summary}</p>
                            <p class="responsibilities"><b>Responsibilities included: </b>${job.responsibilities}</p>
                        </section>
                    </article>
                    `
                })

                return resumeString
            }
        )

}

module.exports = resumeContent
},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2J1aWxkTmF2aWdhdGlvbi5qcyIsInNjcmlwdHMvY29udGFjdC9jb250YWN0Q29udHJvbGxlci5qcyIsInNjcmlwdHMvY29udGFjdC9kaXNwbGF5Q29udGFjdC5qcyIsInNjcmlwdHMvZGlzcGxheVBhZ2UuanMiLCJzY3JpcHRzL2RvbUVsZW1lbnRzLmpzIiwic2NyaXB0cy9tYWluLmpzIiwic2NyaXB0cy9wYWdlRmlsdGVyLmpzIiwic2NyaXB0cy9wcm9qZWN0cy9kaXNwbGF5UHJvamVjdHMuanMiLCJzY3JpcHRzL3Byb2plY3RzL3Byb2R1Y3RzSW5mby5qcyIsInNjcmlwdHMvcHJvamVjdHMvcHJvamVjdHNDb250cm9sbGVyLmpzIiwic2NyaXB0cy9yZXN1bWUvZGlzcGxheVJlc3VtZS5qcyIsInNjcmlwdHMvcmVzdW1lL3Jlc3VtZUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBuYXZpZ2F0aW9uID0gW1xuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiSG9tZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIlJlc3VtZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkNvbnRhY3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJQcm9qZWN0c1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkJsb2dcIlxuICAgIH1cbl1cblxuY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LWl0ZW1zXCIpO1xuXG5jb25zdCBuYXZMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG5cbm5hdmlnYXRpb24uZm9yRWFjaChcbiAgICBwYWdlID0+IHtcbiAgICAgICAgY29uc3QgbmF2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcbiAgICAgICAgbmF2RWwuY2xhc3NMaXN0LmFkZChcIm5hdkxpbmtcIilcbiAgICAgICAgbmF2RWwuaWQgPSBgbmF2XyR7cGFnZS5kaXNwbGF5fWBcblxuICAgICAgICBjb25zdCBuYXZMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcbiAgICAgICAgbmF2TGluay5ocmVmID0gXCIjXCJcbiAgICAgICAgbmF2TGluay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwYWdlLmRpc3BsYXkpKVxuXG4gICAgICAgIG5hdkVsLmFwcGVuZENoaWxkKG5hdkxpbmspXG4gICAgICAgIG5hdkxpc3QuYXBwZW5kQ2hpbGQobmF2RWwpXG4gICAgfVxuKVxubmF2RWxlbWVudC5hcHBlbmRDaGlsZChuYXZMaXN0KVxuXG5tb2R1bGUuZXhwb3J0cyA9IG51bGwiLCIvL2dlbmVyYXRlcyBjb250ZW50IGZvciBjb250YWN0IHBhZ2VcbmNvbnN0IGNvbnRhY3RDb250ZW50ID0gKCkgPT4ge1xuXG4gICAgcmV0dXJuICQuYWpheCh7IC8vbmVlZCB0byByZXR1cm4gYWpheCBmdW5jdGlvbiBzbyB0aGF0IGNvbnRhY3RDb250ZW50IGNhbiBhY2Nlc3MgdGhlIHN0cmluZyByZXR1cm5lZCBpbiAudGhlbigpXG4gICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9wZXJzb25hbC1zaXRlLWNmMWI4LmZpcmViYXNlaW8uY29tL2NvbnRhY3QuanNvblwiLFxuICAgICAgICBcIm1ldGhvZFwiOiBcIkdFVFwiXG4gICAgfSlcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICBjb250YWN0RGIgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb250YWN0U3RyaW5nID0gXCJcIjtcblxuICAgICAgICAgICAgICAgIC8vYnVpbGRzIGNvbnRhY3QgYnkgZW1haWwgc2VjdGlvblxuICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjb250YWN0XCI+U2VuZCBhbiBlbWFpbDo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9XCJzZW5kLWVtYWlsXCI+IFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZW1haWxcIj48YSBocmVmPVwibWFpbHRvOiR7Y29udGFjdERiLmVtYWlsfVwiPiR7Y29udGFjdERiLmVtYWlsfTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAvL2J1aWxkcyBjb250YWN0IHRocm91Z2ggc29jaWFsIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY29udGFjdFwiPkNvbm5lY3Qgb24gc29jaWFsIG1lZGlhOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBpZD1cInNvY2lhbC1tZWRpYVwiPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICAgICAgLy9pdGVyYXRlcyB0aHJvdWdoIGVhY2ggc29jaWFsIHNpdGVcbiAgICAgICAgICAgICAgICBjb250YWN0RGIuc29jaWFsLmZvckVhY2goc2l0ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJzb2NpYWxcIj48YSBocmVmPVwiJHtzaXRlLnVybH1cIj4ke3NpdGUuc2VydmljZX08L2E+PC9saT5cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIC8vY2xvc2luZyB0YWdzIGZvciB1bm9yZGVyZWQgbGlzdCBhbmQgY29udGFjdCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICBgXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFjdFN0cmluZ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29udGFjdENvbnRlbnQiLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSBjb250YWN0IGluZm9ybWF0aW9uXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCBjb250YWN0Q29uZW50ID0gcmVxdWlyZShcIi4vY29udGFjdENvbnRyb2xsZXJcIilcblxuY29uc3QgZGlzcGxheUNvbnRhY3QgPSAoKSA9PiB7XG4gICAgY29udGFjdENvbmVudCgpLnRoZW4oY29udGFjdFN0cmluZyA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWN0SGVhZGVyID0gXCI8aDE+Q29udGFjdCBNZTwvaDE+XCJcbiAgICAgICAgY29uc3QgY29udGFjdEluZm8gPSBjb250YWN0U3RyaW5nXG4gICAgICAgIFxuICAgICAgICBkaXNwbGF5UGFnZShjb250YWN0SGVhZGVyLCBjb250YWN0SW5mbykgLy9kaXNwbGF5UGFnZSBuZWVkcyB0byBiZSB3aXRoaW4gdGhlIGNvbnRhY3RDb250ZW50KCkudGhlbiBiZWNhdXNlIGl0IGlzIGRlcGVuZGVudCBvbiB0aGUgc3RyaW5nIHRoYXQgaXMgcmV0dXJuZWQgd2hlbiB0aGUgdGhlbiBmdW5jdGlvbiBydW5zXG4gICAgICAgIFxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheUNvbnRhY3QiLCJjb25zdCBkb21FbCA9IHJlcXVpcmUoXCIuL2RvbUVsZW1lbnRzXCIpXG5cbmNvbnN0IG91dHB1dEVsID0gZG9tRWwoKVxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IChwYWdlSGVhZGVyLCBwYWdlQ29udGVudCkgPT4ge1xuXG4gICAgY29uc3QgaGVhZGVyRWwgPSBvdXRwdXRFbC5oZWFkZXJcbiAgICBoZWFkZXJFbC5odG1sKHBhZ2VIZWFkZXIpIC8vYWRkcyB0aGUgcGFnZSBoZWFkZXIgdG8gdGhlIGRvbVxuXG4gICAgY29uc3QgY29udGVudEVsID0gb3V0cHV0RWwuY29udGVudFxuICAgIGNvbnRlbnRFbC5odG1sKHBhZ2VDb250ZW50KSAvL2FkZHMgdGhlIGNvbnRlbnQgb2YgcGFnZSB0byB0aGUgZG9tXG5cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlQYWdlIiwiLy90aGlzIG1vZHVsZSBjYXB0dXJlcyB0aGUgZG9tIGVsZW1lbnRzIHRoYXQgd2lsbCBiZSB3cml0dGVuIHRvIHdoZW4gZWFjaCBwYWdlIGlzIGNhbGxlZFxuXG5jb25zdCBkb21FbGVtZW50cyA9ICgpID0+IHtcbiAgICBjb25zdCBkb21PYmplY3QgPSBPYmplY3QuY3JlYXRlKG51bGwsIHtcbiAgICAgICAgXCJoZWFkZXJcIjoge1xuICAgICAgICAgICAgdmFsdWU6ICQoXCIjcGFnZS1oZWFkZXJcIilcbiAgICAgICAgfSxcbiAgICAgICAgXCJjb250ZW50XCI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAkKFwiI3BhZ2UtY29udGVudFwiKVxuICAgICAgICB9LFxuICAgICAgICBcImZpbHRlclwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogJChcIiNwYWdlLWZpbHRlclwiKVxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZG9tT2JqZWN0XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBkb21FbGVtZW50cyIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAvL2Rpc3BsYXkgbmF2aWdhdGlvblxuICAgIGNvbnN0IG5hdkJhciA9IHJlcXVpcmUoXCIuL2J1aWxkTmF2aWdhdGlvblwiKVxuICAgIFxuICAgIC8vZGlzcGxheSBjb250YWN0XG4gICAgY29uc3QgY29udGFjdFBhZ2UgPSByZXF1aXJlKFwiLi9jb250YWN0L2Rpc3BsYXlDb250YWN0XCIpXG4gICAgLy8gY29udGFjdFBhZ2UoKVxuXG4gICAgXG4gICAgLy9kaXNwbGF5IHByb2plY3RzXG4gICAgY29uc3QgcHJvamVjdFBhZ2UgPSByZXF1aXJlKFwiLi9wcm9qZWN0cy9kaXNwbGF5UHJvamVjdHNcIilcbiAgICBwcm9qZWN0UGFnZSgpXG5cbiAgICAvL2Rpc3BsYXkgcmVzdW1lXG4gICAgY29uc3QgcmVzdW1lUGFnZSA9IHJlcXVpcmUoXCIuL3Jlc3VtZS9kaXNwbGF5UmVzdW1lXCIpXG4gICAgLy8gcmVzdW1lUGFnZSgpXG4gICAgXG4gICAgLy9kaXNwbGF5IGJsb2dcblxuXG5cbn0pXG5cbiIsImNvbnN0IGRvbUVsID0gcmVxdWlyZShcIi4vZG9tRWxlbWVudHNcIilcblxuY29uc3QgZmlsdGVyUGFnZSA9IChkYkFycmF5LCBmdW5jKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0RWwgPSBkb21FbCgpXG4gICAgbGV0IHBhZ2VMb2FkID0gXCJcIlxuICAgIFxuICAgIGlmIChkYkFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy9jcmVhdGUgc2VhcmNoIGlucHV0XG4gICAgICAgIG91dHB1dEVsLmZpbHRlci5hcHBlbmQoYDxwPlNlYXJjaDogPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInBhZ2VGaWx0ZXJcIiBwbGFjZWhvbGRlcj1cInNlYXJjaCBhbGxcIj48L3A+YClcblxuICAgICAgICBjb25zdCBwYWdlU2VhcmNoID0gJChcImlucHV0W25hbWU9J3BhZ2VGaWx0ZXInXVwiKVswXVxuICAgICAgICAgICAgXG4gICAgICAgIHBhZ2VMb2FkID0gZnVuYyhkYkFycmF5KSAvL2luaXRpYWwgcGFnZSBsb2FkXG4gICAgICAgIFxuICAgICAgICBwYWdlU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBcImtleXVwXCIsXG4gICAgICAgICAgICBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICAgICAgLy9jb252ZXJ0IHdoYXQgaXMgYmVpbmcgZmlsdGVyZWQgdG8gbG93ZXJjYXNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJGaWx0ZXJTdHJpbmcgPSBldmVudC50YXJnZXQudmFsdWUudG9Mb3dlckNhc2UoKVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2VGaWx0ZXIgPSBkYkFycmF5LmZpbHRlcihmaWx0ZXJlZEl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkSXRlbS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModXNlckZpbHRlclN0cmluZykgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkSXRlbS5kZXNjcmlwdGlvbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHVzZXJGaWx0ZXJTdHJpbmcpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyXG5cbiAgICAgICAgICAgICAgICAgICAgaWYocGFnZUZpbHRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VMb2FkID0gXCI8aDM+U2VhcmNoIFJlc3VsdHMgTm90IEZvdW5kPC9oMz5cIlxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZUxvYWQgPSBmdW5jKHBhZ2VGaWx0ZXIpIC8vZGlzcGxheXMgZmlsdGVyZWQgaXRlbXNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG91dHB1dEVsLmNvbnRlbnQuaHRtbCA9IFwiIFwiXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VMb2FkPSBmdW5jKGRiQXJyYXkpIC8vZGlzcGxheXMgaW5pdGlhbCBwYWdlIGxvYWQgaWYgc2VsZWN0b3IgaGFzIGxlc3MgdGhhbiB0aHJlZSBjaGFyYWN0ZXJzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApXG5cbiAgICB9XG4gICAgcmV0dXJuIHBhZ2VMb2FkXG59XG5cbm1vZHVsZS5leHBvcnRzID0gIGZpbHRlclBhZ2UiLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSBwcm9qZWN0IGluZm9ybWF0aW9uXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCBwcm9qZWN0Q29udGVudCA9IHJlcXVpcmUoXCIuL3Byb2plY3RzQ29udHJvbGxlclwiKVxuXG5jb25zdCBkaXNwbGF5UHJvamVjdCA9ICgpID0+IHtcbiAgICBcbiAgICBwcm9qZWN0Q29udGVudCgpLnRoZW4oIHByb2R1Y3RTdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGVyID0gXCI8aDE+S3Jpc3RlbidzIFByb2plY3RzPC9oMT5cIlxuICAgICAgICBjb25zdCBwcm9qZWN0SW5mbyA9IHByb2R1Y3RTdHJpbmdcbiAgICBcbiAgICAgICAgZGlzcGxheVBhZ2UocHJvamVjdEhlYWRlciwgcHJvamVjdEluZm8pXG4gICAgfSlcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlQcm9qZWN0XG5cbi8vaW5zdGVhZCBvZiBoYXZpbmcgdGhlIGZpbHRlciBvbiB0aGUgcHJvamVjdHMgcGFnZSwgaXQgbWlnaHQgYmUgYmV0dGVyIHRvIGhhdmUgaXQgb24gdGhpcyBwYWdlIiwiY29uc3QgcHJvamVjdERPTSA9IChpdGVtQXJyYXkpID0+IHtcbiAgICBsZXQgcHJvamVjdExpc3QgPSBcIlwiXG4gICAgaXRlbUFycmF5LmZvckVhY2goXG4gICAgICAgIHByb2plY3QgPT4ge1xuICAgICAgICAgICAgcHJvamVjdExpc3QgKz0gYFxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwcm9qZWN0XCI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwicHJvamVjdC1uYW1lXCI+JHtwcm9qZWN0Lm5hbWV9PC9oMj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtZGF0ZVwiPjxiPkRhdGUgQ29tcGxldGVkOjwvYj4gJHtwcm9qZWN0LmRhdGVfY29tcGxldGVkfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtdGVjaFwiPjxiPlRlY2hub2xvZ2llcyBVc2VkOjwvYj4gJHtwcm9qZWN0LnRlY2hub2xvZ2llc191c2VkfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtdGVhbVwiPjxiPlRlYW1tYXRlcyAoaWYgYXBwbGljYWJsZSk6PC9iPiAke3Byb2plY3QudGVhbW1hdGVzfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtZGVzY3JpcHRpb25cIj4ke3Byb2plY3QuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgIH1cbiAgICApXG4gICAgcmV0dXJuIHByb2plY3RMaXN0XG4gICAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvamVjdERPTSIsIi8vZ2VuZXJhdGVzIGNvbnRlbnQgZm9yIHByb2plY3RzIHBhZ2VcbmNvbnN0IHByb2plY3RGaWx0ZXIgPSByZXF1aXJlKFwiLi4vcGFnZUZpbHRlclwiKVxuY29uc3QgcHJvamVjdERPTSA9IHJlcXVpcmUoXCIuL3Byb2R1Y3RzSW5mb1wiKVxuXG5jb25zdCBwcm9qZWN0c0NvbnRlbnQgPSAoKSA9PiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9wZXJzb25hbC1zaXRlLWNmMWI4LmZpcmViYXNlaW8uY29tL3Byb2plY3RzLmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIiAgXG4gICAgfSkudGhlbihcbiAgICAgICAgcHJvamVjdERiID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9qZWN0U3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgIFxuICAgIFxuICAgICAgICAgICAgLy8gYnVpbGRzIHByb2plY3Qgc2VjdGlvblxuICAgICAgICAgICAgcHJvamVjdFN0cmluZyArPSBgXG4gICAgICAgICAgICA8c2VjdGlvbiBpZD1cInByb2plY3RzXCI+XG4gICAgICAgICAgICBgXG5cbiAgICAgICAgICAgIC8vaXRlcmF0ZXMgdGhyb3VnaCBwcm9qZWN0c1xuICAgICAgICAgICAgLy8gY29uc3QgcEluZm8gPSBwcm9qZWN0RE9NKHByb2plY3REYilcbiAgICAgICAgICAgIGNvbnN0IHBJbmZvID0gcHJvamVjdEZpbHRlcihwcm9qZWN0RGIsIHByb2plY3RET00pXG4gICAgICAgICAgICBkZWJ1Z2dlclxuXG4gICAgICAgICAgICBwcm9qZWN0U3RyaW5nICs9IHBJbmZvXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vY2xvc2luZyB0YWcgZm9yIHByb2plY3Qgc2VjdGlvblxuICAgICAgICAgICAgcHJvamVjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdFN0cmluZ1xuICAgICAgICB9XG4gICAgKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvamVjdHNDb250ZW50XG4iLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSByZXN1bWUgaW5mb3JtYXRpb25cblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IHJlc3VtZUNvbnRlbnQgPSByZXF1aXJlKFwiLi9yZXN1bWVDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlSZXN1bWUgPSAoKSA9PiB7XG4gICAgXG4gICAgcmVzdW1lQ29udGVudCgpLnRoZW4oIHJlc3VtZVN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VtZUhlYWRlciA9IFwiPGgxPkpvYiBIaXN0b3J5IGZvciBLcmlzdGVuIE5vcnJpczwvaDE+XCJcbiAgICAgICAgY29uc3QgcmVzdW1lSW5mbyA9IHJlc3VtZVN0cmluZ1xuICAgIFxuICAgICAgICBkaXNwbGF5UGFnZShyZXN1bWVIZWFkZXIsIHJlc3VtZUluZm8pXG4gICAgfSlcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlSZXN1bWUiLCIvL2dlbmVyYXRlcyBjb250ZW50IGZvciByZXN1bWUgcGFnZVxuXG5jb25zdCByZXN1bWVDb250ZW50ID0gKCkgPT4ge1xuXG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9wZXJzb25hbC1zaXRlLWNmMWI4LmZpcmViYXNlaW8uY29tL3Jlc3VtZS5qc29uXCIsXG4gICAgICAgIFwibWV0aG9kXCI6IFwiR0VUXCJcbiAgICB9KVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAgIHJlc3VtZURiID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdW1lU3RyaW5nID0gXCJcIlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJlc3VtZURiLmZvckVhY2goIGpvYiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VtZVN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwiam9iXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cImNvbXBhbnlcIj4ke2pvYi5jb21wYW55fSAoJHtqb2IubG9jYXRpb259KTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj4ke2pvYi5wb3NpdGlvbn08L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz4ke2pvYi5zdGFydERhdGV9IC0gJHtqb2IuZW5kRGF0ZX08L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN1bW1hcnlcIj48Yj5TdW1tYXJ5OiA8L2I+JHtqb2Iuc3VtbWFyeX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJyZXNwb25zaWJpbGl0aWVzXCI+PGI+UmVzcG9uc2liaWxpdGllcyBpbmNsdWRlZDogPC9iPiR7am9iLnJlc3BvbnNpYmlsaXRpZXN9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VtZVN0cmluZ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXN1bWVDb250ZW50Il19
