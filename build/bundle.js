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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0NvbnRlbnQuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0NvbnRyb2xsZXIuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0ZpbHRlci5qcyIsInNjcmlwdHMvYmxvZy9kaXNwbGF5QmxvZ3MuanMiLCJzY3JpcHRzL2J1aWxkTmF2aWdhdGlvbi5qcyIsInNjcmlwdHMvY29udGFjdC9jb250YWN0Q29udHJvbGxlci5qcyIsInNjcmlwdHMvY29udGFjdC9kaXNwbGF5Q29udGFjdC5qcyIsInNjcmlwdHMvZGlzcGxheVBhZ2UuanMiLCJzY3JpcHRzL2RvbUVsZW1lbnRzLmpzIiwic2NyaXB0cy9tYWluLmpzIiwic2NyaXB0cy9wYWdlRmlsdGVyLmpzIiwic2NyaXB0cy9wYWdpbmF0ZS5qcyIsInNjcmlwdHMvcHJvamVjdHMvZGlzcGxheVByb2plY3RzLmpzIiwic2NyaXB0cy9wcm9qZWN0cy9wcm9qZWN0Q29udGVudC5qcyIsInNjcmlwdHMvcHJvamVjdHMvcHJvamVjdHNDb250cm9sbGVyLmpzIiwic2NyaXB0cy9yZXN1bWUvZGlzcGxheVJlc3VtZS5qcyIsInNjcmlwdHMvcmVzdW1lL3Jlc3VtZUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy90aGUgbW9kdWxlIGdlbmVyYXRlcyB0aGUgY29udGVudCBvZiB0aGUgYmxvZ3NcblxuY29uc3QgYmxvZ0NvbnRlbnQgPSAoaXRlbUFycmF5KSA9PiB7XG4gICAgbGV0IGJsb2dTdHJpbmcgPSBcIlwiXG4gICAgXG4gICAgLy9idWlsZHMgYmxvZyBzZWN0aW9uXG4gICAgYmxvZ1N0cmluZyArPSBgXG4gICAgPHNlY3Rpb24gaWQ9XCJwcm9qZWN0c1wiPlxuICAgIGBcbiAgICBcbiAgICAvLyBmb3IgZWFjaCBibG9nIGVudHJ5LCBidWlsZCB0aGUgZm9sbG93aW5nIGh0bWwgdG8gY3JlYXRlIGJsb2cgY29udGVudFxuICAgIGl0ZW1BcnJheS5mb3JFYWNoKFxuICAgICAgICBibG9nID0+IHsgXG4gICAgICAgICAgICBibG9nU3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8YXJ0aWNsZSBpZD1cImJsb2ctJHtibG9nLmlkfVwiIGNsYXNzPVwiYmxvZ1wiPlxuICAgICAgICAgICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwid2Vla051bVwiPiR7YmxvZy50aXRsZX08L2gyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwid2Vla0RhdGVcIj4ke2Jsb2cud2Vla19kYXRlc308L3A+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGgzPkNlbGVicmF0aW9ucyAmIEluc3BpcmF0aW9uczwvaDM+XG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgXG4gICAgICAgICAgICAvL2l0ZXJhdGVzIG92ZXIgY2VsZWJyYXRpb24gYXJyYXlcbiAgICAgICAgICAgIGJsb2cuY2VsZWJyYXRpb25zLmZvckVhY2goY2VsZWJyYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGJsb2dTdHJpbmcgKz0gYDxsaT4ke2NlbGVicmF0aW9ufTwvbGk+YDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJsb2dTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxoMz5DaGFsbGVuZ2VzICYgSGFuZy1VcHM8L2gzPlxuICAgICAgICAgICAgICAgIDx1bD5gXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vaXRlcmF0ZXMgb3ZlciBjaGFsbGVuZ2VzIGFycmF5XG4gICAgICAgICAgICBibG9nLmNoYWxsZW5nZXMuZm9yRWFjaChjaGFsbGVuZ2UgPT4ge1xuICAgICAgICAgICAgICAgIGJsb2dTdHJpbmcgKz0gYDxsaT4ke2NoYWxsZW5nZX08L2xpPmA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBibG9nU3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8Zm9vdGVyPlxuICAgICAgICAgICAgICAgIDxzcGFuPlBvc3RlZCBieSAke2Jsb2cuYXV0aG9yfSBvbiAke2Jsb2cucHVibGlzaGVkfTwvdGltZT48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgKVxuICAgIFxuICAgIC8vY2xvc2luZyB0YWcgZm9yIGJsb2cgc2VjdGlvblxuICAgIGJsb2dTdHJpbmcgKz0gYFxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgYFxuXG4gICAgcmV0dXJuIGJsb2dTdHJpbmdcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBibG9nQ29udGVudFxuIiwiLy9jb250cm9scyBob3cgdGhlIGNvbnRlbnQgaXMgd3JpdHRlbiB0byB0aGUgZG9tIGZvciBibG9nIHBhZ2VcbmNvbnN0IHBhZ2luYXRlID0gcmVxdWlyZShcIi4uL3BhZ2luYXRlXCIpXG5jb25zdCBibG9nRmlsdGVyID0gcmVxdWlyZShcIi4uL3BhZ2VGaWx0ZXJcIilcbmNvbnN0IGZpbHRlciA9IHJlcXVpcmUoXCIuL2Jsb2dGaWx0ZXJcIilcbmNvbnN0IGJsb2dDb250ZW50ID0gcmVxdWlyZShcIi4vYmxvZ0NvbnRlbnRcIilcblxuY29uc3QgYmxvZ0RPTSA9ICgpID0+IHtcbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL3BlcnNvbmFsLXNpdGUtY2YxYjguZmlyZWJhc2Vpby5jb20vYmxvZy5qc29uXCIsXG4gICAgICAgIFwibWV0aG9kXCI6IFwiR0VUXCJcbiAgICB9KS50aGVuKFxuICAgICAgICBibG9nRGIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJsb2dGaWx0ZXIoYmxvZ0RiLCBibG9nQ29udGVudCwgZmlsdGVyKVxuICAgICAgICAgICAgLy8gcmV0dXJuIHBhZ2luYXRlKGJsb2dEYiwgYmxvZ0NvbnRlbnQpXG4gICAgICAgIH1cbiAgICApXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBibG9nRE9NIiwiXG5jb25zdCBibG9nc0ZpbHRlciA9IChkYXRhYmFzZSkgPT4ge1xuICAgIGRhdGFiYXNlLmZpbHRlcihcbiAgICAgICAgZmlsdGVyZWRCbG9nID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZEJsb2cudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh1c2VyRmlsdGVyU3RyaW5nKSB8fCAvL2xvb2sgdGhyb3VnaCB0aXRsZXNcbiAgICAgICAgICAgIGZpbHRlcmVkQmxvZy5jZWxlYnJhdGlvbnMuZmlsdGVyKCAvL2l0ZXJhdGUgb3ZlciB0aGUgY2VsZWJyYXRpb25zIGFycmF5XG4gICAgICAgICAgICAgICAgZmlsdGVyQ2VsZWJyYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyQ2VsZWJyYXRpb24udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh1c2VyRmlsdGVyU3RyaW5nKVxuICAgICAgICAgICAgICAgIH0pLmxlbmd0aCB8fCAvL2lmIHRoZSBsZW5ndGggaXMgMCB0aGVuIGl0IHJldHVybnMgZmFsc2VcbiAgICAgICAgICAgIGZpbHRlcmVkQmxvZy5jaGFsbGVuZ2VzLmZpbHRlciggLy9pdGVyYXRlIG92ZXIgdGhlIGNoYWxsZW5nZXMgYXJyYXlcbiAgICAgICAgICAgICAgICBmaWx0ZXJDaGFsbGVuZ2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyQ2hhbGxlbmdlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModXNlckZpbHRlclN0cmluZylcbiAgICAgICAgICAgICAgICB9KS5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZEJsb2cud2Vla19kYXRlcy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHVzZXJGaWx0ZXJTdHJpbmcpXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIClcbn1cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gYmxvZ3NGaWx0ZXIiLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSB0aGUgYmxvZ3NcblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IGJsb2dDb250ZW50ID0gcmVxdWlyZShcIi4vYmxvZ0NvbnRyb2xsZXJcIilcblxuY29uc3QgZGlzcGxheUJsb2cgPSAoKSA9PiB7XG5cbiAgICBcbiAgICBibG9nQ29udGVudCgpLnRoZW4oXG4gICAgICAgIGJsb2dTdHJpbmcgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmxvZ0hlYWRlciA9IFwiPGgxPk15IE5hc2h2aWxsZSBTb2Z0d2FyZSBTY2hvb2wgRXhwZXJpZW5jZTwvaDE+XCJcbiAgICAgICAgICAgIGNvbnN0IGJsb2dJbmZvID0gYmxvZ1N0cmluZ1xuXG4gICAgICAgICAgICBkaXNwbGF5UGFnZShibG9nSGVhZGVyLCBibG9nSW5mbylcbiAgICAgICAgfVxuICAgIClcblxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheUJsb2dcblxuLy8gY29uc3QgZGlzcGxheUJsb2cgPSAoKSA9PiB7XG4vLyAgICAgPGhlYWRlciBjbGFzcz1cInBhZ2UtaGVhZGVyXCI+XG4vLyAgICAgPGgxPk15IE5hc2h2aWxsZSBTb2Z0d2FyZSBTY2hvb2wgRXhwZXJpZW5jZTwvaDE+XG4vLyAgICAgPGEgaHJlZj1cIi4uL2FkbWluL2Jsb2cuaHRtbFwiPkFkbWluPC9hPlxuLy8gICAgIDwvaGVhZGVyPlxuXG4vLyAgICAgPHA+U2VhcmNoOiA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYmxvZ0ZpbHRlclwiIHBsYWNlaG9sZGVyPVwic2VhcmNoIGFsbCBibG9nIHBvc3RzXCI+PC9wPlxuLy8gICAgIDxzZWN0aW9uIGlkPVwiYmxvZy1wb3N0c1wiPlxuLy8gICAgIDwhLS0gcG9wdWxhdGVkIHRocm91Z2ggZGF0YWJhc2UgLS0+XG4vLyAgICAgPC9zZWN0aW9uPlxuXG5cbi8vICAgICA8Zm9vdGVyIGlkPVwiYmxvZy1wYWdpbmF0b3JcIj5cblxuLy8gICAgIDwvZm9vdGVyPlxuXG5cbi8vIH0iLCJjb25zdCBuYXZpZ2F0aW9uID0gW1xuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiSG9tZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIlJlc3VtZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkNvbnRhY3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJQcm9qZWN0c1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkJsb2dcIlxuICAgIH1cbl1cblxuY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LWl0ZW1zXCIpO1xuXG5jb25zdCBuYXZMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG5cbm5hdmlnYXRpb24uZm9yRWFjaChcbiAgICBwYWdlID0+IHtcbiAgICAgICAgY29uc3QgbmF2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcbiAgICAgICAgbmF2RWwuY2xhc3NMaXN0LmFkZChcIm5hdkxpbmtcIilcbiAgICAgICAgbmF2RWwuaWQgPSBgbmF2XyR7cGFnZS5kaXNwbGF5fWBcblxuICAgICAgICBjb25zdCBuYXZMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcbiAgICAgICAgbmF2TGluay5ocmVmID0gXCIjXCJcbiAgICAgICAgbmF2TGluay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwYWdlLmRpc3BsYXkpKVxuXG4gICAgICAgIG5hdkVsLmFwcGVuZENoaWxkKG5hdkxpbmspXG4gICAgICAgIG5hdkxpc3QuYXBwZW5kQ2hpbGQobmF2RWwpXG4gICAgfVxuKVxubmF2RWxlbWVudC5hcHBlbmRDaGlsZChuYXZMaXN0KVxuXG5tb2R1bGUuZXhwb3J0cyA9IG51bGwiLCIvL2NvbnRyb2xzIGhvdyB0aGUgY29udGVudCBpcyB3cml0dGVuIHRvIHRoZSBkb20gZm9yIGNvbnRhY3QgcGFnZVxuY29uc3QgY29udGFjdERPTSA9ICgpID0+IHtcblxuICAgIHJldHVybiAkLmFqYXgoeyAvL25lZWQgdG8gcmV0dXJuIGFqYXggZnVuY3Rpb24gc28gdGhhdCBjb250YWN0RE9NIGNhbiBhY2Nlc3MgdGhlIHN0cmluZyByZXR1cm5lZCBpbiAudGhlbigpXG4gICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9wZXJzb25hbC1zaXRlLWNmMWI4LmZpcmViYXNlaW8uY29tL2NvbnRhY3QuanNvblwiLFxuICAgICAgICBcIm1ldGhvZFwiOiBcIkdFVFwiXG4gICAgfSlcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICBjb250YWN0RGIgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb250YWN0U3RyaW5nID0gXCJcIjtcblxuICAgICAgICAgICAgICAgIC8vYnVpbGRzIGNvbnRhY3QgYnkgZW1haWwgc2VjdGlvblxuICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjb250YWN0XCI+U2VuZCBhbiBlbWFpbDo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9XCJzZW5kLWVtYWlsXCI+IFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZW1haWxcIj48YSBocmVmPVwibWFpbHRvOiR7Y29udGFjdERiLmVtYWlsfVwiPiR7Y29udGFjdERiLmVtYWlsfTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAvL2J1aWxkcyBjb250YWN0IHRocm91Z2ggc29jaWFsIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY29udGFjdFwiPkNvbm5lY3Qgb24gc29jaWFsIG1lZGlhOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBpZD1cInNvY2lhbC1tZWRpYVwiPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICAgICAgLy9pdGVyYXRlcyB0aHJvdWdoIGVhY2ggc29jaWFsIHNpdGVcbiAgICAgICAgICAgICAgICBjb250YWN0RGIuc29jaWFsLmZvckVhY2goc2l0ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJzb2NpYWxcIj48YSBocmVmPVwiJHtzaXRlLnVybH1cIj4ke3NpdGUuc2VydmljZX08L2E+PC9saT5cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIC8vY2xvc2luZyB0YWdzIGZvciB1bm9yZGVyZWQgbGlzdCBhbmQgY29udGFjdCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICBgXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFjdFN0cmluZ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29udGFjdERPTSIsIi8vdGhpcyBtb2R1bGUgd2lsbCBkaXNwbGF5IGNvbnRhY3QgaW5mb3JtYXRpb25cblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IGNvbnRhY3RDb25lbnQgPSByZXF1aXJlKFwiLi9jb250YWN0Q29udHJvbGxlclwiKVxuXG5jb25zdCBkaXNwbGF5Q29udGFjdCA9ICgpID0+IHtcbiAgICBjb250YWN0Q29uZW50KCkudGhlbihjb250YWN0U3RyaW5nID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbnRhY3RIZWFkZXIgPSBcIjxoMT5Db250YWN0IE1lPC9oMT5cIlxuICAgICAgICBjb25zdCBjb250YWN0SW5mbyA9IGNvbnRhY3RTdHJpbmdcbiAgICAgICAgXG4gICAgICAgIGRpc3BsYXlQYWdlKGNvbnRhY3RIZWFkZXIsIGNvbnRhY3RJbmZvKSAvL2Rpc3BsYXlQYWdlIG5lZWRzIHRvIGJlIHdpdGhpbiB0aGUgY29udGFjdENvbnRlbnQoKS50aGVuIGJlY2F1c2UgaXQgaXMgZGVwZW5kZW50IG9uIHRoZSBzdHJpbmcgdGhhdCBpcyByZXR1cm5lZCB3aGVuIHRoZSB0aGVuIGZ1bmN0aW9uIHJ1bnNcbiAgICAgICAgXG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5Q29udGFjdCIsImNvbnN0IGRvbUVsID0gcmVxdWlyZShcIi4vZG9tRWxlbWVudHNcIilcblxuY29uc3Qgb3V0cHV0RWwgPSBkb21FbCgpXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gKHBhZ2VIZWFkZXIsIHBhZ2VDb250ZW50KSA9PiB7XG5cbiAgICBjb25zdCBoZWFkZXJFbCA9IG91dHB1dEVsLmhlYWRlclxuICAgIGhlYWRlckVsLmh0bWwocGFnZUhlYWRlcikgLy9hZGRzIHRoZSBwYWdlIGhlYWRlciB0byB0aGUgZG9tXG5cbiAgICBjb25zdCBjb250ZW50RWwgPSBvdXRwdXRFbC5jb250ZW50XG4gICAgY29udGVudEVsLmh0bWwocGFnZUNvbnRlbnQpIC8vYWRkcyB0aGUgY29udGVudCBvZiBwYWdlIHRvIHRoZSBkb21cblxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheVBhZ2UiLCIvL3RoaXMgbW9kdWxlIGNhcHR1cmVzIHRoZSBkb20gZWxlbWVudHMgdGhhdCB3aWxsIGJlIHdyaXR0ZW4gdG8gd2hlbiBlYWNoIHBhZ2UgaXMgY2FsbGVkXG5cbmNvbnN0IGRvbUVsZW1lbnRzID0gKCkgPT4ge1xuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKG51bGwsIHtcbiAgICAgICAgXCJoZWFkZXJcIjoge1xuICAgICAgICAgICAgdmFsdWU6ICQoXCIjcGFnZS1oZWFkZXJcIikgLy9nZXRzIGhlYWRlciBzZWN0aW9uXG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGVudFwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogJChcIiNwYWdlLWNvbnRlbnRcIikgLy9nZXRzIGNvbnRlbnQgc2VjdGlvblxuICAgICAgICB9LFxuICAgICAgICBcImZpbHRlclwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogJChcIiNwYWdlLWZpbHRlclwiKSAvL3NlY3Rpb24gdG8gYWRkIGZpbHRlciB3aGVuIHBhZ2VGaWx0ZXIgaXMgYWRkZWQgdG8gYSBwYWdlXG4gICAgICAgIH0sXG4gICAgICAgIFwiZm9vdGVyXCI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAkKFwiI3BhZ2UtZm9vdGVyXCIpIC8vc2VjdGlvbiB0byBhZGQgcGFnZSBmb290ZXIgc3VjaCBhcyBwYWdpbmF0aW9uXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZG9tRWxlbWVudHMiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgLy9kaXNwbGF5IG5hdmlnYXRpb25cbiAgICBjb25zdCBuYXZCYXIgPSByZXF1aXJlKFwiLi9idWlsZE5hdmlnYXRpb25cIilcbiAgICBcbiAgICAvL2Rpc3BsYXkgY29udGFjdFxuICAgIGNvbnN0IGNvbnRhY3RQYWdlID0gcmVxdWlyZShcIi4vY29udGFjdC9kaXNwbGF5Q29udGFjdFwiKVxuICAgIC8vIGNvbnRhY3RQYWdlKClcblxuICAgIFxuICAgIC8vZGlzcGxheSBwcm9qZWN0c1xuICAgIGNvbnN0IHByb2plY3RQYWdlID0gcmVxdWlyZShcIi4vcHJvamVjdHMvZGlzcGxheVByb2plY3RzXCIpXG4gICAgLy8gcHJvamVjdFBhZ2UoKVxuXG4gICAgLy9kaXNwbGF5IHJlc3VtZVxuICAgIGNvbnN0IHJlc3VtZVBhZ2UgPSByZXF1aXJlKFwiLi9yZXN1bWUvZGlzcGxheVJlc3VtZVwiKVxuICAgIC8vIHJlc3VtZVBhZ2UoKVxuICAgIFxuICAgIC8vZGlzcGxheSBibG9nXG4gICAgY29uc3QgYmxvZ1BhZ2UgPSByZXF1aXJlKFwiLi9ibG9nL2Rpc3BsYXlCbG9nc1wiKVxuICAgIGJsb2dQYWdlKClcblxuXG59KVxuXG4iLCJjb25zdCBkb21FbCA9IHJlcXVpcmUoXCIuL2RvbUVsZW1lbnRzXCIpXG5cbi8vZmlsdGVyUGFnZSBmdW5jdGlvbiB0YWtlcyB0d28gcGFyYW1ldGVyczogdGhlIGRhdGFiYXNlIGluIHdoaWNoIHlvdSB3YW50IHRvIGZpbHRlciB0aHJvdWdoIGFuZCB0aGUgZnVuY3Rpb24geW91IHdhbnQgZXhlY3V0ZWQgb24gdGhlIGRhdGFiYXNlXG5jb25zdCBmaWx0ZXJQYWdlID0gKGRiQXJyYXksIGZ1bmMpID0+IHtcbiAgICBjb25zdCBvdXRwdXRFbCA9IGRvbUVsKClcbiAgICBsZXQgcGFnZUxvYWQgPSBcIlwiXG4gICAgXG4gICAgaWYgKGRiQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAvL2NyZWF0ZSBzZWFyY2ggaW5wdXRcbiAgICAgICAgb3V0cHV0RWwuZmlsdGVyLmFwcGVuZChcIjxwPlNlYXJjaDogPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcInBhZ2VGaWx0ZXJcXFwiIHBsYWNlaG9sZGVyPVxcXCJzZWFyY2ggYWxsXFxcIj48L3A+XCIpXG4gICAgICAgIFxuICAgICAgICAvL3RhcmdldHMgaW5wdXQgdG8gYWRkIGFuIGV2ZW50TGlzdGVuZXJcbiAgICAgICAgY29uc3QgcGFnZVNlYXJjaCA9ICQoXCJpbnB1dFtuYW1lPSdwYWdlRmlsdGVyJ11cIilbMF1cbiAgICAgICAgICAgIFxuICAgICAgICBwYWdlTG9hZCA9IGZ1bmMoZGJBcnJheSkgLy9pbml0aWFsIHBhZ2UgbG9hZCBvZiBpdGVtc1xuICAgICAgICBcbiAgICAgICAgcGFnZVNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgXCJrZXl1cFwiLFxuICAgICAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnZlcnQgd2hhdCBpcyBiZWluZyBmaWx0ZXJlZCB0byBsb3dlcmNhc2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlckZpbHRlclN0cmluZyA9IGV2ZW50LnRhcmdldC52YWx1ZS50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhZ2VGaWx0ZXIgPSBkYkFycmF5LmZpbHRlcihmaWx0ZXJlZEl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGtleSBpbiBmaWx0ZXJlZEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gZmlsdGVyZWRJdGVtW2tleV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh1c2VyRmlsdGVyU3RyaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvL291dHB1dC5jb250ZW50Lmh0bWwocGFnZUxvYWQpIHJlcG9wdWxhdGVzIHRoZSBjb250ZW50IGFyZWEgd2hlbiB1c2VyIHR5cGVzIGluIHNlYXJjaCBiYXJcbiAgICAgICAgICAgICAgICAgICAgaWYocGFnZUZpbHRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VMb2FkID0gXCI8aDM+U2VhcmNoIFJlc3VsdHMgTm90IEZvdW5kPC9oMz5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0RWwuY29udGVudC5odG1sKHBhZ2VMb2FkKSBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VMb2FkID0gZnVuYyhwYWdlRmlsdGVyKSAvL2Rpc3BsYXlzIGZpbHRlcmVkIGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRFbC5jb250ZW50Lmh0bWwocGFnZUxvYWQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYWdlTG9hZD0gZnVuYyhkYkFycmF5KSAvL2Rpc3BsYXlzIGluaXRpYWwgcGFnZSBsb2FkIGlmIHNlbGVjdG9yIGhhcyBsZXNzIHRoYW4gdGhyZWUgY2hhcmFjdGVyc1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXRFbC5jb250ZW50Lmh0bWwocGFnZUxvYWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIFxuICAgIH1cbiAgICByZXR1cm4gcGFnZUxvYWRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSAgZmlsdGVyUGFnZSIsImNvbnN0IGRvbUVsID0gcmVxdWlyZShcIi4vZG9tRWxlbWVudHNcIilcblxuY29uc3QgcGFnaW5hdGUgPSAoaXRlbXMsIGZ1bmMpID0+IHtcbiAgICBjb25zdCBvdXRwdXRFbCA9IGRvbUVsKClcbiAgICBjb25zdCB0b3RhbEl0ZW1zID0gaXRlbXMubGVuZ3RoXG4gICAgY29uc3QgaXRlbXNQZXJQYWdlID0gNVxuICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwodG90YWxJdGVtcyAvIGl0ZW1zUGVyUGFnZSlcbiAgICBjb25zdCBwYWdpbmF0aW9uRWwgPSBvdXRwdXRFbC5mb290ZXJcblxuICAgIC8vIEJ1aWxkIHRoZSBET00gc3RyaW5nIGZvciB0aGUgcGFnaW5hdGlvbiBsaW5rcyBpbiB0aGUgZm9vdGVyXG4gICAgbGV0IHBhZ2luYXRpb25TdHJpbmcgPSBcIjx1bD5cIjtcbiAgICBwYWdpbmF0aW9uU3RyaW5nICs9IFwiPGEgaWQ9J3ByZXZpb3VzJyBocmVmPScjJz4mbHQ7PC9hPlwiOyAvL2dlbmVyYXRlcyBwcmV2aW91cyBidXR0b25cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mUGFnZXM7IGkrKykge1xuICAgICAgICBwYWdpbmF0aW9uU3RyaW5nICs9IGAgPGxpPjxhIGNsYXNzPVwicGFnZSBwYWdlLSR7aSsxfVwiIGhyZWY9XCIjXCI+JHtpKzF9PC9hPjwvbGk+YCAvL2dlbmVyYXRlcyB0aGUgY29ycmVjdCBudW1iZXIgb2YgYmxvZyBwYWdlIGJ1dHRvbnMgYW5kIGdpdmVzIHRoZW0gYSBjbGFzcyBvZiBibG9nUGFnZSBhbmQgcGFnZS0jXG4gICAgfVxuICAgIHBhZ2luYXRpb25TdHJpbmcgKz0gXCIgPGEgaWQ9J25leHQnIGNsYXNzPSdwYWdlLTInIGhyZWY9JyMnPiZndDs8L2E+XCI7IC8vZ2VuZXJhdGVzIG5leHQgYnV0dG9uLCBkZWZhdWx0IGNsYXNzIGlzIHBhZ2UtMlxuICAgIHBhZ2luYXRpb25TdHJpbmcgKz0gXCI8L3VsPlwiO1xuXG4gICAgcGFnaW5hdGlvbkVsLmh0bWwocGFnaW5hdGlvblN0cmluZyk7IC8vYWRkIHRvIERPTVxuXG4gICAgLy8gcmVmZXJlbmNlcyB0byB0aGUgbmV4dCBhbmQgcHJldmlvdXMgYXJyb3dzXG4gICAgY29uc3QgcHJldmlvdXNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJldmlvdXNcIik7IFxuICAgIGNvbnN0IG5leHRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV4dFwiKTtcblxuICAgIC8vZnVuY3Rpb24gdG8gaW52b2tlIHdoZW4gdXNlciBjbGlja3MgcGFnaW5hdGlvbiBsaW5rIGF0IGJvdHRvbSBvZiBwYWdlXG4gICAgZnVuY3Rpb24gcHJvZHVjZUl0ZW1zKGV2ZW50KSB7XG5cbiAgICAgICAgLy93aGF0IGRpZCB0aGUgdXNlciBjbGlja1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHBhcnNlSW50ICggLy9wYXJzZSBzaW5jZSB0aGUgYXJyYXkgd2lsbCByZXR1cm4gYSBzdHJpbmdcbiAgICAgICAgICAgIEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LmNsYXNzTGlzdCkgLy90YXJnZXQgY2xhc3NlcyBvbiB0aGUgY2xpY2tlZCBwYWdpbmF0aW9uIGxpbmtcbiAgICAgICAgICAgICAgICAuZmluZChwYWdlQ2xhc3MgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhZ2VDbGFzcy5zdGFydHNXaXRoKFwicGFnZS1cIikpIHJldHVybiBwYWdlQ2xhc3MgLy9pZiBjbGFzcyBzdGFydHMgd2l0aCBcInBhZ2UtXCIgdGhlbiByZXR1cm4gdGhhdCBjbGFzc1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiLVwiKVsxXSAvL3NwbGl0IGNsYXNzIHVzaW5nIHRoZSBcIi1cIiBhcyB0aGUgZGVsaW1pdGVyLCBbMF09cGFnZSBbMV09IywgY3VycmVudFBhZ2UgPSAjXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICAvL2NoYW5nZSBjbGFzcyBvZiBwcmV2aW91cyBhcnJvd1xuICAgICAgICBpZiAoKGN1cnJlbnRQYWdlIC0gMSkgPT09IDAgKSB7IC8vaWYgdGhlIGN1cnJlbnQgcGFnZSAtMSBpcyAwIFxuICAgICAgICAgICAgcHJldmlvdXNFbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjsgLy90aGVuIGRvbid0IGRpc3BsYXkgcHJldmlvdXMgYXJyb3dcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZXZpb3VzRWwuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiOyAvL2lmIGdyZWF0ZXIgdGhhbiAwIHRoZW4gZGlzcGxheSBhcnJvdyBcbiAgICAgICAgICAgIHByZXZpb3VzRWwuY2xhc3NOYW1lID0gYHBhZ2UtJHtjdXJyZW50UGFnZSAtIDF9YCAvL2FuZCBhZGQgdGhlIGNsYXNzIG9mIHRoZSBwcmV2aW91cyBwYWdlXG4gICAgICAgIH1cbiAgICAgICAgLy9jaGFuZ2UgY2xhc3Mgb2YgbmV4dCBhcnJvd1xuICAgICAgICBpZiAoKGN1cnJlbnRQYWdlICsgMSkgPiBudW1iZXJPZlBhZ2VzICkgeyAvL2lmIHRoZSBjdXJyZW50IHBhZ2UgKzEgaXMgbW9yZSB0aGFuIHRoZSB0b3RhbCBwYWdlcyBcbiAgICAgICAgICAgIG5leHRFbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjsgLy90aGVuIGRvbid0IGRpc3BsYXkgbmV4dCBhcnJvd1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dEVsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjsgLy9pZiBsZXNzIHRoYW4gdG90YWwgcGFnZXMgdGhlbiBkaXNwbGF5IGFycm93IFxuICAgICAgICAgICAgbmV4dEVsLmNsYXNzTmFtZSA9IGBwYWdlLSR7Y3VycmVudFBhZ2UgKyAxfWAgLy9hbmQgYWRkIHRoZSBjbGFzcyBvZiB0aGUgbmV4dCBwYWdlXG4gICAgICAgIH1cblxuICAgICAgICAvL2RldGVybWluZSBibG9ncyB0byBkaXNwbGF5IGJ5IHNsaWNpbmcgYXJyYXlcbiAgICAgICAgY29uc3QgYmVnaW4gPSAoY3VycmVudFBhZ2UtMSkgKiBpdGVtc1BlclBhZ2U7IC8vY3VycmVudCBwYWdlIG1pbnVzIG9uZSwgdGhlbiBtdWx0aXBseSBieSBpdGVtcyBwZXIgcGFnZVxuICAgICAgICBjb25zdCBlbmQgPSBjdXJyZW50UGFnZSAqIGl0ZW1zUGVyUGFnZTsgLy9jdXJyZW50IHBhZ2UgbXVsdGlwbGllZCBieSBpdGVtcyBwZXIgcGFnZVxuICAgICAgICBjb25zdCBpdGVtc1RvRGlzcGxheSA9IGl0ZW1zLnNsaWNlKGJlZ2luLCBlbmQpO1xuXG4gICAgICAgIC8vaXRlcmF0ZSB0aHJvdWdoIGl0ZW1zVG9EaXNwbGF5IGFuZCBpbnNlcnRzIHRoZW0gaW50byBET01cbiAgICAgICAgY29uc3QgcGFnZUxvYWQgPSBmdW5jKGl0ZW1zVG9EaXNwbGF5KSAvL2Z1bmN0aW9uIHRvIHVwZGF0ZSBkb21cbiAgICAgICAgZGVidWdnZXJcblxuICAgICAgICBvdXRwdXRFbC5jb250ZW50Lmh0bWwocGFnZUxvYWQpXG4gICAgXG4gICAgfS8vZW5kIG9mIHByb2R1Y2VJdGVtc1xuXG4gICAgLy8gR2V0IHRoZSBhcnJheSBvZiBwYWdpbmF0aW9uIGFuY2hvciB0YWdzIHdlIGFkZGVkIHRvIHRoZSBET01cbiAgICBjb25zdCBwYWdlTGlua3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGFnZVwiKTtcbiAgICBcbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIHRvIGVhY2ggPGE+IGVsZW1lbnQgaW4gdGhlIHBhZ2luYXRpb25cbiAgICBwYWdlTGlua3MuZm9yRWFjaCggbGluayA9PiB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2R1Y2VJdGVtcywgZmFsc2UpIC8vd2hlbiBwYWdpbmF0aW9uIGxpbmsgaXMgY2xpY2tlZCwgcnVuIHByb2R1Y2VJdGVtcyBmdW5jdGlvbiBcbiAgICB9KVxuICAgIFxuICAgIC8vZGVmYXVsdCBzbyB0aGF0IGZpcnN0IHBhZ2UgbG9hZHNcbiAgICBwcm9kdWNlSXRlbXMoe1xuICAgICAgICBcInRhcmdldFwiOiB7XG4gICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXCJwYWdlLTFcIl1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vZXZlbnQgbGlzdGVuZXJzIGZvciBwcmV2aW91cyBhbmQgbmV4dCBlbGVtZW50c1xuICAgIHByZXZpb3VzRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2R1Y2VJdGVtcywgZmFsc2UpO1xuICAgIG5leHRFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvZHVjZUl0ZW1zLCBmYWxzZSk7XG5cbn0vL2VuZCBvZiBwYWdpbmF0ZVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhZ2luYXRlIiwiLy90aGlzIG1vZHVsZSB3aWxsIGRpc3BsYXkgcHJvamVjdCBpbmZvcm1hdGlvblxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IHJlcXVpcmUoXCIuLi9kaXNwbGF5UGFnZVwiKVxuY29uc3QgcHJvamVjdENvbnRlbnQgPSByZXF1aXJlKFwiLi9wcm9qZWN0c0NvbnRyb2xsZXJcIilcblxuY29uc3QgZGlzcGxheVByb2plY3QgPSAoKSA9PiB7XG4gICAgXG4gICAgcHJvamVjdENvbnRlbnQoKS50aGVuKCBwcm9kdWN0U3RyaW5nID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEhlYWRlciA9IFwiPGgxPktyaXN0ZW4ncyBQcm9qZWN0czwvaDE+XCJcbiAgICAgICAgY29uc3QgcHJvamVjdEluZm8gPSBwcm9kdWN0U3RyaW5nXG4gICAgXG4gICAgICAgIGRpc3BsYXlQYWdlKHByb2plY3RIZWFkZXIsIHByb2plY3RJbmZvKVxuICAgIH0pXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5UHJvamVjdFxuIiwiY29uc3QgcHJvamVjdENvbnRlbnQgPSAoaXRlbUFycmF5KSA9PiB7XG4gICAgbGV0IHByb2plY3RTdHJpbmcgPSBcIlwiXG4gICAgLy8gYnVpbGRzIHByb2plY3Qgc2VjdGlvblxuICAgIHByb2plY3RTdHJpbmcgKz0gYFxuICAgIDxzZWN0aW9uIGlkPVwicHJvamVjdHNcIj5cbiAgICBgXG4gICAgLy9pdGVyYXRlIHRocm91Z2ggZWFjaCBwcm9qZWN0IGFuZCBhZGQgdG8gcHJvamVjdFN0cmluZ1xuICAgIGl0ZW1BcnJheS5mb3JFYWNoKFxuICAgICAgICBwcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIHByb2plY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwcm9qZWN0XCI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwicHJvamVjdC1uYW1lXCI+JHtwcm9qZWN0Lm5hbWV9PC9oMj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtZGF0ZVwiPjxiPkRhdGUgQ29tcGxldGVkOjwvYj4gJHtwcm9qZWN0LmRhdGVfY29tcGxldGVkfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtdGVjaFwiPjxiPlRlY2hub2xvZ2llcyBVc2VkOjwvYj4gJHtwcm9qZWN0LnRlY2hub2xvZ2llc191c2VkfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtdGVhbVwiPjxiPlRlYW1tYXRlcyAoaWYgYXBwbGljYWJsZSk6PC9iPiAke3Byb2plY3QudGVhbW1hdGVzfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtZGVzY3JpcHRpb25cIj4ke3Byb2plY3QuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgIH1cbiAgICApXG5cbiAgICAvL2Nsb3NpbmcgdGFnIGZvciBwcm9qZWN0IHNlY3Rpb25cbiAgICBwcm9qZWN0U3RyaW5nICs9IGBcbiAgICAgICAgPC9zZWN0aW9uPlxuICAgIGBcbiAgICByZXR1cm4gcHJvamVjdFN0cmluZ1xuICAgIFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb2plY3RDb250ZW50IiwiLy9jb250cm9scyBob3cgdGhlIGNvbnRlbnQgaXMgd3JpdHRlbiB0byB0aGUgZG9tIGZvciBwcm9qZWN0cyBwYWdlXG5jb25zdCBwcm9qZWN0RmlsdGVyID0gcmVxdWlyZShcIi4uL3BhZ2VGaWx0ZXJcIilcbmNvbnN0IHByb2plY3RDb250ZW50ID0gcmVxdWlyZShcIi4vcHJvamVjdENvbnRlbnRcIilcblxuY29uc3QgcHJvamVjdHNET00gPSAoKSA9PiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9wZXJzb25hbC1zaXRlLWNmMWI4LmZpcmViYXNlaW8uY29tL3Byb2plY3RzLmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIiAgXG4gICAgfSkudGhlbihcbiAgICAgICAgcHJvamVjdERiID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHByb2plY3RGaWx0ZXIocHJvamVjdERiLCBwcm9qZWN0Q29udGVudClcblxuICAgICAgICB9XG4gICAgKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvamVjdHNET01cblxuIiwiLy90aGlzIG1vZHVsZSB3aWxsIGRpc3BsYXkgcmVzdW1lIGluZm9ybWF0aW9uXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCByZXN1bWVDb250ZW50ID0gcmVxdWlyZShcIi4vcmVzdW1lQ29udHJvbGxlclwiKVxuXG5jb25zdCBkaXNwbGF5UmVzdW1lID0gKCkgPT4ge1xuICAgIFxuICAgIHJlc3VtZUNvbnRlbnQoKS50aGVuKCByZXN1bWVTdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCByZXN1bWVIZWFkZXIgPSBcIjxoMT5Kb2IgSGlzdG9yeSBmb3IgS3Jpc3RlbiBOb3JyaXM8L2gxPlwiXG4gICAgICAgIGNvbnN0IHJlc3VtZUluZm8gPSByZXN1bWVTdHJpbmdcbiAgICBcbiAgICAgICAgZGlzcGxheVBhZ2UocmVzdW1lSGVhZGVyLCByZXN1bWVJbmZvKVxuICAgIH0pXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5UmVzdW1lIiwiLy9jb250cm9scyBob3cgdGhlIGNvbnRlbnQgaXMgd3JpdHRlbiB0byB0aGUgZG9tIGZvciByZXN1bWUgcGFnZVxuXG5jb25zdCByZXN1bWVET00gPSAoKSA9PiB7XG5cbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL3BlcnNvbmFsLXNpdGUtY2YxYjguZmlyZWJhc2Vpby5jb20vcmVzdW1lLmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIlxuICAgIH0pXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgICAgcmVzdW1lRGIgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bWVTdHJpbmcgPSBcIlwiXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVzdW1lRGIuZm9yRWFjaCggam9iID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdW1lU3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJqb2JcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwiY29tcGFueVwiPiR7am9iLmNvbXBhbnl9ICgke2pvYi5sb2NhdGlvbn0pPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPiR7am9iLnBvc2l0aW9ufTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzPiR7am9iLnN0YXJ0RGF0ZX0gLSAke2pvYi5lbmREYXRlfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic3VtbWFyeVwiPjxiPlN1bW1hcnk6IDwvYj4ke2pvYi5zdW1tYXJ5fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInJlc3BvbnNpYmlsaXRpZXNcIj48Yj5SZXNwb25zaWJpbGl0aWVzIGluY2x1ZGVkOiA8L2I+JHtqb2IucmVzcG9uc2liaWxpdGllc308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdW1lU3RyaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgIClcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3VtZURPTSJdfQ==
