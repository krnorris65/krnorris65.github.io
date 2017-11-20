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

const filterPage = (dbArray, func, selector) => {
    const outputEl = domEl()
    let pageLoad = ""
    
    if (dbArray.length > 0) {
        
        pageLoad = func(dbArray) //initial page load
        
        selector.addEventListener(
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2J1aWxkTmF2aWdhdGlvbi5qcyIsInNjcmlwdHMvY29udGFjdC9jb250YWN0Q29udHJvbGxlci5qcyIsInNjcmlwdHMvY29udGFjdC9kaXNwbGF5Q29udGFjdC5qcyIsInNjcmlwdHMvZGlzcGxheVBhZ2UuanMiLCJzY3JpcHRzL2RvbUVsZW1lbnRzLmpzIiwic2NyaXB0cy9tYWluLmpzIiwic2NyaXB0cy9wYWdlRmlsdGVyLmpzIiwic2NyaXB0cy9wcm9qZWN0cy9kaXNwbGF5UHJvamVjdHMuanMiLCJzY3JpcHRzL3Byb2plY3RzL3Byb2R1Y3RzSW5mby5qcyIsInNjcmlwdHMvcHJvamVjdHMvcHJvamVjdHNDb250cm9sbGVyLmpzIiwic2NyaXB0cy9yZXN1bWUvZGlzcGxheVJlc3VtZS5qcyIsInNjcmlwdHMvcmVzdW1lL3Jlc3VtZUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgbmF2aWdhdGlvbiA9IFtcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkhvbWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJSZXN1bWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJDb250YWN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiUHJvamVjdHNcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJCbG9nXCJcbiAgICB9XG5dXG5cbmNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1pdGVtc1wiKTtcblxuY29uc3QgbmF2TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuXG5uYXZpZ2F0aW9uLmZvckVhY2goXG4gICAgcGFnZSA9PiB7XG4gICAgICAgIGNvbnN0IG5hdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXG4gICAgICAgIG5hdkVsLmNsYXNzTGlzdC5hZGQoXCJuYXZMaW5rXCIpXG4gICAgICAgIG5hdkVsLmlkID0gYG5hdl8ke3BhZ2UuZGlzcGxheX1gXG5cbiAgICAgICAgY29uc3QgbmF2TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXG4gICAgICAgIG5hdkxpbmsuaHJlZiA9IFwiI1wiXG4gICAgICAgIG5hdkxpbmsuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocGFnZS5kaXNwbGF5KSlcblxuICAgICAgICBuYXZFbC5hcHBlbmRDaGlsZChuYXZMaW5rKVxuICAgICAgICBuYXZMaXN0LmFwcGVuZENoaWxkKG5hdkVsKVxuICAgIH1cbilcbm5hdkVsZW1lbnQuYXBwZW5kQ2hpbGQobmF2TGlzdClcblxubW9kdWxlLmV4cG9ydHMgPSBudWxsIiwiLy9nZW5lcmF0ZXMgY29udGVudCBmb3IgY29udGFjdCBwYWdlXG5jb25zdCBjb250YWN0Q29udGVudCA9ICgpID0+IHtcblxuICAgIHJldHVybiAkLmFqYXgoeyAvL25lZWQgdG8gcmV0dXJuIGFqYXggZnVuY3Rpb24gc28gdGhhdCBjb250YWN0Q29udGVudCBjYW4gYWNjZXNzIHRoZSBzdHJpbmcgcmV0dXJuZWQgaW4gLnRoZW4oKVxuICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vcGVyc29uYWwtc2l0ZS1jZjFiOC5maXJlYmFzZWlvLmNvbS9jb250YWN0Lmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIlxuICAgIH0pXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgICAgY29udGFjdERiID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGFjdFN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAvL2J1aWxkcyBjb250YWN0IGJ5IGVtYWlsIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY29udGFjdFwiPlNlbmQgYW4gZW1haWw6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPVwic2VuZC1lbWFpbFwiPiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImVtYWlsXCI+PGEgaHJlZj1cIm1haWx0bzoke2NvbnRhY3REYi5lbWFpbH1cIj4ke2NvbnRhY3REYi5lbWFpbH08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgLy9idWlsZHMgY29udGFjdCB0aHJvdWdoIHNvY2lhbCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNvbnRhY3RcIj5Db25uZWN0IG9uIHNvY2lhbCBtZWRpYTo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9XCJzb2NpYWwtbWVkaWFcIj5cbiAgICAgICAgICAgIGBcblxuICAgICAgICAgICAgICAgIC8vaXRlcmF0ZXMgdGhyb3VnaCBlYWNoIHNvY2lhbCBzaXRlXG4gICAgICAgICAgICAgICAgY29udGFjdERiLnNvY2lhbC5mb3JFYWNoKHNpdGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwic29jaWFsXCI+PGEgaHJlZj1cIiR7c2l0ZS51cmx9XCI+JHtzaXRlLnNlcnZpY2V9PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAvL2Nsb3NpbmcgdGFncyBmb3IgdW5vcmRlcmVkIGxpc3QgYW5kIGNvbnRhY3Qgc2VjdGlvblxuICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhY3RTdHJpbmdcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRhY3RDb250ZW50IiwiLy90aGlzIG1vZHVsZSB3aWxsIGRpc3BsYXkgY29udGFjdCBpbmZvcm1hdGlvblxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IHJlcXVpcmUoXCIuLi9kaXNwbGF5UGFnZVwiKVxuY29uc3QgY29udGFjdENvbmVudCA9IHJlcXVpcmUoXCIuL2NvbnRhY3RDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlDb250YWN0ID0gKCkgPT4ge1xuICAgIGNvbnRhY3RDb25lbnQoKS50aGVuKGNvbnRhY3RTdHJpbmcgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY29udGFjdEhlYWRlciA9IFwiPGgxPkNvbnRhY3QgTWU8L2gxPlwiXG4gICAgICAgIGNvbnN0IGNvbnRhY3RJbmZvID0gY29udGFjdFN0cmluZ1xuICAgICAgICBcbiAgICAgICAgZGlzcGxheVBhZ2UoY29udGFjdEhlYWRlciwgY29udGFjdEluZm8pIC8vZGlzcGxheVBhZ2UgbmVlZHMgdG8gYmUgd2l0aGluIHRoZSBjb250YWN0Q29udGVudCgpLnRoZW4gYmVjYXVzZSBpdCBpcyBkZXBlbmRlbnQgb24gdGhlIHN0cmluZyB0aGF0IGlzIHJldHVybmVkIHdoZW4gdGhlIHRoZW4gZnVuY3Rpb24gcnVuc1xuICAgICAgICBcbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlDb250YWN0IiwiY29uc3QgZG9tRWwgPSByZXF1aXJlKFwiLi9kb21FbGVtZW50c1wiKVxuXG5jb25zdCBvdXRwdXRFbCA9IGRvbUVsKClcblxuY29uc3QgZGlzcGxheVBhZ2UgPSAocGFnZUhlYWRlciwgcGFnZUNvbnRlbnQpID0+IHtcblxuICAgIGNvbnN0IGhlYWRlckVsID0gb3V0cHV0RWwuaGVhZGVyXG4gICAgaGVhZGVyRWwuaHRtbChwYWdlSGVhZGVyKSAvL2FkZHMgdGhlIHBhZ2UgaGVhZGVyIHRvIHRoZSBkb21cblxuICAgIGNvbnN0IGNvbnRlbnRFbCA9IG91dHB1dEVsLmNvbnRlbnRcbiAgICBjb250ZW50RWwuaHRtbChwYWdlQ29udGVudCkgLy9hZGRzIHRoZSBjb250ZW50IG9mIHBhZ2UgdG8gdGhlIGRvbVxuXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5UGFnZSIsIi8vdGhpcyBtb2R1bGUgY2FwdHVyZXMgdGhlIGRvbSBlbGVtZW50cyB0aGF0IHdpbGwgYmUgd3JpdHRlbiB0byB3aGVuIGVhY2ggcGFnZSBpcyBjYWxsZWRcblxuY29uc3QgZG9tRWxlbWVudHMgPSAoKSA9PiB7XG4gICAgY29uc3QgZG9tT2JqZWN0ID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG4gICAgICAgIFwiaGVhZGVyXCI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAkKFwiI3BhZ2UtaGVhZGVyXCIpXG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGVudFwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogJChcIiNwYWdlLWNvbnRlbnRcIilcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGRvbU9iamVjdFxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZG9tRWxlbWVudHMiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgLy9kaXNwbGF5IG5hdmlnYXRpb25cbiAgICBjb25zdCBuYXZCYXIgPSByZXF1aXJlKFwiLi9idWlsZE5hdmlnYXRpb25cIilcbiAgICBcbiAgICAvL2Rpc3BsYXkgY29udGFjdFxuICAgIGNvbnN0IGNvbnRhY3RQYWdlID0gcmVxdWlyZShcIi4vY29udGFjdC9kaXNwbGF5Q29udGFjdFwiKVxuICAgIC8vIGNvbnRhY3RQYWdlKClcblxuICAgIFxuICAgIC8vZGlzcGxheSBwcm9qZWN0c1xuICAgIGNvbnN0IHByb2plY3RQYWdlID0gcmVxdWlyZShcIi4vcHJvamVjdHMvZGlzcGxheVByb2plY3RzXCIpXG4gICAgcHJvamVjdFBhZ2UoKVxuXG4gICAgLy9kaXNwbGF5IHJlc3VtZVxuICAgIGNvbnN0IHJlc3VtZVBhZ2UgPSByZXF1aXJlKFwiLi9yZXN1bWUvZGlzcGxheVJlc3VtZVwiKVxuICAgIC8vIHJlc3VtZVBhZ2UoKVxuICAgIFxuICAgIC8vZGlzcGxheSBibG9nXG5cblxuXG59KVxuXG4iLCJjb25zdCBkb21FbCA9IHJlcXVpcmUoXCIuL2RvbUVsZW1lbnRzXCIpXG5cbmNvbnN0IGZpbHRlclBhZ2UgPSAoZGJBcnJheSwgZnVuYywgc2VsZWN0b3IpID0+IHtcbiAgICBjb25zdCBvdXRwdXRFbCA9IGRvbUVsKClcbiAgICBsZXQgcGFnZUxvYWQgPSBcIlwiXG4gICAgXG4gICAgaWYgKGRiQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICBcbiAgICAgICAgcGFnZUxvYWQgPSBmdW5jKGRiQXJyYXkpIC8vaW5pdGlhbCBwYWdlIGxvYWRcbiAgICAgICAgXG4gICAgICAgIHNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBcImtleXVwXCIsXG4gICAgICAgICAgICBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICAgICAgLy9jb252ZXJ0IHdoYXQgaXMgYmVpbmcgZmlsdGVyZWQgdG8gbG93ZXJjYXNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJGaWx0ZXJTdHJpbmcgPSBldmVudC50YXJnZXQudmFsdWUudG9Mb3dlckNhc2UoKVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2VGaWx0ZXIgPSBkYkFycmF5LmZpbHRlcihmaWx0ZXJlZEl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkSXRlbS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModXNlckZpbHRlclN0cmluZykgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkSXRlbS5kZXNjcmlwdGlvbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHVzZXJGaWx0ZXJTdHJpbmcpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyXG5cbiAgICAgICAgICAgICAgICAgICAgaWYocGFnZUZpbHRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VMb2FkID0gXCI8aDM+U2VhcmNoIFJlc3VsdHMgTm90IEZvdW5kPC9oMz5cIlxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZUxvYWQgPSBmdW5jKHBhZ2VGaWx0ZXIpIC8vZGlzcGxheXMgZmlsdGVyZWQgaXRlbXNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG91dHB1dEVsLmNvbnRlbnQuaHRtbCA9IFwiIFwiXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VMb2FkPSBmdW5jKGRiQXJyYXkpIC8vZGlzcGxheXMgaW5pdGlhbCBwYWdlIGxvYWQgaWYgc2VsZWN0b3IgaGFzIGxlc3MgdGhhbiB0aHJlZSBjaGFyYWN0ZXJzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApXG5cbiAgICB9XG4gICAgcmV0dXJuIHBhZ2VMb2FkXG59XG5cbm1vZHVsZS5leHBvcnRzID0gIGZpbHRlclBhZ2UiLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSBwcm9qZWN0IGluZm9ybWF0aW9uXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCBwcm9qZWN0Q29udGVudCA9IHJlcXVpcmUoXCIuL3Byb2plY3RzQ29udHJvbGxlclwiKVxuXG5jb25zdCBkaXNwbGF5UHJvamVjdCA9ICgpID0+IHtcbiAgICBcbiAgICBwcm9qZWN0Q29udGVudCgpLnRoZW4oIHByb2R1Y3RTdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGVyID0gXCI8aDE+S3Jpc3RlbidzIFByb2plY3RzPC9oMT5cIlxuICAgICAgICBjb25zdCBwcm9qZWN0SW5mbyA9IHByb2R1Y3RTdHJpbmdcbiAgICBcbiAgICAgICAgZGlzcGxheVBhZ2UocHJvamVjdEhlYWRlciwgcHJvamVjdEluZm8pXG4gICAgfSlcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlQcm9qZWN0XG5cbi8vaW5zdGVhZCBvZiBoYXZpbmcgdGhlIGZpbHRlciBvbiB0aGUgcHJvamVjdHMgcGFnZSwgaXQgbWlnaHQgYmUgYmV0dGVyIHRvIGhhdmUgaXQgb24gdGhpcyBwYWdlIiwiY29uc3QgcHJvamVjdERPTSA9IChpdGVtQXJyYXkpID0+IHtcbiAgICBsZXQgcHJvamVjdExpc3QgPSBcIlwiXG4gICAgaXRlbUFycmF5LmZvckVhY2goXG4gICAgICAgIHByb2plY3QgPT4ge1xuICAgICAgICAgICAgcHJvamVjdExpc3QgKz0gYFxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwcm9qZWN0XCI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwicHJvamVjdC1uYW1lXCI+JHtwcm9qZWN0Lm5hbWV9PC9oMj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtZGF0ZVwiPjxiPkRhdGUgQ29tcGxldGVkOjwvYj4gJHtwcm9qZWN0LmRhdGVfY29tcGxldGVkfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtdGVjaFwiPjxiPlRlY2hub2xvZ2llcyBVc2VkOjwvYj4gJHtwcm9qZWN0LnRlY2hub2xvZ2llc191c2VkfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtdGVhbVwiPjxiPlRlYW1tYXRlcyAoaWYgYXBwbGljYWJsZSk6PC9iPiAke3Byb2plY3QudGVhbW1hdGVzfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtZGVzY3JpcHRpb25cIj4ke3Byb2plY3QuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgIH1cbiAgICApXG4gICAgcmV0dXJuIHByb2plY3RMaXN0XG4gICAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvamVjdERPTSIsIi8vZ2VuZXJhdGVzIGNvbnRlbnQgZm9yIHByb2plY3RzIHBhZ2VcbmNvbnN0IHByb2plY3RGaWx0ZXIgPSByZXF1aXJlKFwiLi4vcGFnZUZpbHRlclwiKVxuY29uc3QgcHJvamVjdERPTSA9IHJlcXVpcmUoXCIuL3Byb2R1Y3RzSW5mb1wiKVxuXG5jb25zdCBwcm9qZWN0c0NvbnRlbnQgPSAoKSA9PiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9wZXJzb25hbC1zaXRlLWNmMWI4LmZpcmViYXNlaW8uY29tL3Byb2plY3RzLmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIiAgXG4gICAgfSkudGhlbihcbiAgICAgICAgcHJvamVjdERiID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9qZWN0U3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9idWlsZHMgc2VhcmNoIGlucHV0IG9uIERPTVxuICAgICAgICAgICAgLy8gcHJvamVjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAvLyA8cD5TZWFyY2g6IDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJwcm9qZWN0c0ZpbHRlclwiIHBsYWNlaG9sZGVyPVwic2VhcmNoIGFsbCBwcm9qZWN0c1wiPjwvcD5cbiAgICAgICAgICAgIC8vIGBcblxuICAgICAgICAgICAgY29uc3Qgc2VhcmNoQmFyID0gJChcIiNwYWdlLWZpbHRlclwiKS5hcHBlbmQoYDxwPlNlYXJjaDogPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInByb2plY3RzRmlsdGVyXCIgcGxhY2Vob2xkZXI9XCJzZWFyY2ggYWxsIHByb2plY3RzXCI+PC9wPmApXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGJ1aWxkcyBwcm9qZWN0IHNlY3Rpb25cbiAgICAgICAgICAgIHByb2plY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgPHNlY3Rpb24gaWQ9XCJwcm9qZWN0c1wiPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICBjb25zdCBwU2VhcmNoID0gJChcImlucHV0W25hbWU9J3Byb2plY3RzRmlsdGVyJ11cIilbMF1cblxuICAgICAgICAgICAgLy9pdGVyYXRlcyB0aHJvdWdoIHByb2plY3RzXG4gICAgICAgICAgICAvLyBjb25zdCBwSW5mbyA9IHByb2plY3RET00ocHJvamVjdERiKVxuICAgICAgICAgICAgY29uc3QgcEluZm8gPSBwcm9qZWN0RmlsdGVyKHByb2plY3REYiwgcHJvamVjdERPTSwgcFNlYXJjaClcbiAgICAgICAgICAgIGRlYnVnZ2VyXG5cbiAgICAgICAgICAgIHByb2plY3RTdHJpbmcgKz0gcEluZm9cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9jbG9zaW5nIHRhZyBmb3IgcHJvamVjdCBzZWN0aW9uXG4gICAgICAgICAgICBwcm9qZWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICBgXG5cbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0U3RyaW5nXG4gICAgICAgIH1cbiAgICApXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcm9qZWN0c0NvbnRlbnRcbiIsIi8vdGhpcyBtb2R1bGUgd2lsbCBkaXNwbGF5IHJlc3VtZSBpbmZvcm1hdGlvblxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IHJlcXVpcmUoXCIuLi9kaXNwbGF5UGFnZVwiKVxuY29uc3QgcmVzdW1lQ29udGVudCA9IHJlcXVpcmUoXCIuL3Jlc3VtZUNvbnRyb2xsZXJcIilcblxuY29uc3QgZGlzcGxheVJlc3VtZSA9ICgpID0+IHtcbiAgICBcbiAgICByZXN1bWVDb250ZW50KCkudGhlbiggcmVzdW1lU3RyaW5nID0+IHtcbiAgICAgICAgY29uc3QgcmVzdW1lSGVhZGVyID0gXCI8aDE+Sm9iIEhpc3RvcnkgZm9yIEtyaXN0ZW4gTm9ycmlzPC9oMT5cIlxuICAgICAgICBjb25zdCByZXN1bWVJbmZvID0gcmVzdW1lU3RyaW5nXG4gICAgXG4gICAgICAgIGRpc3BsYXlQYWdlKHJlc3VtZUhlYWRlciwgcmVzdW1lSW5mbylcbiAgICB9KVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheVJlc3VtZSIsIi8vZ2VuZXJhdGVzIGNvbnRlbnQgZm9yIHJlc3VtZSBwYWdlXG5cbmNvbnN0IHJlc3VtZUNvbnRlbnQgPSAoKSA9PiB7XG5cbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL3BlcnNvbmFsLXNpdGUtY2YxYjguZmlyZWJhc2Vpby5jb20vcmVzdW1lLmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIlxuICAgIH0pXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgICAgcmVzdW1lRGIgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bWVTdHJpbmcgPSBcIlwiXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVzdW1lRGIuZm9yRWFjaCggam9iID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdW1lU3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJqb2JcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwiY29tcGFueVwiPiR7am9iLmNvbXBhbnl9ICgke2pvYi5sb2NhdGlvbn0pPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPiR7am9iLnBvc2l0aW9ufTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzPiR7am9iLnN0YXJ0RGF0ZX0gLSAke2pvYi5lbmREYXRlfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic3VtbWFyeVwiPjxiPlN1bW1hcnk6IDwvYj4ke2pvYi5zdW1tYXJ5fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInJlc3BvbnNpYmlsaXRpZXNcIj48Yj5SZXNwb25zaWJpbGl0aWVzIGluY2x1ZGVkOiA8L2I+JHtqb2IucmVzcG9uc2liaWxpdGllc308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdW1lU3RyaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgIClcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3VtZUNvbnRlbnQiXX0=
