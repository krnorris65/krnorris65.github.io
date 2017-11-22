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
const paginate = require("../paginate")
const blogFilter = require("../pageFilter")
const filter = require("./blogFilter")
const blogContent = require("./blogContent")

const blogDOM = () => {
    return $.ajax({
        "url": "https://personal-site-cf1b8.firebaseio.com/blog.json",
        "method": "GET"
    }).then(
        blogDb => {
            return blogFilter(blogDb, blogContent, filter)
            // return paginate(blogDb, blogContent)
        }
    )

}

module.exports = blogDOM
},{"../pageFilter":11,"../paginate":12,"./blogContent":1,"./blogFilter":3}],3:[function(require,module,exports){

const blogsFilter = (database) => {
    database.filter(
        filteredBlog => {
            return filteredBlog.title.toLowerCase().includes(userFilterString) || //look through titles
            filteredBlog.celebrations.filter( //iterate over the celebrations array
                filterCelebration => {
                    return filterCelebration.toLowerCase().includes(userFilterString)
                }).length || //if the length is 0 then it returns false
            filteredBlog.challenges.filter( //iterate over the challenges array
                filterChallenge => {
                    return filterChallenge.toLowerCase().includes(userFilterString)
                }).length ||
                filteredBlog.week_dates.toLowerCase().includes(userFilterString)
            
        }
    )
}



module.exports = blogsFilter
},{}],4:[function(require,module,exports){
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
},{"../displayPage":8,"./blogController":2}],5:[function(require,module,exports){
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

        const navLink = document.createElement("a")
        navLink.href = "#"
        navLink.className = `nav_${page.display.toLowerCase()}`
        navLink.appendChild(document.createTextNode(page.display))

        // navLink.addEventListener("click", e => {
        //     const pageName = e.target.className.split("_")[1]
        //     console.log(pageName)

        // })

        navEl.appendChild(navLink)
        navList.appendChild(navEl)
    }
)

navElement.appendChild(navList)

