(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//the module generates the content of the blogs

const blogContent = (itemArray) => {
    let blogString = ""
    
    //builds blog section
    blogString += `
    <section id="projects">
    `
    
    // for each blog entry, build the following html to create blog content
    itemArray.forEach(
        blog => { 
            blogString += `
                <article id="blog-${blog.id}" class="blog">
                <header>
                <h2 class="weekNum">${blog.title}</h2>
                <p class="weekDate">${blog.week_dates}</p>
                </header>
                
                <section>
                <h3>Celebrations & Inspirations</h3>
                <ul>
                `
        
            //iterates over celebration array
            blog.celebrations.forEach(celebration => {
                blogString += `<li>${celebration}</li>`;
            })
            
            blogString += `
                </ul>
                </section>
                
                <section>
                <h3>Challenges & Hang-Ups</h3>
                <ul>`
            
            //iterates over challenges array
            blog.challenges.forEach(challenge => {
                blogString += `<li>${challenge}</li>`;
            })
            
            blogString += `
                </ul>
                </section>
                
                <footer>
                <span>Posted by ${blog.author} on ${blog.published}</time></span>
                </footer>
                </article>
                `
            
        }
    )
    
    //closing tag for blog section
    blogString += `
        </section>
    `

    return blogString
}

module.exports = blogContent

},{}],2:[function(require,module,exports){
//controls how the content is written to the dom for blog page
const blogFilter = require("../pageFilter")
const blogContent = require("./blogContent")

const blogDOM = () => {
    return $.ajax({
        "url": "./data/database.json",
        "method": "GET"
    }).then(
        blogDb => {
            return blogFilter(blogDb.blog, blogContent)
        }
    )

}

module.exports = blogDOM

// "https://personal-site-cf1b8.firebaseio.com/blog.json"
},{"../pageFilter":10,"./blogContent":1}],3:[function(require,module,exports){
//this module will display the blogs

const displayPage = require("../displayPage")
const blogContent = require("./blogController")

const displayBlog = () => {

    
    blogContent().then(
        blogString => {
            const blogHeader = "<h1>My Nashville Software School Experience</h1>"
            const blogInfo = blogString

            displayPage(blogHeader, blogInfo)
        }
    )


}

module.exports = displayBlog

// const displayBlog = () => {
//     <header class="page-header">
//     <h1>My Nashville Software School Experience</h1>
//     <a href="../admin/blog.html">Admin</a>
//     </header>

//     <p>Search: <input type="text" name="blogFilter" placeholder="search all blog posts"></p>
//     <section id="blog-posts">
//     <!-- populated through database -->
//     </section>


//     <footer id="blog-paginator">

//     </footer>


// }
},{"../displayPage":7,"./blogController":2}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
//controls how the content is written to the dom for contact page
const contactDOM = () => {

    return $.ajax({ //need to return ajax function so that contactDOM can access the string returned in .then()
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

module.exports = contactDOM
},{}],6:[function(require,module,exports){
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
},{"../displayPage":7,"./contactController":5}],7:[function(require,module,exports){
const domEl = require("./domElements")

const outputEl = domEl()

const displayPage = (pageHeader, pageContent) => {

    const headerEl = outputEl.header
    headerEl.html(pageHeader) //adds the page header to the dom

    const contentEl = outputEl.content
    contentEl.html(pageContent) //adds the content of page to the dom

}


module.exports = displayPage
},{"./domElements":8}],8:[function(require,module,exports){
//this module captures the dom elements that will be written to when each page is called

const domElements = () => {
    return Object.create(null, {
        "header": {
            value: $("#page-header") //gets header section
        },
        "content": {
            value: $("#page-content") //gets content section
        },
        "filter": {
            value: $("#page-filter") //section to add filter when pageFilter is added to a page
        },
        "footer": {
            value: $("#page-footer") //section to add page footer such as pagination
        }
    })
}


module.exports = domElements
},{}],9:[function(require,module,exports){
$(document).ready(function () {
    //display navigation
    const navBar = require("./buildNavigation")
    
    //display contact
    const contactPage = require("./contact/displayContact")
    // contactPage()

    
    //display projects
    const projectPage = require("./projects/displayProjects")
    // projectPage()

    //display resume
    const resumePage = require("./resume/displayResume")
    // resumePage()
    
    //display blog
    const blogPage = require("./blog/displayBlogs")
    blogPage()


})


},{"./blog/displayBlogs":3,"./buildNavigation":4,"./contact/displayContact":6,"./projects/displayProjects":11,"./resume/displayResume":14}],10:[function(require,module,exports){
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
},{"./domElements":8}],11:[function(require,module,exports){
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

},{"../displayPage":7,"./projectsController":13}],12:[function(require,module,exports){
const projectContent = (itemArray) => {
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

module.exports = projectContent
},{}],13:[function(require,module,exports){
//controls how the content is written to the dom for projects page
const projectFilter = require("../pageFilter")
const projectContent = require("./projectContent")

const projectsDOM = () => {
    return $.ajax({
        "url": "https://personal-site-cf1b8.firebaseio.com/projects.json",
        "method": "GET"  
    }).then(
        projectDb => {
            
            return projectFilter(projectDb, projectContent)

        }
    )

}

module.exports = projectsDOM


},{"../pageFilter":10,"./projectContent":12}],14:[function(require,module,exports){
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
},{"../displayPage":7,"./resumeController":15}],15:[function(require,module,exports){
//controls how the content is written to the dom for resume page

const resumeDOM = () => {

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

module.exports = resumeDOM
},{}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0NvbnRlbnQuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0NvbnRyb2xsZXIuanMiLCJzY3JpcHRzL2Jsb2cvZGlzcGxheUJsb2dzLmpzIiwic2NyaXB0cy9idWlsZE5hdmlnYXRpb24uanMiLCJzY3JpcHRzL2NvbnRhY3QvY29udGFjdENvbnRyb2xsZXIuanMiLCJzY3JpcHRzL2NvbnRhY3QvZGlzcGxheUNvbnRhY3QuanMiLCJzY3JpcHRzL2Rpc3BsYXlQYWdlLmpzIiwic2NyaXB0cy9kb21FbGVtZW50cy5qcyIsInNjcmlwdHMvbWFpbi5qcyIsInNjcmlwdHMvcGFnZUZpbHRlci5qcyIsInNjcmlwdHMvcHJvamVjdHMvZGlzcGxheVByb2plY3RzLmpzIiwic2NyaXB0cy9wcm9qZWN0cy9wcm9qZWN0Q29udGVudC5qcyIsInNjcmlwdHMvcHJvamVjdHMvcHJvamVjdHNDb250cm9sbGVyLmpzIiwic2NyaXB0cy9yZXN1bWUvZGlzcGxheVJlc3VtZS5qcyIsInNjcmlwdHMvcmVzdW1lL3Jlc3VtZUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL3RoZSBtb2R1bGUgZ2VuZXJhdGVzIHRoZSBjb250ZW50IG9mIHRoZSBibG9nc1xuXG5jb25zdCBibG9nQ29udGVudCA9IChpdGVtQXJyYXkpID0+IHtcbiAgICBsZXQgYmxvZ1N0cmluZyA9IFwiXCJcbiAgICBcbiAgICAvL2J1aWxkcyBibG9nIHNlY3Rpb25cbiAgICBibG9nU3RyaW5nICs9IGBcbiAgICA8c2VjdGlvbiBpZD1cInByb2plY3RzXCI+XG4gICAgYFxuICAgIFxuICAgIC8vIGZvciBlYWNoIGJsb2cgZW50cnksIGJ1aWxkIHRoZSBmb2xsb3dpbmcgaHRtbCB0byBjcmVhdGUgYmxvZyBjb250ZW50XG4gICAgaXRlbUFycmF5LmZvckVhY2goXG4gICAgICAgIGJsb2cgPT4geyBcbiAgICAgICAgICAgIGJsb2dTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDxhcnRpY2xlIGlkPVwiYmxvZy0ke2Jsb2cuaWR9XCIgY2xhc3M9XCJibG9nXCI+XG4gICAgICAgICAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJ3ZWVrTnVtXCI+JHtibG9nLnRpdGxlfTwvaDI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ3ZWVrRGF0ZVwiPiR7YmxvZy53ZWVrX2RhdGVzfTwvcD5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8aDM+Q2VsZWJyYXRpb25zICYgSW5zcGlyYXRpb25zPC9oMz5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICBcbiAgICAgICAgICAgIC8vaXRlcmF0ZXMgb3ZlciBjZWxlYnJhdGlvbiBhcnJheVxuICAgICAgICAgICAgYmxvZy5jZWxlYnJhdGlvbnMuZm9yRWFjaChjZWxlYnJhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgYmxvZ1N0cmluZyArPSBgPGxpPiR7Y2VsZWJyYXRpb259PC9saT5gO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYmxvZ1N0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGgzPkNoYWxsZW5nZXMgJiBIYW5nLVVwczwvaDM+XG4gICAgICAgICAgICAgICAgPHVsPmBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9pdGVyYXRlcyBvdmVyIGNoYWxsZW5nZXMgYXJyYXlcbiAgICAgICAgICAgIGJsb2cuY2hhbGxlbmdlcy5mb3JFYWNoKGNoYWxsZW5nZSA9PiB7XG4gICAgICAgICAgICAgICAgYmxvZ1N0cmluZyArPSBgPGxpPiR7Y2hhbGxlbmdlfTwvbGk+YDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJsb2dTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxmb290ZXI+XG4gICAgICAgICAgICAgICAgPHNwYW4+UG9zdGVkIGJ5ICR7YmxvZy5hdXRob3J9IG9uICR7YmxvZy5wdWJsaXNoZWR9PC90aW1lPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICApXG4gICAgXG4gICAgLy9jbG9zaW5nIHRhZyBmb3IgYmxvZyBzZWN0aW9uXG4gICAgYmxvZ1N0cmluZyArPSBgXG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICBgXG5cbiAgICByZXR1cm4gYmxvZ1N0cmluZ1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJsb2dDb250ZW50XG4iLCIvL2NvbnRyb2xzIGhvdyB0aGUgY29udGVudCBpcyB3cml0dGVuIHRvIHRoZSBkb20gZm9yIGJsb2cgcGFnZVxuY29uc3QgYmxvZ0ZpbHRlciA9IHJlcXVpcmUoXCIuLi9wYWdlRmlsdGVyXCIpXG5jb25zdCBibG9nQ29udGVudCA9IHJlcXVpcmUoXCIuL2Jsb2dDb250ZW50XCIpXG5cbmNvbnN0IGJsb2dET00gPSAoKSA9PiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIFwidXJsXCI6IFwiLi9kYXRhL2RhdGFiYXNlLmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIlxuICAgIH0pLnRoZW4oXG4gICAgICAgIGJsb2dEYiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmxvZ0ZpbHRlcihibG9nRGIuYmxvZywgYmxvZ0NvbnRlbnQpXG4gICAgICAgIH1cbiAgICApXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBibG9nRE9NXG5cbi8vIFwiaHR0cHM6Ly9wZXJzb25hbC1zaXRlLWNmMWI4LmZpcmViYXNlaW8uY29tL2Jsb2cuanNvblwiIiwiLy90aGlzIG1vZHVsZSB3aWxsIGRpc3BsYXkgdGhlIGJsb2dzXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCBibG9nQ29udGVudCA9IHJlcXVpcmUoXCIuL2Jsb2dDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlCbG9nID0gKCkgPT4ge1xuXG4gICAgXG4gICAgYmxvZ0NvbnRlbnQoKS50aGVuKFxuICAgICAgICBibG9nU3RyaW5nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJsb2dIZWFkZXIgPSBcIjxoMT5NeSBOYXNodmlsbGUgU29mdHdhcmUgU2Nob29sIEV4cGVyaWVuY2U8L2gxPlwiXG4gICAgICAgICAgICBjb25zdCBibG9nSW5mbyA9IGJsb2dTdHJpbmdcblxuICAgICAgICAgICAgZGlzcGxheVBhZ2UoYmxvZ0hlYWRlciwgYmxvZ0luZm8pXG4gICAgICAgIH1cbiAgICApXG5cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlCbG9nXG5cbi8vIGNvbnN0IGRpc3BsYXlCbG9nID0gKCkgPT4ge1xuLy8gICAgIDxoZWFkZXIgY2xhc3M9XCJwYWdlLWhlYWRlclwiPlxuLy8gICAgIDxoMT5NeSBOYXNodmlsbGUgU29mdHdhcmUgU2Nob29sIEV4cGVyaWVuY2U8L2gxPlxuLy8gICAgIDxhIGhyZWY9XCIuLi9hZG1pbi9ibG9nLmh0bWxcIj5BZG1pbjwvYT5cbi8vICAgICA8L2hlYWRlcj5cblxuLy8gICAgIDxwPlNlYXJjaDogPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImJsb2dGaWx0ZXJcIiBwbGFjZWhvbGRlcj1cInNlYXJjaCBhbGwgYmxvZyBwb3N0c1wiPjwvcD5cbi8vICAgICA8c2VjdGlvbiBpZD1cImJsb2ctcG9zdHNcIj5cbi8vICAgICA8IS0tIHBvcHVsYXRlZCB0aHJvdWdoIGRhdGFiYXNlIC0tPlxuLy8gICAgIDwvc2VjdGlvbj5cblxuXG4vLyAgICAgPGZvb3RlciBpZD1cImJsb2ctcGFnaW5hdG9yXCI+XG5cbi8vICAgICA8L2Zvb3Rlcj5cblxuXG4vLyB9IiwiY29uc3QgbmF2aWdhdGlvbiA9IFtcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkhvbWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJSZXN1bWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJDb250YWN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiUHJvamVjdHNcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJCbG9nXCJcbiAgICB9XG5dXG5cbmNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1pdGVtc1wiKTtcblxuY29uc3QgbmF2TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuXG5uYXZpZ2F0aW9uLmZvckVhY2goXG4gICAgcGFnZSA9PiB7XG4gICAgICAgIGNvbnN0IG5hdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXG4gICAgICAgIG5hdkVsLmNsYXNzTGlzdC5hZGQoXCJuYXZMaW5rXCIpXG4gICAgICAgIG5hdkVsLmlkID0gYG5hdl8ke3BhZ2UuZGlzcGxheX1gXG5cbiAgICAgICAgY29uc3QgbmF2TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXG4gICAgICAgIG5hdkxpbmsuaHJlZiA9IFwiI1wiXG4gICAgICAgIG5hdkxpbmsuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocGFnZS5kaXNwbGF5KSlcblxuICAgICAgICBuYXZFbC5hcHBlbmRDaGlsZChuYXZMaW5rKVxuICAgICAgICBuYXZMaXN0LmFwcGVuZENoaWxkKG5hdkVsKVxuICAgIH1cbilcbm5hdkVsZW1lbnQuYXBwZW5kQ2hpbGQobmF2TGlzdClcblxubW9kdWxlLmV4cG9ydHMgPSBudWxsIiwiLy9jb250cm9scyBob3cgdGhlIGNvbnRlbnQgaXMgd3JpdHRlbiB0byB0aGUgZG9tIGZvciBjb250YWN0IHBhZ2VcbmNvbnN0IGNvbnRhY3RET00gPSAoKSA9PiB7XG5cbiAgICByZXR1cm4gJC5hamF4KHsgLy9uZWVkIHRvIHJldHVybiBhamF4IGZ1bmN0aW9uIHNvIHRoYXQgY29udGFjdERPTSBjYW4gYWNjZXNzIHRoZSBzdHJpbmcgcmV0dXJuZWQgaW4gLnRoZW4oKVxuICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vcGVyc29uYWwtc2l0ZS1jZjFiOC5maXJlYmFzZWlvLmNvbS9jb250YWN0Lmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIlxuICAgIH0pXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgICAgY29udGFjdERiID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGFjdFN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAvL2J1aWxkcyBjb250YWN0IGJ5IGVtYWlsIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY29udGFjdFwiPlNlbmQgYW4gZW1haWw6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPVwic2VuZC1lbWFpbFwiPiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImVtYWlsXCI+PGEgaHJlZj1cIm1haWx0bzoke2NvbnRhY3REYi5lbWFpbH1cIj4ke2NvbnRhY3REYi5lbWFpbH08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgLy9idWlsZHMgY29udGFjdCB0aHJvdWdoIHNvY2lhbCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNvbnRhY3RcIj5Db25uZWN0IG9uIHNvY2lhbCBtZWRpYTo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9XCJzb2NpYWwtbWVkaWFcIj5cbiAgICAgICAgICAgIGBcblxuICAgICAgICAgICAgICAgIC8vaXRlcmF0ZXMgdGhyb3VnaCBlYWNoIHNvY2lhbCBzaXRlXG4gICAgICAgICAgICAgICAgY29udGFjdERiLnNvY2lhbC5mb3JFYWNoKHNpdGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwic29jaWFsXCI+PGEgaHJlZj1cIiR7c2l0ZS51cmx9XCI+JHtzaXRlLnNlcnZpY2V9PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAvL2Nsb3NpbmcgdGFncyBmb3IgdW5vcmRlcmVkIGxpc3QgYW5kIGNvbnRhY3Qgc2VjdGlvblxuICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhY3RTdHJpbmdcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRhY3RET00iLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSBjb250YWN0IGluZm9ybWF0aW9uXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCBjb250YWN0Q29uZW50ID0gcmVxdWlyZShcIi4vY29udGFjdENvbnRyb2xsZXJcIilcblxuY29uc3QgZGlzcGxheUNvbnRhY3QgPSAoKSA9PiB7XG4gICAgY29udGFjdENvbmVudCgpLnRoZW4oY29udGFjdFN0cmluZyA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWN0SGVhZGVyID0gXCI8aDE+Q29udGFjdCBNZTwvaDE+XCJcbiAgICAgICAgY29uc3QgY29udGFjdEluZm8gPSBjb250YWN0U3RyaW5nXG4gICAgICAgIFxuICAgICAgICBkaXNwbGF5UGFnZShjb250YWN0SGVhZGVyLCBjb250YWN0SW5mbykgLy9kaXNwbGF5UGFnZSBuZWVkcyB0byBiZSB3aXRoaW4gdGhlIGNvbnRhY3RDb250ZW50KCkudGhlbiBiZWNhdXNlIGl0IGlzIGRlcGVuZGVudCBvbiB0aGUgc3RyaW5nIHRoYXQgaXMgcmV0dXJuZWQgd2hlbiB0aGUgdGhlbiBmdW5jdGlvbiBydW5zXG4gICAgICAgIFxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheUNvbnRhY3QiLCJjb25zdCBkb21FbCA9IHJlcXVpcmUoXCIuL2RvbUVsZW1lbnRzXCIpXG5cbmNvbnN0IG91dHB1dEVsID0gZG9tRWwoKVxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IChwYWdlSGVhZGVyLCBwYWdlQ29udGVudCkgPT4ge1xuXG4gICAgY29uc3QgaGVhZGVyRWwgPSBvdXRwdXRFbC5oZWFkZXJcbiAgICBoZWFkZXJFbC5odG1sKHBhZ2VIZWFkZXIpIC8vYWRkcyB0aGUgcGFnZSBoZWFkZXIgdG8gdGhlIGRvbVxuXG4gICAgY29uc3QgY29udGVudEVsID0gb3V0cHV0RWwuY29udGVudFxuICAgIGNvbnRlbnRFbC5odG1sKHBhZ2VDb250ZW50KSAvL2FkZHMgdGhlIGNvbnRlbnQgb2YgcGFnZSB0byB0aGUgZG9tXG5cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlQYWdlIiwiLy90aGlzIG1vZHVsZSBjYXB0dXJlcyB0aGUgZG9tIGVsZW1lbnRzIHRoYXQgd2lsbCBiZSB3cml0dGVuIHRvIHdoZW4gZWFjaCBwYWdlIGlzIGNhbGxlZFxuXG5jb25zdCBkb21FbGVtZW50cyA9ICgpID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG4gICAgICAgIFwiaGVhZGVyXCI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAkKFwiI3BhZ2UtaGVhZGVyXCIpIC8vZ2V0cyBoZWFkZXIgc2VjdGlvblxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRlbnRcIjoge1xuICAgICAgICAgICAgdmFsdWU6ICQoXCIjcGFnZS1jb250ZW50XCIpIC8vZ2V0cyBjb250ZW50IHNlY3Rpb25cbiAgICAgICAgfSxcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xuICAgICAgICAgICAgdmFsdWU6ICQoXCIjcGFnZS1maWx0ZXJcIikgLy9zZWN0aW9uIHRvIGFkZCBmaWx0ZXIgd2hlbiBwYWdlRmlsdGVyIGlzIGFkZGVkIHRvIGEgcGFnZVxuICAgICAgICB9LFxuICAgICAgICBcImZvb3RlclwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogJChcIiNwYWdlLWZvb3RlclwiKSAvL3NlY3Rpb24gdG8gYWRkIHBhZ2UgZm9vdGVyIHN1Y2ggYXMgcGFnaW5hdGlvblxuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUVsZW1lbnRzIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIC8vZGlzcGxheSBuYXZpZ2F0aW9uXG4gICAgY29uc3QgbmF2QmFyID0gcmVxdWlyZShcIi4vYnVpbGROYXZpZ2F0aW9uXCIpXG4gICAgXG4gICAgLy9kaXNwbGF5IGNvbnRhY3RcbiAgICBjb25zdCBjb250YWN0UGFnZSA9IHJlcXVpcmUoXCIuL2NvbnRhY3QvZGlzcGxheUNvbnRhY3RcIilcbiAgICAvLyBjb250YWN0UGFnZSgpXG5cbiAgICBcbiAgICAvL2Rpc3BsYXkgcHJvamVjdHNcbiAgICBjb25zdCBwcm9qZWN0UGFnZSA9IHJlcXVpcmUoXCIuL3Byb2plY3RzL2Rpc3BsYXlQcm9qZWN0c1wiKVxuICAgIC8vIHByb2plY3RQYWdlKClcblxuICAgIC8vZGlzcGxheSByZXN1bWVcbiAgICBjb25zdCByZXN1bWVQYWdlID0gcmVxdWlyZShcIi4vcmVzdW1lL2Rpc3BsYXlSZXN1bWVcIilcbiAgICAvLyByZXN1bWVQYWdlKClcbiAgICBcbiAgICAvL2Rpc3BsYXkgYmxvZ1xuICAgIGNvbnN0IGJsb2dQYWdlID0gcmVxdWlyZShcIi4vYmxvZy9kaXNwbGF5QmxvZ3NcIilcbiAgICBibG9nUGFnZSgpXG5cblxufSlcblxuIiwiY29uc3QgZG9tRWwgPSByZXF1aXJlKFwiLi9kb21FbGVtZW50c1wiKVxuXG4vL2ZpbHRlclBhZ2UgZnVuY3Rpb24gdGFrZXMgdHdvIHBhcmFtZXRlcnM6IHRoZSBkYXRhYmFzZSBpbiB3aGljaCB5b3Ugd2FudCB0byBmaWx0ZXIgdGhyb3VnaCBhbmQgdGhlIGZ1bmN0aW9uIHlvdSB3YW50IGV4ZWN1dGVkIG9uIHRoZSBkYXRhYmFzZVxuY29uc3QgZmlsdGVyUGFnZSA9IChkYkFycmF5LCBmdW5jKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0RWwgPSBkb21FbCgpXG4gICAgbGV0IHBhZ2VMb2FkID0gXCJcIlxuICAgIFxuICAgIGlmIChkYkFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy9jcmVhdGUgc2VhcmNoIGlucHV0XG4gICAgICAgIG91dHB1dEVsLmZpbHRlci5hcHBlbmQoXCI8cD5TZWFyY2g6IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuYW1lPVxcXCJwYWdlRmlsdGVyXFxcIiBwbGFjZWhvbGRlcj1cXFwic2VhcmNoIGFsbFxcXCI+PC9wPlwiKVxuICAgICAgICBcbiAgICAgICAgLy90YXJnZXRzIGlucHV0IHRvIGFkZCBhbiBldmVudExpc3RlbmVyXG4gICAgICAgIGNvbnN0IHBhZ2VTZWFyY2ggPSAkKFwiaW5wdXRbbmFtZT0ncGFnZUZpbHRlciddXCIpWzBdXG4gICAgICAgICAgICBcbiAgICAgICAgcGFnZUxvYWQgPSBmdW5jKGRiQXJyYXkpIC8vaW5pdGlhbCBwYWdlIGxvYWQgb2YgaXRlbXNcbiAgICAgICAgXG4gICAgICAgIHBhZ2VTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIFwia2V5dXBcIixcbiAgICAgICAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZihldmVudC50YXJnZXQudmFsdWUubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb252ZXJ0IHdoYXQgaXMgYmVpbmcgZmlsdGVyZWQgdG8gbG93ZXJjYXNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJGaWx0ZXJTdHJpbmcgPSBldmVudC50YXJnZXQudmFsdWUudG9Mb3dlckNhc2UoKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vbG9va3MgdGhyb3VnaCBhbGwgdGhlIGtleXMgb2YgZWFjaCBvYmplY3QgdG8gc2VlIGlmIHRoZSBmaWx0ZXJlZCBzdHJpbmcgYXBwZWFycyBhbnl3aGVyZSwgaWYgc28gaXQgcmV0dXJucyB0aGUgaXRlbVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWdlRmlsdGVyID0gZGJBcnJheS5maWx0ZXIoZmlsdGVyZWRJdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihrZXkgaW4gZmlsdGVyZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGZpbHRlcmVkSXRlbVtrZXldXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModXNlckZpbHRlclN0cmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy9vdXRwdXQuY29udGVudC5odG1sKHBhZ2VMb2FkKSByZXBvcHVsYXRlcyB0aGUgY29udGVudCBhcmVhIHdoZW4gdXNlciB0eXBlcyBpbiBzZWFyY2ggYmFyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhZ2VGaWx0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlTG9hZCA9IFwiPGgzPlNlYXJjaCBSZXN1bHRzIE5vdCBGb3VuZDwvaDM+XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dEVsLmNvbnRlbnQuaHRtbChwYWdlTG9hZCkgXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlTG9hZCA9IGZ1bmMocGFnZUZpbHRlcikgLy9kaXNwbGF5cyBmaWx0ZXJlZCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0RWwuY29udGVudC5odG1sKHBhZ2VMb2FkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZUxvYWQ9IGZ1bmMoZGJBcnJheSkgLy9kaXNwbGF5cyBpbml0aWFsIHBhZ2UgbG9hZCBpZiBzZWxlY3RvciBoYXMgbGVzcyB0aGFuIHRocmVlIGNoYXJhY3RlcnNcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0RWwuY29udGVudC5odG1sKHBhZ2VMb2FkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICBcbiAgICB9XG4gICAgcmV0dXJuIHBhZ2VMb2FkXG59XG5cbm1vZHVsZS5leHBvcnRzID0gIGZpbHRlclBhZ2UiLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSBwcm9qZWN0IGluZm9ybWF0aW9uXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCBwcm9qZWN0Q29udGVudCA9IHJlcXVpcmUoXCIuL3Byb2plY3RzQ29udHJvbGxlclwiKVxuXG5jb25zdCBkaXNwbGF5UHJvamVjdCA9ICgpID0+IHtcbiAgICBcbiAgICBwcm9qZWN0Q29udGVudCgpLnRoZW4oIHByb2R1Y3RTdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGVyID0gXCI8aDE+S3Jpc3RlbidzIFByb2plY3RzPC9oMT5cIlxuICAgICAgICBjb25zdCBwcm9qZWN0SW5mbyA9IHByb2R1Y3RTdHJpbmdcbiAgICBcbiAgICAgICAgZGlzcGxheVBhZ2UocHJvamVjdEhlYWRlciwgcHJvamVjdEluZm8pXG4gICAgfSlcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlQcm9qZWN0XG4iLCJjb25zdCBwcm9qZWN0Q29udGVudCA9IChpdGVtQXJyYXkpID0+IHtcbiAgICBsZXQgcHJvamVjdFN0cmluZyA9IFwiXCJcbiAgICAvLyBidWlsZHMgcHJvamVjdCBzZWN0aW9uXG4gICAgcHJvamVjdFN0cmluZyArPSBgXG4gICAgPHNlY3Rpb24gaWQ9XCJwcm9qZWN0c1wiPlxuICAgIGBcbiAgICAvL2l0ZXJhdGUgdGhyb3VnaCBlYWNoIHByb2plY3QgYW5kIGFkZCB0byBwcm9qZWN0U3RyaW5nXG4gICAgaXRlbUFycmF5LmZvckVhY2goXG4gICAgICAgIHByb2plY3QgPT4ge1xuICAgICAgICAgICAgcHJvamVjdFN0cmluZyArPSBgXG4gICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInByb2plY3RcIj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJwcm9qZWN0LW5hbWVcIj4ke3Byb2plY3QubmFtZX08L2gyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvamVjdC1kYXRlXCI+PGI+RGF0ZSBDb21wbGV0ZWQ6PC9iPiAke3Byb2plY3QuZGF0ZV9jb21wbGV0ZWR9PC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvamVjdC10ZWNoXCI+PGI+VGVjaG5vbG9naWVzIFVzZWQ6PC9iPiAke3Byb2plY3QudGVjaG5vbG9naWVzX3VzZWR9PC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvamVjdC10ZWFtXCI+PGI+VGVhbW1hdGVzIChpZiBhcHBsaWNhYmxlKTo8L2I+ICR7cHJvamVjdC50ZWFtbWF0ZXN9PC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvamVjdC1kZXNjcmlwdGlvblwiPiR7cHJvamVjdC5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgICBgXG5cbiAgICAgICAgfVxuICAgIClcblxuICAgIC8vY2xvc2luZyB0YWcgZm9yIHByb2plY3Qgc2VjdGlvblxuICAgIHByb2plY3RTdHJpbmcgKz0gYFxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgYFxuICAgIHJldHVybiBwcm9qZWN0U3RyaW5nXG4gICAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvamVjdENvbnRlbnQiLCIvL2NvbnRyb2xzIGhvdyB0aGUgY29udGVudCBpcyB3cml0dGVuIHRvIHRoZSBkb20gZm9yIHByb2plY3RzIHBhZ2VcbmNvbnN0IHByb2plY3RGaWx0ZXIgPSByZXF1aXJlKFwiLi4vcGFnZUZpbHRlclwiKVxuY29uc3QgcHJvamVjdENvbnRlbnQgPSByZXF1aXJlKFwiLi9wcm9qZWN0Q29udGVudFwiKVxuXG5jb25zdCBwcm9qZWN0c0RPTSA9ICgpID0+IHtcbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL3BlcnNvbmFsLXNpdGUtY2YxYjguZmlyZWJhc2Vpby5jb20vcHJvamVjdHMuanNvblwiLFxuICAgICAgICBcIm1ldGhvZFwiOiBcIkdFVFwiICBcbiAgICB9KS50aGVuKFxuICAgICAgICBwcm9qZWN0RGIgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdEZpbHRlcihwcm9qZWN0RGIsIHByb2plY3RDb250ZW50KVxuXG4gICAgICAgIH1cbiAgICApXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcm9qZWN0c0RPTVxuXG4iLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSByZXN1bWUgaW5mb3JtYXRpb25cblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IHJlc3VtZUNvbnRlbnQgPSByZXF1aXJlKFwiLi9yZXN1bWVDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlSZXN1bWUgPSAoKSA9PiB7XG4gICAgXG4gICAgcmVzdW1lQ29udGVudCgpLnRoZW4oIHJlc3VtZVN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VtZUhlYWRlciA9IFwiPGgxPkpvYiBIaXN0b3J5IGZvciBLcmlzdGVuIE5vcnJpczwvaDE+XCJcbiAgICAgICAgY29uc3QgcmVzdW1lSW5mbyA9IHJlc3VtZVN0cmluZ1xuICAgIFxuICAgICAgICBkaXNwbGF5UGFnZShyZXN1bWVIZWFkZXIsIHJlc3VtZUluZm8pXG4gICAgfSlcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlSZXN1bWUiLCIvL2NvbnRyb2xzIGhvdyB0aGUgY29udGVudCBpcyB3cml0dGVuIHRvIHRoZSBkb20gZm9yIHJlc3VtZSBwYWdlXG5cbmNvbnN0IHJlc3VtZURPTSA9ICgpID0+IHtcblxuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vcGVyc29uYWwtc2l0ZS1jZjFiOC5maXJlYmFzZWlvLmNvbS9yZXN1bWUuanNvblwiLFxuICAgICAgICBcIm1ldGhvZFwiOiBcIkdFVFwiXG4gICAgfSlcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICByZXN1bWVEYiA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VtZVN0cmluZyA9IFwiXCJcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXN1bWVEYi5mb3JFYWNoKCBqb2IgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bWVTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cImpvYlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJjb21wYW55XCI+JHtqb2IuY29tcGFueX0gKCR7am9iLmxvY2F0aW9ufSk8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInRpdGxlXCI+JHtqb2IucG9zaXRpb259PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDM+JHtqb2Iuc3RhcnREYXRlfSAtICR7am9iLmVuZERhdGV9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJzdW1tYXJ5XCI+PGI+U3VtbWFyeTogPC9iPiR7am9iLnN1bW1hcnl9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicmVzcG9uc2liaWxpdGllc1wiPjxiPlJlc3BvbnNpYmlsaXRpZXMgaW5jbHVkZWQ6IDwvYj4ke2pvYi5yZXNwb25zaWJpbGl0aWVzfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bWVTdHJpbmdcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdW1lRE9NIl19
