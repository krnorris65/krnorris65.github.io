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
            value: $("#page-header") //gets header section
        },
        "content": {
            value: $("#page-content") //gets content section
        },
        "filter": {
            value: $("#page-filter") //section to add filter when pageFilter is added to a page
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

//filterPage function takes two parameters: the database in which you want to filter through and the function you want executed on the database
const filterPage = (dbArray, func) => {
    const outputEl = domEl()
    let pageLoad = ""
    
    if (dbArray.length > 0) {
        //create search input
        outputEl.filter.append("<p>Search: <input type=\"text\" name=\"pageFilter\" placeholder=\"search all\"></p>")
        
        //targets input to add an eventListener
        const pageSearch = $("input[name='pageFilter']")[0]
            
        pageLoad = func(dbArray) //initial page load of items
        
        pageSearch.addEventListener(
            "keyup",
            event => {
                if(event.target.value.length >= 3) {
                    //convert what is being filtered to lowercase
                    const userFilterString = event.target.value.toLowerCase()

                    //looks through all the keys of each object to see if the filtered string appears anywhere, if so it returns the item
                    const pageFilter = dbArray.filter(filteredItem => {
                        for(key in filteredItem) {
                            const item = filteredItem[key]

                            if(item.toLowerCase().includes(userFilterString)) {
                                return item
                            }
                        }
                    })

                
                    //output.content.html(pageLoad) repopulates the content area when user types in search bar
                    if(pageFilter.length === 0) {
                        pageLoad = "<h3>Search Results Not Found</h3>"
                        outputEl.content.html(pageLoad) 
                    } else {
                        pageLoad = func(pageFilter) //displays filtered items
                        outputEl.content.html(pageLoad)
                    }
                } else {
                    pageLoad= func(dbArray) //displays initial page load if selector has less than three characters
                    outputEl.content.html(pageLoad)
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

},{"../displayPage":4,"./projectsController":10}],9:[function(require,module,exports){
const projectDOM = (itemArray) => {
    let projectString = ""
    // builds project section
    projectString += `
    <section id="projects">
    `
    //iterate through each project and add to projectString
    itemArray.forEach(
        project => {
            projectString += `
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

    //closing tag for project section
    projectString += `
    </section>
`
    return projectString
    
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
            
            return projectFilter(projectDb, projectDOM)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2J1aWxkTmF2aWdhdGlvbi5qcyIsInNjcmlwdHMvY29udGFjdC9jb250YWN0Q29udHJvbGxlci5qcyIsInNjcmlwdHMvY29udGFjdC9kaXNwbGF5Q29udGFjdC5qcyIsInNjcmlwdHMvZGlzcGxheVBhZ2UuanMiLCJzY3JpcHRzL2RvbUVsZW1lbnRzLmpzIiwic2NyaXB0cy9tYWluLmpzIiwic2NyaXB0cy9wYWdlRmlsdGVyLmpzIiwic2NyaXB0cy9wcm9qZWN0cy9kaXNwbGF5UHJvamVjdHMuanMiLCJzY3JpcHRzL3Byb2plY3RzL3Byb2R1Y3RzSW5mby5qcyIsInNjcmlwdHMvcHJvamVjdHMvcHJvamVjdHNDb250cm9sbGVyLmpzIiwic2NyaXB0cy9yZXN1bWUvZGlzcGxheVJlc3VtZS5qcyIsInNjcmlwdHMvcmVzdW1lL3Jlc3VtZUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IG5hdmlnYXRpb24gPSBbXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJIb21lXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiUmVzdW1lXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiQ29udGFjdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIlByb2plY3RzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiQmxvZ1wiXG4gICAgfVxuXVxuXG5jb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtaXRlbXNcIik7XG5cbmNvbnN0IG5hdkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcblxubmF2aWdhdGlvbi5mb3JFYWNoKFxuICAgIHBhZ2UgPT4ge1xuICAgICAgICBjb25zdCBuYXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKVxuICAgICAgICBuYXZFbC5jbGFzc0xpc3QuYWRkKFwibmF2TGlua1wiKVxuICAgICAgICBuYXZFbC5pZCA9IGBuYXZfJHtwYWdlLmRpc3BsYXl9YFxuXG4gICAgICAgIGNvbnN0IG5hdkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKVxuICAgICAgICBuYXZMaW5rLmhyZWYgPSBcIiNcIlxuICAgICAgICBuYXZMaW5rLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBhZ2UuZGlzcGxheSkpXG5cbiAgICAgICAgbmF2RWwuYXBwZW5kQ2hpbGQobmF2TGluaylcbiAgICAgICAgbmF2TGlzdC5hcHBlbmRDaGlsZChuYXZFbClcbiAgICB9XG4pXG5uYXZFbGVtZW50LmFwcGVuZENoaWxkKG5hdkxpc3QpXG5cbm1vZHVsZS5leHBvcnRzID0gbnVsbCIsIi8vZ2VuZXJhdGVzIGNvbnRlbnQgZm9yIGNvbnRhY3QgcGFnZVxuY29uc3QgY29udGFjdENvbnRlbnQgPSAoKSA9PiB7XG5cbiAgICByZXR1cm4gJC5hamF4KHsgLy9uZWVkIHRvIHJldHVybiBhamF4IGZ1bmN0aW9uIHNvIHRoYXQgY29udGFjdENvbnRlbnQgY2FuIGFjY2VzcyB0aGUgc3RyaW5nIHJldHVybmVkIGluIC50aGVuKClcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL3BlcnNvbmFsLXNpdGUtY2YxYjguZmlyZWJhc2Vpby5jb20vY29udGFjdC5qc29uXCIsXG4gICAgICAgIFwibWV0aG9kXCI6IFwiR0VUXCJcbiAgICB9KVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAgIGNvbnRhY3REYiA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRhY3RTdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgLy9idWlsZHMgY29udGFjdCBieSBlbWFpbCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNvbnRhY3RcIj5TZW5kIGFuIGVtYWlsOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBpZD1cInNlbmQtZW1haWxcIj4gXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJlbWFpbFwiPjxhIGhyZWY9XCJtYWlsdG86JHtjb250YWN0RGIuZW1haWx9XCI+JHtjb250YWN0RGIuZW1haWx9PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIC8vYnVpbGRzIGNvbnRhY3QgdGhyb3VnaCBzb2NpYWwgc2VjdGlvblxuICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjb250YWN0XCI+Q29ubmVjdCBvbiBzb2NpYWwgbWVkaWE6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPVwic29jaWFsLW1lZGlhXCI+XG4gICAgICAgICAgICBgXG5cbiAgICAgICAgICAgICAgICAvL2l0ZXJhdGVzIHRocm91Z2ggZWFjaCBzb2NpYWwgc2l0ZVxuICAgICAgICAgICAgICAgIGNvbnRhY3REYi5zb2NpYWwuZm9yRWFjaChzaXRlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInNvY2lhbFwiPjxhIGhyZWY9XCIke3NpdGUudXJsfVwiPiR7c2l0ZS5zZXJ2aWNlfTwvYT48L2xpPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgLy9jbG9zaW5nIHRhZ3MgZm9yIHVub3JkZXJlZCBsaXN0IGFuZCBjb250YWN0IHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIGBcblxuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWN0U3RyaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb250YWN0Q29udGVudCIsIi8vdGhpcyBtb2R1bGUgd2lsbCBkaXNwbGF5IGNvbnRhY3QgaW5mb3JtYXRpb25cblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IGNvbnRhY3RDb25lbnQgPSByZXF1aXJlKFwiLi9jb250YWN0Q29udHJvbGxlclwiKVxuXG5jb25zdCBkaXNwbGF5Q29udGFjdCA9ICgpID0+IHtcbiAgICBjb250YWN0Q29uZW50KCkudGhlbihjb250YWN0U3RyaW5nID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbnRhY3RIZWFkZXIgPSBcIjxoMT5Db250YWN0IE1lPC9oMT5cIlxuICAgICAgICBjb25zdCBjb250YWN0SW5mbyA9IGNvbnRhY3RTdHJpbmdcbiAgICAgICAgXG4gICAgICAgIGRpc3BsYXlQYWdlKGNvbnRhY3RIZWFkZXIsIGNvbnRhY3RJbmZvKSAvL2Rpc3BsYXlQYWdlIG5lZWRzIHRvIGJlIHdpdGhpbiB0aGUgY29udGFjdENvbnRlbnQoKS50aGVuIGJlY2F1c2UgaXQgaXMgZGVwZW5kZW50IG9uIHRoZSBzdHJpbmcgdGhhdCBpcyByZXR1cm5lZCB3aGVuIHRoZSB0aGVuIGZ1bmN0aW9uIHJ1bnNcbiAgICAgICAgXG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5Q29udGFjdCIsImNvbnN0IGRvbUVsID0gcmVxdWlyZShcIi4vZG9tRWxlbWVudHNcIilcblxuY29uc3Qgb3V0cHV0RWwgPSBkb21FbCgpXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gKHBhZ2VIZWFkZXIsIHBhZ2VDb250ZW50KSA9PiB7XG5cbiAgICBjb25zdCBoZWFkZXJFbCA9IG91dHB1dEVsLmhlYWRlclxuICAgIGhlYWRlckVsLmh0bWwocGFnZUhlYWRlcikgLy9hZGRzIHRoZSBwYWdlIGhlYWRlciB0byB0aGUgZG9tXG5cbiAgICBjb25zdCBjb250ZW50RWwgPSBvdXRwdXRFbC5jb250ZW50XG4gICAgY29udGVudEVsLmh0bWwocGFnZUNvbnRlbnQpIC8vYWRkcyB0aGUgY29udGVudCBvZiBwYWdlIHRvIHRoZSBkb21cblxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheVBhZ2UiLCIvL3RoaXMgbW9kdWxlIGNhcHR1cmVzIHRoZSBkb20gZWxlbWVudHMgdGhhdCB3aWxsIGJlIHdyaXR0ZW4gdG8gd2hlbiBlYWNoIHBhZ2UgaXMgY2FsbGVkXG5cbmNvbnN0IGRvbUVsZW1lbnRzID0gKCkgPT4ge1xuICAgIGNvbnN0IGRvbU9iamVjdCA9IE9iamVjdC5jcmVhdGUobnVsbCwge1xuICAgICAgICBcImhlYWRlclwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogJChcIiNwYWdlLWhlYWRlclwiKSAvL2dldHMgaGVhZGVyIHNlY3Rpb25cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb250ZW50XCI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAkKFwiI3BhZ2UtY29udGVudFwiKSAvL2dldHMgY29udGVudCBzZWN0aW9uXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAkKFwiI3BhZ2UtZmlsdGVyXCIpIC8vc2VjdGlvbiB0byBhZGQgZmlsdGVyIHdoZW4gcGFnZUZpbHRlciBpcyBhZGRlZCB0byBhIHBhZ2VcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGRvbU9iamVjdFxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZG9tRWxlbWVudHMiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgLy9kaXNwbGF5IG5hdmlnYXRpb25cbiAgICBjb25zdCBuYXZCYXIgPSByZXF1aXJlKFwiLi9idWlsZE5hdmlnYXRpb25cIilcbiAgICBcbiAgICAvL2Rpc3BsYXkgY29udGFjdFxuICAgIGNvbnN0IGNvbnRhY3RQYWdlID0gcmVxdWlyZShcIi4vY29udGFjdC9kaXNwbGF5Q29udGFjdFwiKVxuICAgIC8vIGNvbnRhY3RQYWdlKClcblxuICAgIFxuICAgIC8vZGlzcGxheSBwcm9qZWN0c1xuICAgIGNvbnN0IHByb2plY3RQYWdlID0gcmVxdWlyZShcIi4vcHJvamVjdHMvZGlzcGxheVByb2plY3RzXCIpXG4gICAgcHJvamVjdFBhZ2UoKVxuXG4gICAgLy9kaXNwbGF5IHJlc3VtZVxuICAgIGNvbnN0IHJlc3VtZVBhZ2UgPSByZXF1aXJlKFwiLi9yZXN1bWUvZGlzcGxheVJlc3VtZVwiKVxuICAgIC8vIHJlc3VtZVBhZ2UoKVxuICAgIFxuICAgIC8vZGlzcGxheSBibG9nXG5cblxuXG59KVxuXG4iLCJjb25zdCBkb21FbCA9IHJlcXVpcmUoXCIuL2RvbUVsZW1lbnRzXCIpXG5cbi8vZmlsdGVyUGFnZSBmdW5jdGlvbiB0YWtlcyB0d28gcGFyYW1ldGVyczogdGhlIGRhdGFiYXNlIGluIHdoaWNoIHlvdSB3YW50IHRvIGZpbHRlciB0aHJvdWdoIGFuZCB0aGUgZnVuY3Rpb24geW91IHdhbnQgZXhlY3V0ZWQgb24gdGhlIGRhdGFiYXNlXG5jb25zdCBmaWx0ZXJQYWdlID0gKGRiQXJyYXksIGZ1bmMpID0+IHtcbiAgICBjb25zdCBvdXRwdXRFbCA9IGRvbUVsKClcbiAgICBsZXQgcGFnZUxvYWQgPSBcIlwiXG4gICAgXG4gICAgaWYgKGRiQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAvL2NyZWF0ZSBzZWFyY2ggaW5wdXRcbiAgICAgICAgb3V0cHV0RWwuZmlsdGVyLmFwcGVuZChcIjxwPlNlYXJjaDogPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcInBhZ2VGaWx0ZXJcXFwiIHBsYWNlaG9sZGVyPVxcXCJzZWFyY2ggYWxsXFxcIj48L3A+XCIpXG4gICAgICAgIFxuICAgICAgICAvL3RhcmdldHMgaW5wdXQgdG8gYWRkIGFuIGV2ZW50TGlzdGVuZXJcbiAgICAgICAgY29uc3QgcGFnZVNlYXJjaCA9ICQoXCJpbnB1dFtuYW1lPSdwYWdlRmlsdGVyJ11cIilbMF1cbiAgICAgICAgICAgIFxuICAgICAgICBwYWdlTG9hZCA9IGZ1bmMoZGJBcnJheSkgLy9pbml0aWFsIHBhZ2UgbG9hZCBvZiBpdGVtc1xuICAgICAgICBcbiAgICAgICAgcGFnZVNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgXCJrZXl1cFwiLFxuICAgICAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnZlcnQgd2hhdCBpcyBiZWluZyBmaWx0ZXJlZCB0byBsb3dlcmNhc2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlckZpbHRlclN0cmluZyA9IGV2ZW50LnRhcmdldC52YWx1ZS50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgLy9sb29rcyB0aHJvdWdoIGFsbCB0aGUga2V5cyBvZiBlYWNoIG9iamVjdCB0byBzZWUgaWYgdGhlIGZpbHRlcmVkIHN0cmluZyBhcHBlYXJzIGFueXdoZXJlLCBpZiBzbyBpdCByZXR1cm5zIHRoZSBpdGVtXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2VGaWx0ZXIgPSBkYkFycmF5LmZpbHRlcihmaWx0ZXJlZEl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGtleSBpbiBmaWx0ZXJlZEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gZmlsdGVyZWRJdGVtW2tleV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh1c2VyRmlsdGVyU3RyaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvL291dHB1dC5jb250ZW50Lmh0bWwocGFnZUxvYWQpIHJlcG9wdWxhdGVzIHRoZSBjb250ZW50IGFyZWEgd2hlbiB1c2VyIHR5cGVzIGluIHNlYXJjaCBiYXJcbiAgICAgICAgICAgICAgICAgICAgaWYocGFnZUZpbHRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VMb2FkID0gXCI8aDM+U2VhcmNoIFJlc3VsdHMgTm90IEZvdW5kPC9oMz5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0RWwuY29udGVudC5odG1sKHBhZ2VMb2FkKSBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VMb2FkID0gZnVuYyhwYWdlRmlsdGVyKSAvL2Rpc3BsYXlzIGZpbHRlcmVkIGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRFbC5jb250ZW50Lmh0bWwocGFnZUxvYWQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYWdlTG9hZD0gZnVuYyhkYkFycmF5KSAvL2Rpc3BsYXlzIGluaXRpYWwgcGFnZSBsb2FkIGlmIHNlbGVjdG9yIGhhcyBsZXNzIHRoYW4gdGhyZWUgY2hhcmFjdGVyc1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXRFbC5jb250ZW50Lmh0bWwocGFnZUxvYWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIFxuICAgIH1cbiAgICByZXR1cm4gcGFnZUxvYWRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSAgZmlsdGVyUGFnZSIsIi8vdGhpcyBtb2R1bGUgd2lsbCBkaXNwbGF5IHByb2plY3QgaW5mb3JtYXRpb25cblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IHByb2plY3RDb250ZW50ID0gcmVxdWlyZShcIi4vcHJvamVjdHNDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlQcm9qZWN0ID0gKCkgPT4ge1xuICAgIFxuICAgIHByb2plY3RDb250ZW50KCkudGhlbiggcHJvZHVjdFN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RIZWFkZXIgPSBcIjxoMT5LcmlzdGVuJ3MgUHJvamVjdHM8L2gxPlwiXG4gICAgICAgIGNvbnN0IHByb2plY3RJbmZvID0gcHJvZHVjdFN0cmluZ1xuICAgIFxuICAgICAgICBkaXNwbGF5UGFnZShwcm9qZWN0SGVhZGVyLCBwcm9qZWN0SW5mbylcbiAgICB9KVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheVByb2plY3RcbiIsImNvbnN0IHByb2plY3RET00gPSAoaXRlbUFycmF5KSA9PiB7XG4gICAgbGV0IHByb2plY3RTdHJpbmcgPSBcIlwiXG4gICAgLy8gYnVpbGRzIHByb2plY3Qgc2VjdGlvblxuICAgIHByb2plY3RTdHJpbmcgKz0gYFxuICAgIDxzZWN0aW9uIGlkPVwicHJvamVjdHNcIj5cbiAgICBgXG4gICAgLy9pdGVyYXRlIHRocm91Z2ggZWFjaCBwcm9qZWN0IGFuZCBhZGQgdG8gcHJvamVjdFN0cmluZ1xuICAgIGl0ZW1BcnJheS5mb3JFYWNoKFxuICAgICAgICBwcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIHByb2plY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwcm9qZWN0XCI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwicHJvamVjdC1uYW1lXCI+JHtwcm9qZWN0Lm5hbWV9PC9oMj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtZGF0ZVwiPjxiPkRhdGUgQ29tcGxldGVkOjwvYj4gJHtwcm9qZWN0LmRhdGVfY29tcGxldGVkfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtdGVjaFwiPjxiPlRlY2hub2xvZ2llcyBVc2VkOjwvYj4gJHtwcm9qZWN0LnRlY2hub2xvZ2llc191c2VkfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtdGVhbVwiPjxiPlRlYW1tYXRlcyAoaWYgYXBwbGljYWJsZSk6PC9iPiAke3Byb2plY3QudGVhbW1hdGVzfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtZGVzY3JpcHRpb25cIj4ke3Byb2plY3QuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgIH1cbiAgICApXG5cbiAgICAvL2Nsb3NpbmcgdGFnIGZvciBwcm9qZWN0IHNlY3Rpb25cbiAgICBwcm9qZWN0U3RyaW5nICs9IGBcbiAgICA8L3NlY3Rpb24+XG5gXG4gICAgcmV0dXJuIHByb2plY3RTdHJpbmdcbiAgICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcm9qZWN0RE9NIiwiLy9nZW5lcmF0ZXMgY29udGVudCBmb3IgcHJvamVjdHMgcGFnZVxuY29uc3QgcHJvamVjdEZpbHRlciA9IHJlcXVpcmUoXCIuLi9wYWdlRmlsdGVyXCIpXG5jb25zdCBwcm9qZWN0RE9NID0gcmVxdWlyZShcIi4vcHJvZHVjdHNJbmZvXCIpXG5cbmNvbnN0IHByb2plY3RzQ29udGVudCA9ICgpID0+IHtcbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL3BlcnNvbmFsLXNpdGUtY2YxYjguZmlyZWJhc2Vpby5jb20vcHJvamVjdHMuanNvblwiLFxuICAgICAgICBcIm1ldGhvZFwiOiBcIkdFVFwiICBcbiAgICB9KS50aGVuKFxuICAgICAgICBwcm9qZWN0RGIgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdEZpbHRlcihwcm9qZWN0RGIsIHByb2plY3RET00pXG5cbiAgICAgICAgfVxuICAgIClcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb2plY3RzQ29udGVudFxuXG4iLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSByZXN1bWUgaW5mb3JtYXRpb25cblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IHJlc3VtZUNvbnRlbnQgPSByZXF1aXJlKFwiLi9yZXN1bWVDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlSZXN1bWUgPSAoKSA9PiB7XG4gICAgXG4gICAgcmVzdW1lQ29udGVudCgpLnRoZW4oIHJlc3VtZVN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VtZUhlYWRlciA9IFwiPGgxPkpvYiBIaXN0b3J5IGZvciBLcmlzdGVuIE5vcnJpczwvaDE+XCJcbiAgICAgICAgY29uc3QgcmVzdW1lSW5mbyA9IHJlc3VtZVN0cmluZ1xuICAgIFxuICAgICAgICBkaXNwbGF5UGFnZShyZXN1bWVIZWFkZXIsIHJlc3VtZUluZm8pXG4gICAgfSlcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlSZXN1bWUiLCIvL2dlbmVyYXRlcyBjb250ZW50IGZvciByZXN1bWUgcGFnZVxuXG5jb25zdCByZXN1bWVDb250ZW50ID0gKCkgPT4ge1xuXG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9wZXJzb25hbC1zaXRlLWNmMWI4LmZpcmViYXNlaW8uY29tL3Jlc3VtZS5qc29uXCIsXG4gICAgICAgIFwibWV0aG9kXCI6IFwiR0VUXCJcbiAgICB9KVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAgIHJlc3VtZURiID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdW1lU3RyaW5nID0gXCJcIlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJlc3VtZURiLmZvckVhY2goIGpvYiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VtZVN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwiam9iXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cImNvbXBhbnlcIj4ke2pvYi5jb21wYW55fSAoJHtqb2IubG9jYXRpb259KTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj4ke2pvYi5wb3NpdGlvbn08L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz4ke2pvYi5zdGFydERhdGV9IC0gJHtqb2IuZW5kRGF0ZX08L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN1bW1hcnlcIj48Yj5TdW1tYXJ5OiA8L2I+JHtqb2Iuc3VtbWFyeX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJyZXNwb25zaWJpbGl0aWVzXCI+PGI+UmVzcG9uc2liaWxpdGllcyBpbmNsdWRlZDogPC9iPiR7am9iLnJlc3BvbnNpYmlsaXRpZXN9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VtZVN0cmluZ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXN1bWVDb250ZW50Il19