module.exports = null
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{"../displayPage":8,"./contactController":6}],8:[function(require,module,exports){
const domEl = require("./domElements")

const outputEl = domEl()

const displayPage = (pageHeader, pageContent) => {

    const headerEl = outputEl.header
    headerEl.html(pageHeader) //adds the page header to the dom

    const contentEl = outputEl.content
    contentEl.html(pageContent) //adds the content of page to the dom

}


module.exports = displayPage
},{"./domElements":9}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
$(document).ready(function () {
    //display navigation
    const navBar = require("./buildNavigation")
    
    //display contact
    const contactPage = require("./contact/displayContact")
    $(".nav_contact").on("click", contactPage)
    
    
    //display projects
    const projectPage = require("./projects/displayProjects")
    $(".nav_projects").on("click", projectPage)
    // projectPage()
    
    //display resume
    const resumePage = require("./resume/displayResume")
    $(".nav_resume").on("click", resumePage)
    // resumePage()
    
    //display blog
    const blogPage = require("./blog/displayBlogs")
    $(".nav_blog").on("click", blogPage)


})


},{"./blog/displayBlogs":4,"./buildNavigation":5,"./contact/displayContact":7,"./projects/displayProjects":13,"./resume/displayResume":16}],11:[function(require,module,exports){
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

                    let pageFilter = dbArray.filter(filteredItem => {
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
},{"./domElements":9}],12:[function(require,module,exports){
const domEl = require("./domElements")

const paginate = (items, func) => {
    const outputEl = domEl()
    const totalItems = items.length
    const itemsPerPage = 5
    const numberOfPages = Math.ceil(totalItems / itemsPerPage)
    const paginationEl = outputEl.footer

    // Build the DOM string for the pagination links in the footer
    let paginationString = "<ul>";
    paginationString += "<a id='previous' href='#'>&lt;</a>"; //generates previous button
    for (let i = 0; i < numberOfPages; i++) {
        paginationString += ` <li><a class="page page-${i+1}" href="#">${i+1}</a></li>` //generates the correct number of blog page buttons and gives them a class of blogPage and page-#
    }
    paginationString += " <a id='next' class='page-2' href='#'>&gt;</a>"; //generates next button, default class is page-2
    paginationString += "</ul>";

    paginationEl.html(paginationString); //add to DOM

    // references to the next and previous arrows
    const previousEl = document.getElementById("previous"); 
    const nextEl = document.getElementById("next");

    //function to invoke when user clicks pagination link at bottom of page
    function produceItems(event) {

        //what did the user click
        const currentPage = parseInt ( //parse since the array will return a string
            Array.from(event.target.classList) //target classes on the clicked pagination link
                .find(pageClass => { 
                    if (pageClass.startsWith("page-")) return pageClass //if class starts with "page-" then return that class
                })
                .split("-")[1] //split class using the "-" as the delimiter, [0]=page [1]=#, currentPage = #
        );
        
        //change class of previous arrow
        if ((currentPage - 1) === 0 ) { //if the current page -1 is 0 
            previousEl.style.visibility = "hidden"; //then don't display previous arrow
        } else {
            previousEl.style.visibility = "visible"; //if greater than 0 then display arrow 
            previousEl.className = `page-${currentPage - 1}` //and add the class of the previous page
        }
        //change class of next arrow
        if ((currentPage + 1) > numberOfPages ) { //if the current page +1 is more than the total pages 
            nextEl.style.visibility = "hidden"; //then don't display next arrow
        } else {
            nextEl.style.visibility = "visible"; //if less than total pages then display arrow 
            nextEl.className = `page-${currentPage + 1}` //and add the class of the next page
        }

        //determine blogs to display by slicing array
        const begin = (currentPage-1) * itemsPerPage; //current page minus one, then multiply by items per page
        const end = currentPage * itemsPerPage; //current page multiplied by items per page
        const itemsToDisplay = items.slice(begin, end);

        //iterate through itemsToDisplay and inserts them into DOM
        const pageLoad = func(itemsToDisplay) //function to update dom
        debugger

        outputEl.content.html(pageLoad)
    
    }//end of produceItems

    // Get the array of pagination anchor tags we added to the DOM
    const pageLinks = document.getElementsByClassName("page");
    
    // Add event listeners to each <a> element in the pagination
    pageLinks.forEach( link => {
        link.addEventListener("click", produceItems, false) //when pagination link is clicked, run produceItems function 
    })
    
    //default so that first page loads
    produceItems({
        "target": {
            "classList": ["page-1"]
        }
    });
    
    //event listeners for previous and next elements
    previousEl.addEventListener("click", produceItems, false);
    nextEl.addEventListener("click", produceItems, false);

}//end of paginate

module.exports = paginate
},{"./domElements":9}],13:[function(require,module,exports){
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

},{"../displayPage":8,"./projectsController":15}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
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


},{"../pageFilter":11,"./projectContent":14}],16:[function(require,module,exports){
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
},{"../displayPage":8,"./resumeController":17}],17:[function(require,module,exports){
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
},{}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0NvbnRlbnQuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0NvbnRyb2xsZXIuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0ZpbHRlci5qcyIsInNjcmlwdHMvYmxvZy9kaXNwbGF5QmxvZ3MuanMiLCJzY3JpcHRzL2J1aWxkTmF2aWdhdGlvbi5qcyIsInNjcmlwdHMvY29udGFjdC9jb250YWN0Q29udHJvbGxlci5qcyIsInNjcmlwdHMvY29udGFjdC9kaXNwbGF5Q29udGFjdC5qcyIsInNjcmlwdHMvZGlzcGxheVBhZ2UuanMiLCJzY3JpcHRzL2RvbUVsZW1lbnRzLmpzIiwic2NyaXB0cy9tYWluLmpzIiwic2NyaXB0cy9wYWdlRmlsdGVyLmpzIiwic2NyaXB0cy9wYWdpbmF0ZS5qcyIsInNjcmlwdHMvcHJvamVjdHMvZGlzcGxheVByb2plY3RzLmpzIiwic2NyaXB0cy9wcm9qZWN0cy9wcm9qZWN0Q29udGVudC5qcyIsInNjcmlwdHMvcHJvamVjdHMvcHJvamVjdHNDb250cm9sbGVyLmpzIiwic2NyaXB0cy9yZXN1bWUvZGlzcGxheVJlc3VtZS5qcyIsInNjcmlwdHMvcmVzdW1lL3Jlc3VtZUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy90aGUgbW9kdWxlIGdlbmVyYXRlcyB0aGUgY29udGVudCBvZiB0aGUgYmxvZ3NcblxuY29uc3QgYmxvZ0NvbnRlbnQgPSAoaXRlbUFycmF5KSA9PiB7XG4gICAgbGV0IGJsb2dTdHJpbmcgPSBcIlwiXG4gICAgXG4gICAgLy9idWlsZHMgYmxvZyBzZWN0aW9uXG4gICAgYmxvZ1N0cmluZyArPSBgXG4gICAgPHNlY3Rpb24gaWQ9XCJwcm9qZWN0c1wiPlxuICAgIGBcbiAgICBcbiAgICAvLyBmb3IgZWFjaCBibG9nIGVudHJ5LCBidWlsZCB0aGUgZm9sbG93aW5nIGh0bWwgdG8gY3JlYXRlIGJsb2cgY29udGVudFxuICAgIGl0ZW1BcnJheS5mb3JFYWNoKFxuICAgICAgICBibG9nID0+IHsgXG4gICAgICAgICAgICBibG9nU3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8YXJ0aWNsZSBpZD1cImJsb2ctJHtibG9nLmlkfVwiIGNsYXNzPVwiYmxvZ1wiPlxuICAgICAgICAgICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwid2Vla051bVwiPiR7YmxvZy50aXRsZX08L2gyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwid2Vla0RhdGVcIj4ke2Jsb2cud2Vla19kYXRlc308L3A+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGgzPkNlbGVicmF0aW9ucyAmIEluc3BpcmF0aW9uczwvaDM+XG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgXG4gICAgICAgICAgICAvL2l0ZXJhdGVzIG92ZXIgY2VsZWJyYXRpb24gYXJyYXlcbiAgICAgICAgICAgIGJsb2cuY2VsZWJyYXRpb25zLmZvckVhY2goY2VsZWJyYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGJsb2dTdHJpbmcgKz0gYDxsaT4ke2NlbGVicmF0aW9ufTwvbGk+YDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJsb2dTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxoMz5DaGFsbGVuZ2VzICYgSGFuZy1VcHM8L2gzPlxuICAgICAgICAgICAgICAgIDx1bD5gXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vaXRlcmF0ZXMgb3ZlciBjaGFsbGVuZ2VzIGFycmF5XG4gICAgICAgICAgICBibG9nLmNoYWxsZW5nZXMuZm9yRWFjaChjaGFsbGVuZ2UgPT4ge1xuICAgICAgICAgICAgICAgIGJsb2dTdHJpbmcgKz0gYDxsaT4ke2NoYWxsZW5nZX08L2xpPmA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBibG9nU3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8Zm9vdGVyPlxuICAgICAgICAgICAgICAgIDxzcGFuPlBvc3RlZCBieSAke2Jsb2cuYXV0aG9yfSBvbiAke2Jsb2cucHVibGlzaGVkfTwvdGltZT48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgKVxuICAgIFxuICAgIC8vY2xvc2luZyB0YWcgZm9yIGJsb2cgc2VjdGlvblxuICAgIGJsb2dTdHJpbmcgKz0gYFxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgYFxuXG4gICAgcmV0dXJuIGJsb2dTdHJpbmdcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBibG9nQ29udGVudFxuIiwiLy9jb250cm9scyBob3cgdGhlIGNvbnRlbnQgaXMgd3JpdHRlbiB0byB0aGUgZG9tIGZvciBibG9nIHBhZ2VcbmNvbnN0IHBhZ2luYXRlID0gcmVxdWlyZShcIi4uL3BhZ2luYXRlXCIpXG5jb25zdCBibG9nRmlsdGVyID0gcmVxdWlyZShcIi4uL3BhZ2VGaWx0ZXJcIilcbmNvbnN0IGZpbHRlciA9IHJlcXVpcmUoXCIuL2Jsb2dGaWx0ZXJcIilcbmNvbnN0IGJsb2dDb250ZW50ID0gcmVxdWlyZShcIi4vYmxvZ0NvbnRlbnRcIilcblxuY29uc3QgYmxvZ0RPTSA9ICgpID0+IHtcbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL3BlcnNvbmFsLXNpdGUtY2YxYjguZmlyZWJhc2Vpby5jb20vYmxvZy5qc29uXCIsXG4gICAgICAgIFwibWV0aG9kXCI6IFwiR0VUXCJcbiAgICB9KS50aGVuKFxuICAgICAgICBibG9nRGIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJsb2dGaWx0ZXIoYmxvZ0RiLCBibG9nQ29udGVudCwgZmlsdGVyKVxuICAgICAgICAgICAgLy8gcmV0dXJuIHBhZ2luYXRlKGJsb2dEYiwgYmxvZ0NvbnRlbnQpXG4gICAgICAgIH1cbiAgICApXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBibG9nRE9NIiwiXG5jb25zdCBibG9nc0ZpbHRlciA9IChkYXRhYmFzZSkgPT4ge1xuICAgIGRhdGFiYXNlLmZpbHRlcihcbiAgICAgICAgZmlsdGVyZWRCbG9nID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZEJsb2cudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh1c2VyRmlsdGVyU3RyaW5nKSB8fCAvL2xvb2sgdGhyb3VnaCB0aXRsZXNcbiAgICAgICAgICAgIGZpbHRlcmVkQmxvZy5jZWxlYnJhdGlvbnMuZmlsdGVyKCAvL2l0ZXJhdGUgb3ZlciB0aGUgY2VsZWJyYXRpb25zIGFycmF5XG4gICAgICAgICAgICAgICAgZmlsdGVyQ2VsZWJyYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyQ2VsZWJyYXRpb24udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh1c2VyRmlsdGVyU3RyaW5nKVxuICAgICAgICAgICAgICAgIH0pLmxlbmd0aCB8fCAvL2lmIHRoZSBsZW5ndGggaXMgMCB0aGVuIGl0IHJldHVybnMgZmFsc2VcbiAgICAgICAgICAgIGZpbHRlcmVkQmxvZy5jaGFsbGVuZ2VzLmZpbHRlciggLy9pdGVyYXRlIG92ZXIgdGhlIGNoYWxsZW5nZXMgYXJyYXlcbiAgICAgICAgICAgICAgICBmaWx0ZXJDaGFsbGVuZ2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyQ2hhbGxlbmdlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModXNlckZpbHRlclN0cmluZylcbiAgICAgICAgICAgICAgICB9KS5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZEJsb2cud2Vla19kYXRlcy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHVzZXJGaWx0ZXJTdHJpbmcpXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIClcbn1cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gYmxvZ3NGaWx0ZXIiLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSB0aGUgYmxvZ3NcblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IGJsb2dDb250ZW50ID0gcmVxdWlyZShcIi4vYmxvZ0NvbnRyb2xsZXJcIilcblxuY29uc3QgZGlzcGxheUJsb2cgPSAoKSA9PiB7XG5cbiAgICBcbiAgICBibG9nQ29udGVudCgpLnRoZW4oXG4gICAgICAgIGJsb2dTdHJpbmcgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmxvZ0hlYWRlciA9IFwiPGgxPk15IE5hc2h2aWxsZSBTb2Z0d2FyZSBTY2hvb2wgRXhwZXJpZW5jZTwvaDE+XCJcbiAgICAgICAgICAgIGNvbnN0IGJsb2dJbmZvID0gYmxvZ1N0cmluZ1xuXG4gICAgICAgICAgICBkaXNwbGF5UGFnZShibG9nSGVhZGVyLCBibG9nSW5mbylcbiAgICAgICAgfVxuICAgIClcblxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheUJsb2dcblxuLy8gY29uc3QgZGlzcGxheUJsb2cgPSAoKSA9PiB7XG4vLyAgICAgPGhlYWRlciBjbGFzcz1cInBhZ2UtaGVhZGVyXCI+XG4vLyAgICAgPGgxPk15IE5hc2h2aWxsZSBTb2Z0d2FyZSBTY2hvb2wgRXhwZXJpZW5jZTwvaDE+XG4vLyAgICAgPGEgaHJlZj1cIi4uL2FkbWluL2Jsb2cuaHRtbFwiPkFkbWluPC9hPlxuLy8gICAgIDwvaGVhZGVyPlxuXG4vLyAgICAgPHA+U2VhcmNoOiA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYmxvZ0ZpbHRlclwiIHBsYWNlaG9sZGVyPVwic2VhcmNoIGFsbCBibG9nIHBvc3RzXCI+PC9wPlxuLy8gICAgIDxzZWN0aW9uIGlkPVwiYmxvZy1wb3N0c1wiPlxuLy8gICAgIDwhLS0gcG9wdWxhdGVkIHRocm91Z2ggZGF0YWJhc2UgLS0+XG4vLyAgICAgPC9zZWN0aW9uPlxuXG5cbi8vICAgICA8Zm9vdGVyIGlkPVwiYmxvZy1wYWdpbmF0b3JcIj5cblxuLy8gICAgIDwvZm9vdGVyPlxuXG5cbi8vIH0iLCJjb25zdCBuYXZpZ2F0aW9uID0gW1xuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiSG9tZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIlJlc3VtZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkNvbnRhY3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJQcm9qZWN0c1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkJsb2dcIlxuICAgIH1cbl1cblxuY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LWl0ZW1zXCIpO1xuXG5jb25zdCBuYXZMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG5cbm5hdmlnYXRpb24uZm9yRWFjaChcbiAgICBwYWdlID0+IHtcbiAgICAgICAgY29uc3QgbmF2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcbiAgICAgICAgbmF2RWwuY2xhc3NMaXN0LmFkZChcIm5hdkxpbmtcIilcblxuICAgICAgICBjb25zdCBuYXZMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcbiAgICAgICAgbmF2TGluay5ocmVmID0gXCIjXCJcbiAgICAgICAgbmF2TGluay5jbGFzc05hbWUgPSBgbmF2XyR7cGFnZS5kaXNwbGF5LnRvTG93ZXJDYXNlKCl9YFxuICAgICAgICBuYXZMaW5rLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBhZ2UuZGlzcGxheSkpXG5cbiAgICAgICAgLy8gbmF2TGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgIC8vICAgICBjb25zdCBwYWdlTmFtZSA9IGUudGFyZ2V0LmNsYXNzTmFtZS5zcGxpdChcIl9cIilbMV1cbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHBhZ2VOYW1lKVxuXG4gICAgICAgIC8vIH0pXG5cbiAgICAgICAgbmF2RWwuYXBwZW5kQ2hpbGQobmF2TGluaylcbiAgICAgICAgbmF2TGlzdC5hcHBlbmRDaGlsZChuYXZFbClcbiAgICB9XG4pXG5cbm5hdkVsZW1lbnQuYXBwZW5kQ2hpbGQobmF2TGlzdClcblxubW9kdWxlLmV4cG9ydHMgPSBudWxsIiwiLy9jb250cm9scyBob3cgdGhlIGNvbnRlbnQgaXMgd3JpdHRlbiB0byB0aGUgZG9tIGZvciBjb250YWN0IHBhZ2VcbmNvbnN0IGNvbnRhY3RET00gPSAoKSA9PiB7XG5cbiAgICByZXR1cm4gJC5hamF4KHsgLy9uZWVkIHRvIHJldHVybiBhamF4IGZ1bmN0aW9uIHNvIHRoYXQgY29udGFjdERPTSBjYW4gYWNjZXNzIHRoZSBzdHJpbmcgcmV0dXJuZWQgaW4gLnRoZW4oKVxuICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vcGVyc29uYWwtc2l0ZS1jZjFiOC5maXJlYmFzZWlvLmNvbS9jb250YWN0Lmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIlxuICAgIH0pXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgICAgY29udGFjdERiID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGFjdFN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAvL2J1aWxkcyBjb250YWN0IGJ5IGVtYWlsIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY29udGFjdFwiPlNlbmQgYW4gZW1haWw6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPVwic2VuZC1lbWFpbFwiPiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImVtYWlsXCI+PGEgaHJlZj1cIm1haWx0bzoke2NvbnRhY3REYi5lbWFpbH1cIj4ke2NvbnRhY3REYi5lbWFpbH08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgLy9idWlsZHMgY29udGFjdCB0aHJvdWdoIHNvY2lhbCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNvbnRhY3RcIj5Db25uZWN0IG9uIHNvY2lhbCBtZWRpYTo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9XCJzb2NpYWwtbWVkaWFcIj5cbiAgICAgICAgICAgIGBcblxuICAgICAgICAgICAgICAgIC8vaXRlcmF0ZXMgdGhyb3VnaCBlYWNoIHNvY2lhbCBzaXRlXG4gICAgICAgICAgICAgICAgY29udGFjdERiLnNvY2lhbC5mb3JFYWNoKHNpdGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwic29jaWFsXCI+PGEgaHJlZj1cIiR7c2l0ZS51cmx9XCI+JHtzaXRlLnNlcnZpY2V9PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAvL2Nsb3NpbmcgdGFncyBmb3IgdW5vcmRlcmVkIGxpc3QgYW5kIGNvbnRhY3Qgc2VjdGlvblxuICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhY3RTdHJpbmdcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRhY3RET00iLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSBjb250YWN0IGluZm9ybWF0aW9uXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCBjb250YWN0Q29uZW50ID0gcmVxdWlyZShcIi4vY29udGFjdENvbnRyb2xsZXJcIilcblxuY29uc3QgZGlzcGxheUNvbnRhY3QgPSAoKSA9PiB7XG4gICAgY29udGFjdENvbmVudCgpLnRoZW4oY29udGFjdFN0cmluZyA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWN0SGVhZGVyID0gXCI8aDE+Q29udGFjdCBNZTwvaDE+XCJcbiAgICAgICAgY29uc3QgY29udGFjdEluZm8gPSBjb250YWN0U3RyaW5nXG4gICAgICAgIFxuICAgICAgICBkaXNwbGF5UGFnZShjb250YWN0SGVhZGVyLCBjb250YWN0SW5mbykgLy9kaXNwbGF5UGFnZSBuZWVkcyB0byBiZSB3aXRoaW4gdGhlIGNvbnRhY3RDb250ZW50KCkudGhlbiBiZWNhdXNlIGl0IGlzIGRlcGVuZGVudCBvbiB0aGUgc3RyaW5nIHRoYXQgaXMgcmV0dXJuZWQgd2hlbiB0aGUgdGhlbiBmdW5jdGlvbiBydW5zXG4gICAgICAgIFxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheUNvbnRhY3QiLCJjb25zdCBkb21FbCA9IHJlcXVpcmUoXCIuL2RvbUVsZW1lbnRzXCIpXG5cbmNvbnN0IG91dHB1dEVsID0gZG9tRWwoKVxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IChwYWdlSGVhZGVyLCBwYWdlQ29udGVudCkgPT4ge1xuXG4gICAgY29uc3QgaGVhZGVyRWwgPSBvdXRwdXRFbC5oZWFkZXJcbiAgICBoZWFkZXJFbC5odG1sKHBhZ2VIZWFkZXIpIC8vYWRkcyB0aGUgcGFnZSBoZWFkZXIgdG8gdGhlIGRvbVxuXG4gICAgY29uc3QgY29udGVudEVsID0gb3V0cHV0RWwuY29udGVudFxuICAgIGNvbnRlbnRFbC5odG1sKHBhZ2VDb250ZW50KSAvL2FkZHMgdGhlIGNvbnRlbnQgb2YgcGFnZSB0byB0aGUgZG9tXG5cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlQYWdlIiwiLy90aGlzIG1vZHVsZSBjYXB0dXJlcyB0aGUgZG9tIGVsZW1lbnRzIHRoYXQgd2lsbCBiZSB3cml0dGVuIHRvIHdoZW4gZWFjaCBwYWdlIGlzIGNhbGxlZFxuXG5jb25zdCBkb21FbGVtZW50cyA9ICgpID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG4gICAgICAgIFwiaGVhZGVyXCI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAkKFwiI3BhZ2UtaGVhZGVyXCIpIC8vZ2V0cyBoZWFkZXIgc2VjdGlvblxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRlbnRcIjoge1xuICAgICAgICAgICAgdmFsdWU6ICQoXCIjcGFnZS1jb250ZW50XCIpIC8vZ2V0cyBjb250ZW50IHNlY3Rpb25cbiAgICAgICAgfSxcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xuICAgICAgICAgICAgdmFsdWU6ICQoXCIjcGFnZS1maWx0ZXJcIikgLy9zZWN0aW9uIHRvIGFkZCBmaWx0ZXIgd2hlbiBwYWdlRmlsdGVyIGlzIGFkZGVkIHRvIGEgcGFnZVxuICAgICAgICB9LFxuICAgICAgICBcImZvb3RlclwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogJChcIiNwYWdlLWZvb3RlclwiKSAvL3NlY3Rpb24gdG8gYWRkIHBhZ2UgZm9vdGVyIHN1Y2ggYXMgcGFnaW5hdGlvblxuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUVsZW1lbnRzIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIC8vZGlzcGxheSBuYXZpZ2F0aW9uXG4gICAgY29uc3QgbmF2QmFyID0gcmVxdWlyZShcIi4vYnVpbGROYXZpZ2F0aW9uXCIpXG4gICAgXG4gICAgLy9kaXNwbGF5IGNvbnRhY3RcbiAgICBjb25zdCBjb250YWN0UGFnZSA9IHJlcXVpcmUoXCIuL2NvbnRhY3QvZGlzcGxheUNvbnRhY3RcIilcbiAgICAkKFwiLm5hdl9jb250YWN0XCIpLm9uKFwiY2xpY2tcIiwgY29udGFjdFBhZ2UpXG4gICAgXG4gICAgXG4gICAgLy9kaXNwbGF5IHByb2plY3RzXG4gICAgY29uc3QgcHJvamVjdFBhZ2UgPSByZXF1aXJlKFwiLi9wcm9qZWN0cy9kaXNwbGF5UHJvamVjdHNcIilcbiAgICAkKFwiLm5hdl9wcm9qZWN0c1wiKS5vbihcImNsaWNrXCIsIHByb2plY3RQYWdlKVxuICAgIC8vIHByb2plY3RQYWdlKClcbiAgICBcbiAgICAvL2Rpc3BsYXkgcmVzdW1lXG4gICAgY29uc3QgcmVzdW1lUGFnZSA9IHJlcXVpcmUoXCIuL3Jlc3VtZS9kaXNwbGF5UmVzdW1lXCIpXG4gICAgJChcIi5uYXZfcmVzdW1lXCIpLm9uKFwiY2xpY2tcIiwgcmVzdW1lUGFnZSlcbiAgICAvLyByZXN1bWVQYWdlKClcbiAgICBcbiAgICAvL2Rpc3BsYXkgYmxvZ1xuICAgIGNvbnN0IGJsb2dQYWdlID0gcmVxdWlyZShcIi4vYmxvZy9kaXNwbGF5QmxvZ3NcIilcbiAgICAkKFwiLm5hdl9ibG9nXCIpLm9uKFwiY2xpY2tcIiwgYmxvZ1BhZ2UpXG5cblxufSlcblxuIiwiY29uc3QgZG9tRWwgPSByZXF1aXJlKFwiLi9kb21FbGVtZW50c1wiKVxuXG4vL2ZpbHRlclBhZ2UgZnVuY3Rpb24gdGFrZXMgdHdvIHBhcmFtZXRlcnM6IHRoZSBkYXRhYmFzZSBpbiB3aGljaCB5b3Ugd2FudCB0byBmaWx0ZXIgdGhyb3VnaCBhbmQgdGhlIGZ1bmN0aW9uIHlvdSB3YW50IGV4ZWN1dGVkIG9uIHRoZSBkYXRhYmFzZVxuY29uc3QgZmlsdGVyUGFnZSA9IChkYkFycmF5LCBmdW5jKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0RWwgPSBkb21FbCgpXG4gICAgbGV0IHBhZ2VMb2FkID0gXCJcIlxuICAgIFxuICAgIGlmIChkYkFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy9jcmVhdGUgc2VhcmNoIGlucHV0XG4gICAgICAgIG91dHB1dEVsLmZpbHRlci5hcHBlbmQoXCI8cD5TZWFyY2g6IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuYW1lPVxcXCJwYWdlRmlsdGVyXFxcIiBwbGFjZWhvbGRlcj1cXFwic2VhcmNoIGFsbFxcXCI+PC9wPlwiKVxuICAgICAgICBcbiAgICAgICAgLy90YXJnZXRzIGlucHV0IHRvIGFkZCBhbiBldmVudExpc3RlbmVyXG4gICAgICAgIGNvbnN0IHBhZ2VTZWFyY2ggPSAkKFwiaW5wdXRbbmFtZT0ncGFnZUZpbHRlciddXCIpWzBdXG4gICAgICAgICAgICBcbiAgICAgICAgcGFnZUxvYWQgPSBmdW5jKGRiQXJyYXkpIC8vaW5pdGlhbCBwYWdlIGxvYWQgb2YgaXRlbXNcbiAgICAgICAgXG4gICAgICAgIHBhZ2VTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIFwia2V5dXBcIixcbiAgICAgICAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZihldmVudC50YXJnZXQudmFsdWUubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb252ZXJ0IHdoYXQgaXMgYmVpbmcgZmlsdGVyZWQgdG8gbG93ZXJjYXNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJGaWx0ZXJTdHJpbmcgPSBldmVudC50YXJnZXQudmFsdWUudG9Mb3dlckNhc2UoKVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYWdlRmlsdGVyID0gZGJBcnJheS5maWx0ZXIoZmlsdGVyZWRJdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihrZXkgaW4gZmlsdGVyZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGZpbHRlcmVkSXRlbVtrZXldXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModXNlckZpbHRlclN0cmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy9vdXRwdXQuY29udGVudC5odG1sKHBhZ2VMb2FkKSByZXBvcHVsYXRlcyB0aGUgY29udGVudCBhcmVhIHdoZW4gdXNlciB0eXBlcyBpbiBzZWFyY2ggYmFyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhZ2VGaWx0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlTG9hZCA9IFwiPGgzPlNlYXJjaCBSZXN1bHRzIE5vdCBGb3VuZDwvaDM+XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dEVsLmNvbnRlbnQuaHRtbChwYWdlTG9hZCkgXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlTG9hZCA9IGZ1bmMocGFnZUZpbHRlcikgLy9kaXNwbGF5cyBmaWx0ZXJlZCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0RWwuY29udGVudC5odG1sKHBhZ2VMb2FkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZUxvYWQ9IGZ1bmMoZGJBcnJheSkgLy9kaXNwbGF5cyBpbml0aWFsIHBhZ2UgbG9hZCBpZiBzZWxlY3RvciBoYXMgbGVzcyB0aGFuIHRocmVlIGNoYXJhY3RlcnNcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0RWwuY29udGVudC5odG1sKHBhZ2VMb2FkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICBcbiAgICB9XG4gICAgcmV0dXJuIHBhZ2VMb2FkXG59XG5cbm1vZHVsZS5leHBvcnRzID0gIGZpbHRlclBhZ2UiLCJjb25zdCBkb21FbCA9IHJlcXVpcmUoXCIuL2RvbUVsZW1lbnRzXCIpXG5cbmNvbnN0IHBhZ2luYXRlID0gKGl0ZW1zLCBmdW5jKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0RWwgPSBkb21FbCgpXG4gICAgY29uc3QgdG90YWxJdGVtcyA9IGl0ZW1zLmxlbmd0aFxuICAgIGNvbnN0IGl0ZW1zUGVyUGFnZSA9IDVcbiAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBpdGVtc1BlclBhZ2UpXG4gICAgY29uc3QgcGFnaW5hdGlvbkVsID0gb3V0cHV0RWwuZm9vdGVyXG5cbiAgICAvLyBCdWlsZCB0aGUgRE9NIHN0cmluZyBmb3IgdGhlIHBhZ2luYXRpb24gbGlua3MgaW4gdGhlIGZvb3RlclxuICAgIGxldCBwYWdpbmF0aW9uU3RyaW5nID0gXCI8dWw+XCI7XG4gICAgcGFnaW5hdGlvblN0cmluZyArPSBcIjxhIGlkPSdwcmV2aW91cycgaHJlZj0nIyc+Jmx0OzwvYT5cIjsgLy9nZW5lcmF0ZXMgcHJldmlvdXMgYnV0dG9uXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZlBhZ2VzOyBpKyspIHtcbiAgICAgICAgcGFnaW5hdGlvblN0cmluZyArPSBgIDxsaT48YSBjbGFzcz1cInBhZ2UgcGFnZS0ke2krMX1cIiBocmVmPVwiI1wiPiR7aSsxfTwvYT48L2xpPmAgLy9nZW5lcmF0ZXMgdGhlIGNvcnJlY3QgbnVtYmVyIG9mIGJsb2cgcGFnZSBidXR0b25zIGFuZCBnaXZlcyB0aGVtIGEgY2xhc3Mgb2YgYmxvZ1BhZ2UgYW5kIHBhZ2UtI1xuICAgIH1cbiAgICBwYWdpbmF0aW9uU3RyaW5nICs9IFwiIDxhIGlkPSduZXh0JyBjbGFzcz0ncGFnZS0yJyBocmVmPScjJz4mZ3Q7PC9hPlwiOyAvL2dlbmVyYXRlcyBuZXh0IGJ1dHRvbiwgZGVmYXVsdCBjbGFzcyBpcyBwYWdlLTJcbiAgICBwYWdpbmF0aW9uU3RyaW5nICs9IFwiPC91bD5cIjtcblxuICAgIHBhZ2luYXRpb25FbC5odG1sKHBhZ2luYXRpb25TdHJpbmcpOyAvL2FkZCB0byBET01cblxuICAgIC8vIHJlZmVyZW5jZXMgdG8gdGhlIG5leHQgYW5kIHByZXZpb3VzIGFycm93c1xuICAgIGNvbnN0IHByZXZpb3VzRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZXZpb3VzXCIpOyBcbiAgICBjb25zdCBuZXh0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5leHRcIik7XG5cbiAgICAvL2Z1bmN0aW9uIHRvIGludm9rZSB3aGVuIHVzZXIgY2xpY2tzIHBhZ2luYXRpb24gbGluayBhdCBib3R0b20gb2YgcGFnZVxuICAgIGZ1bmN0aW9uIHByb2R1Y2VJdGVtcyhldmVudCkge1xuXG4gICAgICAgIC8vd2hhdCBkaWQgdGhlIHVzZXIgY2xpY2tcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSBwYXJzZUludCAoIC8vcGFyc2Ugc2luY2UgdGhlIGFycmF5IHdpbGwgcmV0dXJuIGEgc3RyaW5nXG4gICAgICAgICAgICBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QpIC8vdGFyZ2V0IGNsYXNzZXMgb24gdGhlIGNsaWNrZWQgcGFnaW5hdGlvbiBsaW5rXG4gICAgICAgICAgICAgICAgLmZpbmQocGFnZUNsYXNzID0+IHsgXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYWdlQ2xhc3Muc3RhcnRzV2l0aChcInBhZ2UtXCIpKSByZXR1cm4gcGFnZUNsYXNzIC8vaWYgY2xhc3Mgc3RhcnRzIHdpdGggXCJwYWdlLVwiIHRoZW4gcmV0dXJuIHRoYXQgY2xhc3NcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIi1cIilbMV0gLy9zcGxpdCBjbGFzcyB1c2luZyB0aGUgXCItXCIgYXMgdGhlIGRlbGltaXRlciwgWzBdPXBhZ2UgWzFdPSMsIGN1cnJlbnRQYWdlID0gI1xuICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgLy9jaGFuZ2UgY2xhc3Mgb2YgcHJldmlvdXMgYXJyb3dcbiAgICAgICAgaWYgKChjdXJyZW50UGFnZSAtIDEpID09PSAwICkgeyAvL2lmIHRoZSBjdXJyZW50IHBhZ2UgLTEgaXMgMCBcbiAgICAgICAgICAgIHByZXZpb3VzRWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7IC8vdGhlbiBkb24ndCBkaXNwbGF5IHByZXZpb3VzIGFycm93XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcmV2aW91c0VsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjsgLy9pZiBncmVhdGVyIHRoYW4gMCB0aGVuIGRpc3BsYXkgYXJyb3cgXG4gICAgICAgICAgICBwcmV2aW91c0VsLmNsYXNzTmFtZSA9IGBwYWdlLSR7Y3VycmVudFBhZ2UgLSAxfWAgLy9hbmQgYWRkIHRoZSBjbGFzcyBvZiB0aGUgcHJldmlvdXMgcGFnZVxuICAgICAgICB9XG4gICAgICAgIC8vY2hhbmdlIGNsYXNzIG9mIG5leHQgYXJyb3dcbiAgICAgICAgaWYgKChjdXJyZW50UGFnZSArIDEpID4gbnVtYmVyT2ZQYWdlcyApIHsgLy9pZiB0aGUgY3VycmVudCBwYWdlICsxIGlzIG1vcmUgdGhhbiB0aGUgdG90YWwgcGFnZXMgXG4gICAgICAgICAgICBuZXh0RWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7IC8vdGhlbiBkb24ndCBkaXNwbGF5IG5leHQgYXJyb3dcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHRFbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7IC8vaWYgbGVzcyB0aGFuIHRvdGFsIHBhZ2VzIHRoZW4gZGlzcGxheSBhcnJvdyBcbiAgICAgICAgICAgIG5leHRFbC5jbGFzc05hbWUgPSBgcGFnZS0ke2N1cnJlbnRQYWdlICsgMX1gIC8vYW5kIGFkZCB0aGUgY2xhc3Mgb2YgdGhlIG5leHQgcGFnZVxuICAgICAgICB9XG5cbiAgICAgICAgLy9kZXRlcm1pbmUgYmxvZ3MgdG8gZGlzcGxheSBieSBzbGljaW5nIGFycmF5XG4gICAgICAgIGNvbnN0IGJlZ2luID0gKGN1cnJlbnRQYWdlLTEpICogaXRlbXNQZXJQYWdlOyAvL2N1cnJlbnQgcGFnZSBtaW51cyBvbmUsIHRoZW4gbXVsdGlwbHkgYnkgaXRlbXMgcGVyIHBhZ2VcbiAgICAgICAgY29uc3QgZW5kID0gY3VycmVudFBhZ2UgKiBpdGVtc1BlclBhZ2U7IC8vY3VycmVudCBwYWdlIG11bHRpcGxpZWQgYnkgaXRlbXMgcGVyIHBhZ2VcbiAgICAgICAgY29uc3QgaXRlbXNUb0Rpc3BsYXkgPSBpdGVtcy5zbGljZShiZWdpbiwgZW5kKTtcblxuICAgICAgICAvL2l0ZXJhdGUgdGhyb3VnaCBpdGVtc1RvRGlzcGxheSBhbmQgaW5zZXJ0cyB0aGVtIGludG8gRE9NXG4gICAgICAgIGNvbnN0IHBhZ2VMb2FkID0gZnVuYyhpdGVtc1RvRGlzcGxheSkgLy9mdW5jdGlvbiB0byB1cGRhdGUgZG9tXG4gICAgICAgIGRlYnVnZ2VyXG5cbiAgICAgICAgb3V0cHV0RWwuY29udGVudC5odG1sKHBhZ2VMb2FkKVxuICAgIFxuICAgIH0vL2VuZCBvZiBwcm9kdWNlSXRlbXNcblxuICAgIC8vIEdldCB0aGUgYXJyYXkgb2YgcGFnaW5hdGlvbiBhbmNob3IgdGFncyB3ZSBhZGRlZCB0byB0aGUgRE9NXG4gICAgY29uc3QgcGFnZUxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBhZ2VcIik7XG4gICAgXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyB0byBlYWNoIDxhPiBlbGVtZW50IGluIHRoZSBwYWdpbmF0aW9uXG4gICAgcGFnZUxpbmtzLmZvckVhY2goIGxpbmsgPT4ge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9kdWNlSXRlbXMsIGZhbHNlKSAvL3doZW4gcGFnaW5hdGlvbiBsaW5rIGlzIGNsaWNrZWQsIHJ1biBwcm9kdWNlSXRlbXMgZnVuY3Rpb24gXG4gICAgfSlcbiAgICBcbiAgICAvL2RlZmF1bHQgc28gdGhhdCBmaXJzdCBwYWdlIGxvYWRzXG4gICAgcHJvZHVjZUl0ZW1zKHtcbiAgICAgICAgXCJ0YXJnZXRcIjoge1xuICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1wicGFnZS0xXCJdXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL2V2ZW50IGxpc3RlbmVycyBmb3IgcHJldmlvdXMgYW5kIG5leHQgZWxlbWVudHNcbiAgICBwcmV2aW91c0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9kdWNlSXRlbXMsIGZhbHNlKTtcbiAgICBuZXh0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2R1Y2VJdGVtcywgZmFsc2UpO1xuXG59Ly9lbmQgb2YgcGFnaW5hdGVcblxubW9kdWxlLmV4cG9ydHMgPSBwYWdpbmF0ZSIsIi8vdGhpcyBtb2R1bGUgd2lsbCBkaXNwbGF5IHByb2plY3QgaW5mb3JtYXRpb25cblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IHByb2plY3RDb250ZW50ID0gcmVxdWlyZShcIi4vcHJvamVjdHNDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlQcm9qZWN0ID0gKCkgPT4ge1xuICAgIFxuICAgIHByb2plY3RDb250ZW50KCkudGhlbiggcHJvZHVjdFN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RIZWFkZXIgPSBcIjxoMT5LcmlzdGVuJ3MgUHJvamVjdHM8L2gxPlwiXG4gICAgICAgIGNvbnN0IHByb2plY3RJbmZvID0gcHJvZHVjdFN0cmluZ1xuICAgIFxuICAgICAgICBkaXNwbGF5UGFnZShwcm9qZWN0SGVhZGVyLCBwcm9qZWN0SW5mbylcbiAgICB9KVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheVByb2plY3RcbiIsImNvbnN0IHByb2plY3RDb250ZW50ID0gKGl0ZW1BcnJheSkgPT4ge1xuICAgIGxldCBwcm9qZWN0U3RyaW5nID0gXCJcIlxuICAgIC8vIGJ1aWxkcyBwcm9qZWN0IHNlY3Rpb25cbiAgICBwcm9qZWN0U3RyaW5nICs9IGBcbiAgICA8c2VjdGlvbiBpZD1cInByb2plY3RzXCI+XG4gICAgYFxuICAgIC8vaXRlcmF0ZSB0aHJvdWdoIGVhY2ggcHJvamVjdCBhbmQgYWRkIHRvIHByb2plY3RTdHJpbmdcbiAgICBpdGVtQXJyYXkuZm9yRWFjaChcbiAgICAgICAgcHJvamVjdCA9PiB7XG4gICAgICAgICAgICBwcm9qZWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwicHJvamVjdFwiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInByb2plY3QtbmFtZVwiPiR7cHJvamVjdC5uYW1lfTwvaDI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9qZWN0LWRhdGVcIj48Yj5EYXRlIENvbXBsZXRlZDo8L2I+ICR7cHJvamVjdC5kYXRlX2NvbXBsZXRlZH08L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9qZWN0LXRlY2hcIj48Yj5UZWNobm9sb2dpZXMgVXNlZDo8L2I+ICR7cHJvamVjdC50ZWNobm9sb2dpZXNfdXNlZH08L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9qZWN0LXRlYW1cIj48Yj5UZWFtbWF0ZXMgKGlmIGFwcGxpY2FibGUpOjwvYj4gJHtwcm9qZWN0LnRlYW1tYXRlc308L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9qZWN0LWRlc2NyaXB0aW9uXCI+JHtwcm9qZWN0LmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgIGBcblxuICAgICAgICB9XG4gICAgKVxuXG4gICAgLy9jbG9zaW5nIHRhZyBmb3IgcHJvamVjdCBzZWN0aW9uXG4gICAgcHJvamVjdFN0cmluZyArPSBgXG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICBgXG4gICAgcmV0dXJuIHByb2plY3RTdHJpbmdcbiAgICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcm9qZWN0Q29udGVudCIsIi8vY29udHJvbHMgaG93IHRoZSBjb250ZW50IGlzIHdyaXR0ZW4gdG8gdGhlIGRvbSBmb3IgcHJvamVjdHMgcGFnZVxuY29uc3QgcHJvamVjdEZpbHRlciA9IHJlcXVpcmUoXCIuLi9wYWdlRmlsdGVyXCIpXG5jb25zdCBwcm9qZWN0Q29udGVudCA9IHJlcXVpcmUoXCIuL3Byb2plY3RDb250ZW50XCIpXG5cbmNvbnN0IHByb2plY3RzRE9NID0gKCkgPT4ge1xuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vcGVyc29uYWwtc2l0ZS1jZjFiOC5maXJlYmFzZWlvLmNvbS9wcm9qZWN0cy5qc29uXCIsXG4gICAgICAgIFwibWV0aG9kXCI6IFwiR0VUXCIgIFxuICAgIH0pLnRoZW4oXG4gICAgICAgIHByb2plY3REYiA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0RmlsdGVyKHByb2plY3REYiwgcHJvamVjdENvbnRlbnQpXG5cbiAgICAgICAgfVxuICAgIClcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb2plY3RzRE9NXG5cbiIsIi8vdGhpcyBtb2R1bGUgd2lsbCBkaXNwbGF5IHJlc3VtZSBpbmZvcm1hdGlvblxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IHJlcXVpcmUoXCIuLi9kaXNwbGF5UGFnZVwiKVxuY29uc3QgcmVzdW1lQ29udGVudCA9IHJlcXVpcmUoXCIuL3Jlc3VtZUNvbnRyb2xsZXJcIilcblxuY29uc3QgZGlzcGxheVJlc3VtZSA9ICgpID0+IHtcbiAgICBcbiAgICByZXN1bWVDb250ZW50KCkudGhlbiggcmVzdW1lU3RyaW5nID0+IHtcbiAgICAgICAgY29uc3QgcmVzdW1lSGVhZGVyID0gXCI8aDE+Sm9iIEhpc3RvcnkgZm9yIEtyaXN0ZW4gTm9ycmlzPC9oMT5cIlxuICAgICAgICBjb25zdCByZXN1bWVJbmZvID0gcmVzdW1lU3RyaW5nXG4gICAgXG4gICAgICAgIGRpc3BsYXlQYWdlKHJlc3VtZUhlYWRlciwgcmVzdW1lSW5mbylcbiAgICB9KVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheVJlc3VtZSIsIi8vY29udHJvbHMgaG93IHRoZSBjb250ZW50IGlzIHdyaXR0ZW4gdG8gdGhlIGRvbSBmb3IgcmVzdW1lIHBhZ2VcblxuY29uc3QgcmVzdW1lRE9NID0gKCkgPT4ge1xuXG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9wZXJzb25hbC1zaXRlLWNmMWI4LmZpcmViYXNlaW8uY29tL3Jlc3VtZS5qc29uXCIsXG4gICAgICAgIFwibWV0aG9kXCI6IFwiR0VUXCJcbiAgICB9KVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAgIHJlc3VtZURiID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdW1lU3RyaW5nID0gXCJcIlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJlc3VtZURiLmZvckVhY2goIGpvYiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VtZVN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwiam9iXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cImNvbXBhbnlcIj4ke2pvYi5jb21wYW55fSAoJHtqb2IubG9jYXRpb259KTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj4ke2pvYi5wb3NpdGlvbn08L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz4ke2pvYi5zdGFydERhdGV9IC0gJHtqb2IuZW5kRGF0ZX08L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN1bW1hcnlcIj48Yj5TdW1tYXJ5OiA8L2I+JHtqb2Iuc3VtbWFyeX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJyZXNwb25zaWJpbGl0aWVzXCI+PGI+UmVzcG9uc2liaWxpdGllcyBpbmNsdWRlZDogPC9iPiR7am9iLnJlc3BvbnNpYmlsaXRpZXN9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VtZVN0cmluZ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXN1bWVET00iXX0=
