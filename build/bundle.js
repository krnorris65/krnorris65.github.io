(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

let formString = ""

formString += `
    <section id="blog_form">
        <section id="form_new-blog">
            <label for="form_title">Title</label>
                <input type="text" name="title" id="form_title" placeholder="title" class="form_field">

            <label for="form_published">Date Posted</label>
                <input type="date" name="published" id="form_published" class="form_field" required>

            <label for="form_week">Dates of Week</label>
                <input type="text" name="week_dates" id="form_week" placeholder="MONTH mon - fri, YEAR">

            <label for="form_author">Author</label>
                <input type="text" name="author" id="form_author" value="Kristen Norris">

            <label for="">Celebrations and Inspirations</label>
                <div id="form_celebrations">
                    <section id="form_celebration_1">
                        <input type="text" name="celebration">
                        <button id="remove_celebration_1">Remove</button>
                    </section>
                </div>
                <button id="add-celebration" class="add">Add Celebration</button>

            <label for="">Challenges and Hang-Ups</label>
                <div id="form_challenges">
                    <section id="form_challenge_1">
                        <input type="text" name="challenge">
                        <button id="remove_challenge_1">Remove</button>
                    </section>
                </div>
                <button id="add-challenge" class="add">Add Challenge</button>

            <label for="form_tags">Blog Tags</label>
                <input type="text" name="tags" id="form_tags" placeholder="separate tags with a comma">
        </section>
        <button id="button_submit-blog">Submit Blog</button>
        <button id="button_clear-blog">Clear</button>
    </section>
`

module.exports = formString
},{}],2:[function(require,module,exports){
const admin = require

const displayPage = require("../displayPage")
const blogForm = require("./blogForm")

const displayAdmin = () => {


    const adminHeader = "<h1>Create a Blog Post</h1>"
    displayPage(adminHeader, blogForm)

}
module.exports = displayAdmin
},{"../displayPage":11,"./blogForm":1}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
},{"../pageFilter":15,"../paginate":16,"./blogContent":3,"./blogFilter":5}],5:[function(require,module,exports){

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
},{}],6:[function(require,module,exports){
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
},{"../displayPage":11,"./blogController":4}],7:[function(require,module,exports){
{
    const footerEl = $("#site-footer")

    footerEl.append("<a href=\"#\" id=\"site_admin\">Admin</a>")

    // footerEl.create("button")
}
module.exports = null
},{}],8:[function(require,module,exports){
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


        navEl.appendChild(navLink)
        navList.appendChild(navEl)
    }
)

navElement.appendChild(navList)

module.exports = null
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
//this module will display contact information

const displayPage = require("../displayPage")
const contactConent = require("./contactController")

const displayContact = () => {
    contactConent().then(contactString => {
        
        const contactHeader = "<h1>Contact Me</h1>"
        const contactInfo = contactString
        
        displayPage(contactHeader, contactInfo) //displayPage needs to be within the contactContent().then because it is dependent on the string that is returned when the then function runs
        
        $("#page-filter").html("")
        $("#page-footer").html("")
    })
}

module.exports = displayContact
},{"../displayPage":11,"./contactController":9}],11:[function(require,module,exports){
const domEl = require("./domElements")

const outputEl = domEl()

const displayPage = (pageHeader, pageContent) => {

    const headerEl = outputEl.header
    headerEl.html(pageHeader) //adds the page header to the dom

    const contentEl = outputEl.content
    contentEl.html(pageContent) //adds the content of page to the dom

}


module.exports = displayPage
},{"./domElements":12}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
//this module will display the home page

const displayPage = require("../displayPage")

const displayHome = () => {

    const homeHeader = `
    
        <h1>Kristen Norris</h1>
        <h2 id="cohort">NSS Cohort 22</h2>
    `
    const homeInfo = ""
        
    displayPage(homeHeader, homeInfo) 
        
    $("#page-filter").html("")
    $("#page-footer").html("")

}

module.exports = displayHome
},{"../displayPage":11}],14:[function(require,module,exports){

$(document).ready(function () {
    const navBar = require("./buildNavigation") //displays site navigation
    const footer = require("./buildFooter") //displays site footer
    
    const homePage = require("./home/displayHome")
    homePage() //displays home page first
    $(".nav_home").on("click", homePage) //will load home page when nav link is clicked


    const contactPage = require("./contact/displayContact")
    $(".nav_contact").on("click", contactPage) //will load contact page when nav link is clicked
    
    const projectPage = require("./projects/displayProjects")
    $(".nav_projects").on("click", projectPage) //will load projects page when nav link is clicked
    
    const resumePage = require("./resume/displayResume")
    $(".nav_resume").on("click", resumePage) //will load resume page when nav link is clicked
    
    const blogPage = require("./blog/displayBlogs")
    $(".nav_blog").on("click", blogPage) //will load blog page when nav link is clicked
    
    const adminPage = require("./admin/displayAdmin")
    $("#site_admin").on("click", adminPage) //will load admin page when link in footer is clicked


})


},{"./admin/displayAdmin":2,"./blog/displayBlogs":6,"./buildFooter":7,"./buildNavigation":8,"./contact/displayContact":10,"./home/displayHome":13,"./projects/displayProjects":17,"./resume/displayResume":20}],15:[function(require,module,exports){
const domEl = require("./domElements")

//filterPage function takes two parameters: the database in which you want to filter through and the function you want executed on the database
const filterPage = (dbArray, func) => {
    const outputEl = domEl()
    let pageLoad = ""
    
    if (dbArray.length > 0) {
        //create search input
        const searchBar = "<p>Search: <input type=\"text\" name=\"pageFilter\" placeholder=\"search all\"></p>"

        outputEl.filter.html(searchBar)
        
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
},{"./domElements":12}],16:[function(require,module,exports){
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
},{"./domElements":12}],17:[function(require,module,exports){
//this module will display project information

const displayPage = require("../displayPage")
const projectContent = require("./projectsController")

const displayProject = () => {
    
    projectContent().then( productString => {
        const projectHeader = "<h1>Kristen's Projects</h1>"
        const projectInfo = productString
    
        displayPage(projectHeader, projectInfo)
        
        $("#page-footer").html("")
    })

}

module.exports = displayProject

},{"../displayPage":11,"./projectsController":19}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
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


},{"../pageFilter":15,"./projectContent":18}],20:[function(require,module,exports){
//this module will display resume information

const displayPage = require("../displayPage")
const resumeContent = require("./resumeController")

const displayResume = () => {
    
    resumeContent().then( resumeString => {
        const resumeHeader = "<h1>Job History for Kristen Norris</h1>"
        const resumeInfo = resumeString
    
        displayPage(resumeHeader, resumeInfo)
    })

    $("#page-filter").html("")
    $("#page-footer").html("")
}

module.exports = displayResume
},{"../displayPage":11,"./resumeController":21}],21:[function(require,module,exports){
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
},{}]},{},[14])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FkbWluL2Jsb2dGb3JtLmpzIiwic2NyaXB0cy9hZG1pbi9kaXNwbGF5QWRtaW4uanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0NvbnRlbnQuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0NvbnRyb2xsZXIuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0ZpbHRlci5qcyIsInNjcmlwdHMvYmxvZy9kaXNwbGF5QmxvZ3MuanMiLCJzY3JpcHRzL2J1aWxkRm9vdGVyLmpzIiwic2NyaXB0cy9idWlsZE5hdmlnYXRpb24uanMiLCJzY3JpcHRzL2NvbnRhY3QvY29udGFjdENvbnRyb2xsZXIuanMiLCJzY3JpcHRzL2NvbnRhY3QvZGlzcGxheUNvbnRhY3QuanMiLCJzY3JpcHRzL2Rpc3BsYXlQYWdlLmpzIiwic2NyaXB0cy9kb21FbGVtZW50cy5qcyIsInNjcmlwdHMvaG9tZS9kaXNwbGF5SG9tZS5qcyIsInNjcmlwdHMvbWFpbi5qcyIsInNjcmlwdHMvcGFnZUZpbHRlci5qcyIsInNjcmlwdHMvcGFnaW5hdGUuanMiLCJzY3JpcHRzL3Byb2plY3RzL2Rpc3BsYXlQcm9qZWN0cy5qcyIsInNjcmlwdHMvcHJvamVjdHMvcHJvamVjdENvbnRlbnQuanMiLCJzY3JpcHRzL3Byb2plY3RzL3Byb2plY3RzQ29udHJvbGxlci5qcyIsInNjcmlwdHMvcmVzdW1lL2Rpc3BsYXlSZXN1bWUuanMiLCJzY3JpcHRzL3Jlc3VtZS9yZXN1bWVDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbmxldCBmb3JtU3RyaW5nID0gXCJcIlxuXG5mb3JtU3RyaW5nICs9IGBcbiAgICA8c2VjdGlvbiBpZD1cImJsb2dfZm9ybVwiPlxuICAgICAgICA8c2VjdGlvbiBpZD1cImZvcm1fbmV3LWJsb2dcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmb3JtX3RpdGxlXCI+VGl0bGU8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIGlkPVwiZm9ybV90aXRsZVwiIHBsYWNlaG9sZGVyPVwidGl0bGVcIiBjbGFzcz1cImZvcm1fZmllbGRcIj5cblxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZvcm1fcHVibGlzaGVkXCI+RGF0ZSBQb3N0ZWQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIG5hbWU9XCJwdWJsaXNoZWRcIiBpZD1cImZvcm1fcHVibGlzaGVkXCIgY2xhc3M9XCJmb3JtX2ZpZWxkXCIgcmVxdWlyZWQ+XG5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmb3JtX3dlZWtcIj5EYXRlcyBvZiBXZWVrPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwid2Vla19kYXRlc1wiIGlkPVwiZm9ybV93ZWVrXCIgcGxhY2Vob2xkZXI9XCJNT05USCBtb24gLSBmcmksIFlFQVJcIj5cblxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZvcm1fYXV0aG9yXCI+QXV0aG9yPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYXV0aG9yXCIgaWQ9XCJmb3JtX2F1dGhvclwiIHZhbHVlPVwiS3Jpc3RlbiBOb3JyaXNcIj5cblxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIlwiPkNlbGVicmF0aW9ucyBhbmQgSW5zcGlyYXRpb25zPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZm9ybV9jZWxlYnJhdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gaWQ9XCJmb3JtX2NlbGVicmF0aW9uXzFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJjZWxlYnJhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInJlbW92ZV9jZWxlYnJhdGlvbl8xXCI+UmVtb3ZlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiYWRkLWNlbGVicmF0aW9uXCIgY2xhc3M9XCJhZGRcIj5BZGQgQ2VsZWJyYXRpb248L2J1dHRvbj5cblxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIlwiPkNoYWxsZW5nZXMgYW5kIEhhbmctVXBzPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZm9ybV9jaGFsbGVuZ2VzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGlkPVwiZm9ybV9jaGFsbGVuZ2VfMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNoYWxsZW5nZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInJlbW92ZV9jaGFsbGVuZ2VfMVwiPlJlbW92ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImFkZC1jaGFsbGVuZ2VcIiBjbGFzcz1cImFkZFwiPkFkZCBDaGFsbGVuZ2U8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZvcm1fdGFnc1wiPkJsb2cgVGFnczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRhZ3NcIiBpZD1cImZvcm1fdGFnc1wiIHBsYWNlaG9sZGVyPVwic2VwYXJhdGUgdGFncyB3aXRoIGEgY29tbWFcIj5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICA8YnV0dG9uIGlkPVwiYnV0dG9uX3N1Ym1pdC1ibG9nXCI+U3VibWl0IEJsb2c8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBpZD1cImJ1dHRvbl9jbGVhci1ibG9nXCI+Q2xlYXI8L2J1dHRvbj5cbiAgICA8L3NlY3Rpb24+XG5gXG5cbm1vZHVsZS5leHBvcnRzID0gZm9ybVN0cmluZyIsImNvbnN0IGFkbWluID0gcmVxdWlyZVxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IHJlcXVpcmUoXCIuLi9kaXNwbGF5UGFnZVwiKVxuY29uc3QgYmxvZ0Zvcm0gPSByZXF1aXJlKFwiLi9ibG9nRm9ybVwiKVxuXG5jb25zdCBkaXNwbGF5QWRtaW4gPSAoKSA9PiB7XG5cblxuICAgIGNvbnN0IGFkbWluSGVhZGVyID0gXCI8aDE+Q3JlYXRlIGEgQmxvZyBQb3N0PC9oMT5cIlxuICAgIGRpc3BsYXlQYWdlKGFkbWluSGVhZGVyLCBibG9nRm9ybSlcblxufVxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5QWRtaW4iLCIvL3RoZSBtb2R1bGUgZ2VuZXJhdGVzIHRoZSBjb250ZW50IG9mIHRoZSBibG9nc1xuXG5jb25zdCBibG9nQ29udGVudCA9IChpdGVtQXJyYXkpID0+IHtcbiAgICBsZXQgYmxvZ1N0cmluZyA9IFwiXCJcbiAgICBcbiAgICAvL2J1aWxkcyBibG9nIHNlY3Rpb25cbiAgICBibG9nU3RyaW5nICs9IGBcbiAgICA8c2VjdGlvbiBpZD1cInByb2plY3RzXCI+XG4gICAgYFxuICAgIFxuICAgIC8vIGZvciBlYWNoIGJsb2cgZW50cnksIGJ1aWxkIHRoZSBmb2xsb3dpbmcgaHRtbCB0byBjcmVhdGUgYmxvZyBjb250ZW50XG4gICAgaXRlbUFycmF5LmZvckVhY2goXG4gICAgICAgIGJsb2cgPT4geyBcbiAgICAgICAgICAgIGJsb2dTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDxhcnRpY2xlIGlkPVwiYmxvZy0ke2Jsb2cuaWR9XCIgY2xhc3M9XCJibG9nXCI+XG4gICAgICAgICAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJ3ZWVrTnVtXCI+JHtibG9nLnRpdGxlfTwvaDI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ3ZWVrRGF0ZVwiPiR7YmxvZy53ZWVrX2RhdGVzfTwvcD5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8aDM+Q2VsZWJyYXRpb25zICYgSW5zcGlyYXRpb25zPC9oMz5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICBcbiAgICAgICAgICAgIC8vaXRlcmF0ZXMgb3ZlciBjZWxlYnJhdGlvbiBhcnJheVxuICAgICAgICAgICAgYmxvZy5jZWxlYnJhdGlvbnMuZm9yRWFjaChjZWxlYnJhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgYmxvZ1N0cmluZyArPSBgPGxpPiR7Y2VsZWJyYXRpb259PC9saT5gO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYmxvZ1N0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGgzPkNoYWxsZW5nZXMgJiBIYW5nLVVwczwvaDM+XG4gICAgICAgICAgICAgICAgPHVsPmBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9pdGVyYXRlcyBvdmVyIGNoYWxsZW5nZXMgYXJyYXlcbiAgICAgICAgICAgIGJsb2cuY2hhbGxlbmdlcy5mb3JFYWNoKGNoYWxsZW5nZSA9PiB7XG4gICAgICAgICAgICAgICAgYmxvZ1N0cmluZyArPSBgPGxpPiR7Y2hhbGxlbmdlfTwvbGk+YDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJsb2dTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxmb290ZXI+XG4gICAgICAgICAgICAgICAgPHNwYW4+UG9zdGVkIGJ5ICR7YmxvZy5hdXRob3J9IG9uICR7YmxvZy5wdWJsaXNoZWR9PC90aW1lPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICApXG4gICAgXG4gICAgLy9jbG9zaW5nIHRhZyBmb3IgYmxvZyBzZWN0aW9uXG4gICAgYmxvZ1N0cmluZyArPSBgXG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICBgXG5cbiAgICByZXR1cm4gYmxvZ1N0cmluZ1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJsb2dDb250ZW50XG4iLCIvL2NvbnRyb2xzIGhvdyB0aGUgY29udGVudCBpcyB3cml0dGVuIHRvIHRoZSBkb20gZm9yIGJsb2cgcGFnZVxuY29uc3QgcGFnaW5hdGUgPSByZXF1aXJlKFwiLi4vcGFnaW5hdGVcIilcbmNvbnN0IGJsb2dGaWx0ZXIgPSByZXF1aXJlKFwiLi4vcGFnZUZpbHRlclwiKVxuY29uc3QgZmlsdGVyID0gcmVxdWlyZShcIi4vYmxvZ0ZpbHRlclwiKVxuY29uc3QgYmxvZ0NvbnRlbnQgPSByZXF1aXJlKFwiLi9ibG9nQ29udGVudFwiKVxuXG5jb25zdCBibG9nRE9NID0gKCkgPT4ge1xuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vcGVyc29uYWwtc2l0ZS1jZjFiOC5maXJlYmFzZWlvLmNvbS9ibG9nLmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIlxuICAgIH0pLnRoZW4oXG4gICAgICAgIGJsb2dEYiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmxvZ0ZpbHRlcihibG9nRGIsIGJsb2dDb250ZW50LCBmaWx0ZXIpXG4gICAgICAgICAgICAvLyByZXR1cm4gcGFnaW5hdGUoYmxvZ0RiLCBibG9nQ29udGVudClcbiAgICAgICAgfVxuICAgIClcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJsb2dET00iLCJcbmNvbnN0IGJsb2dzRmlsdGVyID0gKGRhdGFiYXNlKSA9PiB7XG4gICAgZGF0YWJhc2UuZmlsdGVyKFxuICAgICAgICBmaWx0ZXJlZEJsb2cgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkQmxvZy50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHVzZXJGaWx0ZXJTdHJpbmcpIHx8IC8vbG9vayB0aHJvdWdoIHRpdGxlc1xuICAgICAgICAgICAgZmlsdGVyZWRCbG9nLmNlbGVicmF0aW9ucy5maWx0ZXIoIC8vaXRlcmF0ZSBvdmVyIHRoZSBjZWxlYnJhdGlvbnMgYXJyYXlcbiAgICAgICAgICAgICAgICBmaWx0ZXJDZWxlYnJhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJDZWxlYnJhdGlvbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHVzZXJGaWx0ZXJTdHJpbmcpXG4gICAgICAgICAgICAgICAgfSkubGVuZ3RoIHx8IC8vaWYgdGhlIGxlbmd0aCBpcyAwIHRoZW4gaXQgcmV0dXJucyBmYWxzZVxuICAgICAgICAgICAgZmlsdGVyZWRCbG9nLmNoYWxsZW5nZXMuZmlsdGVyKCAvL2l0ZXJhdGUgb3ZlciB0aGUgY2hhbGxlbmdlcyBhcnJheVxuICAgICAgICAgICAgICAgIGZpbHRlckNoYWxsZW5nZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJDaGFsbGVuZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh1c2VyRmlsdGVyU3RyaW5nKVxuICAgICAgICAgICAgICAgIH0pLmxlbmd0aCB8fFxuICAgICAgICAgICAgICAgIGZpbHRlcmVkQmxvZy53ZWVrX2RhdGVzLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModXNlckZpbHRlclN0cmluZylcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgKVxufVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBibG9nc0ZpbHRlciIsIi8vdGhpcyBtb2R1bGUgd2lsbCBkaXNwbGF5IHRoZSBibG9nc1xuXG5jb25zdCBkaXNwbGF5UGFnZSA9IHJlcXVpcmUoXCIuLi9kaXNwbGF5UGFnZVwiKVxuY29uc3QgYmxvZ0NvbnRlbnQgPSByZXF1aXJlKFwiLi9ibG9nQ29udHJvbGxlclwiKVxuXG5jb25zdCBkaXNwbGF5QmxvZyA9ICgpID0+IHtcblxuICAgIFxuICAgIGJsb2dDb250ZW50KCkudGhlbihcbiAgICAgICAgYmxvZ1N0cmluZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBibG9nSGVhZGVyID0gXCI8aDE+TXkgTmFzaHZpbGxlIFNvZnR3YXJlIFNjaG9vbCBFeHBlcmllbmNlPC9oMT5cIlxuICAgICAgICAgICAgY29uc3QgYmxvZ0luZm8gPSBibG9nU3RyaW5nXG5cbiAgICAgICAgICAgIGRpc3BsYXlQYWdlKGJsb2dIZWFkZXIsIGJsb2dJbmZvKVxuICAgICAgICB9XG4gICAgKVxuXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5QmxvZ1xuXG4vLyBjb25zdCBkaXNwbGF5QmxvZyA9ICgpID0+IHtcbi8vICAgICA8aGVhZGVyIGNsYXNzPVwicGFnZS1oZWFkZXJcIj5cbi8vICAgICA8aDE+TXkgTmFzaHZpbGxlIFNvZnR3YXJlIFNjaG9vbCBFeHBlcmllbmNlPC9oMT5cbi8vICAgICA8YSBocmVmPVwiLi4vYWRtaW4vYmxvZy5odG1sXCI+QWRtaW48L2E+XG4vLyAgICAgPC9oZWFkZXI+XG5cbi8vICAgICA8cD5TZWFyY2g6IDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJibG9nRmlsdGVyXCIgcGxhY2Vob2xkZXI9XCJzZWFyY2ggYWxsIGJsb2cgcG9zdHNcIj48L3A+XG4vLyAgICAgPHNlY3Rpb24gaWQ9XCJibG9nLXBvc3RzXCI+XG4vLyAgICAgPCEtLSBwb3B1bGF0ZWQgdGhyb3VnaCBkYXRhYmFzZSAtLT5cbi8vICAgICA8L3NlY3Rpb24+XG5cblxuLy8gICAgIDxmb290ZXIgaWQ9XCJibG9nLXBhZ2luYXRvclwiPlxuXG4vLyAgICAgPC9mb290ZXI+XG5cblxuLy8gfSIsIntcbiAgICBjb25zdCBmb290ZXJFbCA9ICQoXCIjc2l0ZS1mb290ZXJcIilcblxuICAgIGZvb3RlckVsLmFwcGVuZChcIjxhIGhyZWY9XFxcIiNcXFwiIGlkPVxcXCJzaXRlX2FkbWluXFxcIj5BZG1pbjwvYT5cIilcblxuICAgIC8vIGZvb3RlckVsLmNyZWF0ZShcImJ1dHRvblwiKVxufVxubW9kdWxlLmV4cG9ydHMgPSBudWxsIiwiY29uc3QgbmF2aWdhdGlvbiA9IFtcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkhvbWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJSZXN1bWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJDb250YWN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiUHJvamVjdHNcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJCbG9nXCJcbiAgICB9XG5dXG5cbmNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1pdGVtc1wiKTtcblxuY29uc3QgbmF2TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuXG5uYXZpZ2F0aW9uLmZvckVhY2goXG4gICAgcGFnZSA9PiB7XG4gICAgICAgIGNvbnN0IG5hdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXG4gICAgICAgIG5hdkVsLmNsYXNzTGlzdC5hZGQoXCJuYXZMaW5rXCIpXG5cbiAgICAgICAgY29uc3QgbmF2TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXG4gICAgICAgIG5hdkxpbmsuaHJlZiA9IFwiI1wiXG4gICAgICAgIG5hdkxpbmsuY2xhc3NOYW1lID0gYG5hdl8ke3BhZ2UuZGlzcGxheS50b0xvd2VyQ2FzZSgpfWBcbiAgICAgICAgbmF2TGluay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwYWdlLmRpc3BsYXkpKVxuXG5cbiAgICAgICAgbmF2RWwuYXBwZW5kQ2hpbGQobmF2TGluaylcbiAgICAgICAgbmF2TGlzdC5hcHBlbmRDaGlsZChuYXZFbClcbiAgICB9XG4pXG5cbm5hdkVsZW1lbnQuYXBwZW5kQ2hpbGQobmF2TGlzdClcblxubW9kdWxlLmV4cG9ydHMgPSBudWxsIiwiLy9jb250cm9scyBob3cgdGhlIGNvbnRlbnQgaXMgd3JpdHRlbiB0byB0aGUgZG9tIGZvciBjb250YWN0IHBhZ2VcbmNvbnN0IGNvbnRhY3RET00gPSAoKSA9PiB7XG5cbiAgICByZXR1cm4gJC5hamF4KHsgLy9uZWVkIHRvIHJldHVybiBhamF4IGZ1bmN0aW9uIHNvIHRoYXQgY29udGFjdERPTSBjYW4gYWNjZXNzIHRoZSBzdHJpbmcgcmV0dXJuZWQgaW4gLnRoZW4oKVxuICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vcGVyc29uYWwtc2l0ZS1jZjFiOC5maXJlYmFzZWlvLmNvbS9jb250YWN0Lmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIlxuICAgIH0pXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgICAgY29udGFjdERiID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGFjdFN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAvL2J1aWxkcyBjb250YWN0IGJ5IGVtYWlsIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY29udGFjdFwiPlNlbmQgYW4gZW1haWw6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPVwic2VuZC1lbWFpbFwiPiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImVtYWlsXCI+PGEgaHJlZj1cIm1haWx0bzoke2NvbnRhY3REYi5lbWFpbH1cIj4ke2NvbnRhY3REYi5lbWFpbH08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgLy9idWlsZHMgY29udGFjdCB0aHJvdWdoIHNvY2lhbCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNvbnRhY3RcIj5Db25uZWN0IG9uIHNvY2lhbCBtZWRpYTo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9XCJzb2NpYWwtbWVkaWFcIj5cbiAgICAgICAgICAgIGBcblxuICAgICAgICAgICAgICAgIC8vaXRlcmF0ZXMgdGhyb3VnaCBlYWNoIHNvY2lhbCBzaXRlXG4gICAgICAgICAgICAgICAgY29udGFjdERiLnNvY2lhbC5mb3JFYWNoKHNpdGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwic29jaWFsXCI+PGEgaHJlZj1cIiR7c2l0ZS51cmx9XCI+JHtzaXRlLnNlcnZpY2V9PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAvL2Nsb3NpbmcgdGFncyBmb3IgdW5vcmRlcmVkIGxpc3QgYW5kIGNvbnRhY3Qgc2VjdGlvblxuICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhY3RTdHJpbmdcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRhY3RET00iLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSBjb250YWN0IGluZm9ybWF0aW9uXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCBjb250YWN0Q29uZW50ID0gcmVxdWlyZShcIi4vY29udGFjdENvbnRyb2xsZXJcIilcblxuY29uc3QgZGlzcGxheUNvbnRhY3QgPSAoKSA9PiB7XG4gICAgY29udGFjdENvbmVudCgpLnRoZW4oY29udGFjdFN0cmluZyA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWN0SGVhZGVyID0gXCI8aDE+Q29udGFjdCBNZTwvaDE+XCJcbiAgICAgICAgY29uc3QgY29udGFjdEluZm8gPSBjb250YWN0U3RyaW5nXG4gICAgICAgIFxuICAgICAgICBkaXNwbGF5UGFnZShjb250YWN0SGVhZGVyLCBjb250YWN0SW5mbykgLy9kaXNwbGF5UGFnZSBuZWVkcyB0byBiZSB3aXRoaW4gdGhlIGNvbnRhY3RDb250ZW50KCkudGhlbiBiZWNhdXNlIGl0IGlzIGRlcGVuZGVudCBvbiB0aGUgc3RyaW5nIHRoYXQgaXMgcmV0dXJuZWQgd2hlbiB0aGUgdGhlbiBmdW5jdGlvbiBydW5zXG4gICAgICAgIFxuICAgICAgICAkKFwiI3BhZ2UtZmlsdGVyXCIpLmh0bWwoXCJcIilcbiAgICAgICAgJChcIiNwYWdlLWZvb3RlclwiKS5odG1sKFwiXCIpXG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5Q29udGFjdCIsImNvbnN0IGRvbUVsID0gcmVxdWlyZShcIi4vZG9tRWxlbWVudHNcIilcblxuY29uc3Qgb3V0cHV0RWwgPSBkb21FbCgpXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gKHBhZ2VIZWFkZXIsIHBhZ2VDb250ZW50KSA9PiB7XG5cbiAgICBjb25zdCBoZWFkZXJFbCA9IG91dHB1dEVsLmhlYWRlclxuICAgIGhlYWRlckVsLmh0bWwocGFnZUhlYWRlcikgLy9hZGRzIHRoZSBwYWdlIGhlYWRlciB0byB0aGUgZG9tXG5cbiAgICBjb25zdCBjb250ZW50RWwgPSBvdXRwdXRFbC5jb250ZW50XG4gICAgY29udGVudEVsLmh0bWwocGFnZUNvbnRlbnQpIC8vYWRkcyB0aGUgY29udGVudCBvZiBwYWdlIHRvIHRoZSBkb21cblxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheVBhZ2UiLCIvL3RoaXMgbW9kdWxlIGNhcHR1cmVzIHRoZSBkb20gZWxlbWVudHMgdGhhdCB3aWxsIGJlIHdyaXR0ZW4gdG8gd2hlbiBlYWNoIHBhZ2UgaXMgY2FsbGVkXG5cbmNvbnN0IGRvbUVsZW1lbnRzID0gKCkgPT4ge1xuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKG51bGwsIHtcbiAgICAgICAgXCJoZWFkZXJcIjoge1xuICAgICAgICAgICAgdmFsdWU6ICQoXCIjcGFnZS1oZWFkZXJcIikgLy9nZXRzIGhlYWRlciBzZWN0aW9uXG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGVudFwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogJChcIiNwYWdlLWNvbnRlbnRcIikgLy9nZXRzIGNvbnRlbnQgc2VjdGlvblxuICAgICAgICB9LFxuICAgICAgICBcImZpbHRlclwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogJChcIiNwYWdlLWZpbHRlclwiKSAvL3NlY3Rpb24gdG8gYWRkIGZpbHRlciB3aGVuIHBhZ2VGaWx0ZXIgaXMgYWRkZWQgdG8gYSBwYWdlXG4gICAgICAgIH0sXG4gICAgICAgIFwiZm9vdGVyXCI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAkKFwiI3BhZ2UtZm9vdGVyXCIpIC8vc2VjdGlvbiB0byBhZGQgcGFnZSBmb290ZXIgc3VjaCBhcyBwYWdpbmF0aW9uXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZG9tRWxlbWVudHMiLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSB0aGUgaG9tZSBwYWdlXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5cbmNvbnN0IGRpc3BsYXlIb21lID0gKCkgPT4ge1xuXG4gICAgY29uc3QgaG9tZUhlYWRlciA9IGBcbiAgICBcbiAgICAgICAgPGgxPktyaXN0ZW4gTm9ycmlzPC9oMT5cbiAgICAgICAgPGgyIGlkPVwiY29ob3J0XCI+TlNTIENvaG9ydCAyMjwvaDI+XG4gICAgYFxuICAgIGNvbnN0IGhvbWVJbmZvID0gXCJcIlxuICAgICAgICBcbiAgICBkaXNwbGF5UGFnZShob21lSGVhZGVyLCBob21lSW5mbykgXG4gICAgICAgIFxuICAgICQoXCIjcGFnZS1maWx0ZXJcIikuaHRtbChcIlwiKVxuICAgICQoXCIjcGFnZS1mb290ZXJcIikuaHRtbChcIlwiKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheUhvbWUiLCJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBuYXZCYXIgPSByZXF1aXJlKFwiLi9idWlsZE5hdmlnYXRpb25cIikgLy9kaXNwbGF5cyBzaXRlIG5hdmlnYXRpb25cbiAgICBjb25zdCBmb290ZXIgPSByZXF1aXJlKFwiLi9idWlsZEZvb3RlclwiKSAvL2Rpc3BsYXlzIHNpdGUgZm9vdGVyXG4gICAgXG4gICAgY29uc3QgaG9tZVBhZ2UgPSByZXF1aXJlKFwiLi9ob21lL2Rpc3BsYXlIb21lXCIpXG4gICAgaG9tZVBhZ2UoKSAvL2Rpc3BsYXlzIGhvbWUgcGFnZSBmaXJzdFxuICAgICQoXCIubmF2X2hvbWVcIikub24oXCJjbGlja1wiLCBob21lUGFnZSkgLy93aWxsIGxvYWQgaG9tZSBwYWdlIHdoZW4gbmF2IGxpbmsgaXMgY2xpY2tlZFxuXG5cbiAgICBjb25zdCBjb250YWN0UGFnZSA9IHJlcXVpcmUoXCIuL2NvbnRhY3QvZGlzcGxheUNvbnRhY3RcIilcbiAgICAkKFwiLm5hdl9jb250YWN0XCIpLm9uKFwiY2xpY2tcIiwgY29udGFjdFBhZ2UpIC8vd2lsbCBsb2FkIGNvbnRhY3QgcGFnZSB3aGVuIG5hdiBsaW5rIGlzIGNsaWNrZWRcbiAgICBcbiAgICBjb25zdCBwcm9qZWN0UGFnZSA9IHJlcXVpcmUoXCIuL3Byb2plY3RzL2Rpc3BsYXlQcm9qZWN0c1wiKVxuICAgICQoXCIubmF2X3Byb2plY3RzXCIpLm9uKFwiY2xpY2tcIiwgcHJvamVjdFBhZ2UpIC8vd2lsbCBsb2FkIHByb2plY3RzIHBhZ2Ugd2hlbiBuYXYgbGluayBpcyBjbGlja2VkXG4gICAgXG4gICAgY29uc3QgcmVzdW1lUGFnZSA9IHJlcXVpcmUoXCIuL3Jlc3VtZS9kaXNwbGF5UmVzdW1lXCIpXG4gICAgJChcIi5uYXZfcmVzdW1lXCIpLm9uKFwiY2xpY2tcIiwgcmVzdW1lUGFnZSkgLy93aWxsIGxvYWQgcmVzdW1lIHBhZ2Ugd2hlbiBuYXYgbGluayBpcyBjbGlja2VkXG4gICAgXG4gICAgY29uc3QgYmxvZ1BhZ2UgPSByZXF1aXJlKFwiLi9ibG9nL2Rpc3BsYXlCbG9nc1wiKVxuICAgICQoXCIubmF2X2Jsb2dcIikub24oXCJjbGlja1wiLCBibG9nUGFnZSkgLy93aWxsIGxvYWQgYmxvZyBwYWdlIHdoZW4gbmF2IGxpbmsgaXMgY2xpY2tlZFxuICAgIFxuICAgIGNvbnN0IGFkbWluUGFnZSA9IHJlcXVpcmUoXCIuL2FkbWluL2Rpc3BsYXlBZG1pblwiKVxuICAgICQoXCIjc2l0ZV9hZG1pblwiKS5vbihcImNsaWNrXCIsIGFkbWluUGFnZSkgLy93aWxsIGxvYWQgYWRtaW4gcGFnZSB3aGVuIGxpbmsgaW4gZm9vdGVyIGlzIGNsaWNrZWRcblxuXG59KVxuXG4iLCJjb25zdCBkb21FbCA9IHJlcXVpcmUoXCIuL2RvbUVsZW1lbnRzXCIpXG5cbi8vZmlsdGVyUGFnZSBmdW5jdGlvbiB0YWtlcyB0d28gcGFyYW1ldGVyczogdGhlIGRhdGFiYXNlIGluIHdoaWNoIHlvdSB3YW50IHRvIGZpbHRlciB0aHJvdWdoIGFuZCB0aGUgZnVuY3Rpb24geW91IHdhbnQgZXhlY3V0ZWQgb24gdGhlIGRhdGFiYXNlXG5jb25zdCBmaWx0ZXJQYWdlID0gKGRiQXJyYXksIGZ1bmMpID0+IHtcbiAgICBjb25zdCBvdXRwdXRFbCA9IGRvbUVsKClcbiAgICBsZXQgcGFnZUxvYWQgPSBcIlwiXG4gICAgXG4gICAgaWYgKGRiQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAvL2NyZWF0ZSBzZWFyY2ggaW5wdXRcbiAgICAgICAgY29uc3Qgc2VhcmNoQmFyID0gXCI8cD5TZWFyY2g6IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuYW1lPVxcXCJwYWdlRmlsdGVyXFxcIiBwbGFjZWhvbGRlcj1cXFwic2VhcmNoIGFsbFxcXCI+PC9wPlwiXG5cbiAgICAgICAgb3V0cHV0RWwuZmlsdGVyLmh0bWwoc2VhcmNoQmFyKVxuICAgICAgICBcbiAgICAgICAgLy90YXJnZXRzIGlucHV0IHRvIGFkZCBhbiBldmVudExpc3RlbmVyXG4gICAgICAgIGNvbnN0IHBhZ2VTZWFyY2ggPSAkKFwiaW5wdXRbbmFtZT0ncGFnZUZpbHRlciddXCIpWzBdXG4gICAgICAgICAgICBcbiAgICAgICAgcGFnZUxvYWQgPSBmdW5jKGRiQXJyYXkpIC8vaW5pdGlhbCBwYWdlIGxvYWQgb2YgaXRlbXNcbiAgICAgICAgXG4gICAgICAgIHBhZ2VTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIFwia2V5dXBcIixcbiAgICAgICAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZihldmVudC50YXJnZXQudmFsdWUubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb252ZXJ0IHdoYXQgaXMgYmVpbmcgZmlsdGVyZWQgdG8gbG93ZXJjYXNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJGaWx0ZXJTdHJpbmcgPSBldmVudC50YXJnZXQudmFsdWUudG9Mb3dlckNhc2UoKVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYWdlRmlsdGVyID0gZGJBcnJheS5maWx0ZXIoZmlsdGVyZWRJdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihrZXkgaW4gZmlsdGVyZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGZpbHRlcmVkSXRlbVtrZXldXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModXNlckZpbHRlclN0cmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy9vdXRwdXQuY29udGVudC5odG1sKHBhZ2VMb2FkKSByZXBvcHVsYXRlcyB0aGUgY29udGVudCBhcmVhIHdoZW4gdXNlciB0eXBlcyBpbiBzZWFyY2ggYmFyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhZ2VGaWx0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlTG9hZCA9IFwiPGgzPlNlYXJjaCBSZXN1bHRzIE5vdCBGb3VuZDwvaDM+XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dEVsLmNvbnRlbnQuaHRtbChwYWdlTG9hZCkgXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlTG9hZCA9IGZ1bmMocGFnZUZpbHRlcikgLy9kaXNwbGF5cyBmaWx0ZXJlZCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0RWwuY29udGVudC5odG1sKHBhZ2VMb2FkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZUxvYWQ9IGZ1bmMoZGJBcnJheSkgLy9kaXNwbGF5cyBpbml0aWFsIHBhZ2UgbG9hZCBpZiBzZWxlY3RvciBoYXMgbGVzcyB0aGFuIHRocmVlIGNoYXJhY3RlcnNcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0RWwuY29udGVudC5odG1sKHBhZ2VMb2FkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICBcbiAgICB9XG4gICAgcmV0dXJuIHBhZ2VMb2FkXG59XG5cbm1vZHVsZS5leHBvcnRzID0gIGZpbHRlclBhZ2UiLCJjb25zdCBkb21FbCA9IHJlcXVpcmUoXCIuL2RvbUVsZW1lbnRzXCIpXG5cbmNvbnN0IHBhZ2luYXRlID0gKGl0ZW1zLCBmdW5jKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0RWwgPSBkb21FbCgpXG4gICAgY29uc3QgdG90YWxJdGVtcyA9IGl0ZW1zLmxlbmd0aFxuICAgIGNvbnN0IGl0ZW1zUGVyUGFnZSA9IDVcbiAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBpdGVtc1BlclBhZ2UpXG4gICAgY29uc3QgcGFnaW5hdGlvbkVsID0gb3V0cHV0RWwuZm9vdGVyXG5cbiAgICAvLyBCdWlsZCB0aGUgRE9NIHN0cmluZyBmb3IgdGhlIHBhZ2luYXRpb24gbGlua3MgaW4gdGhlIGZvb3RlclxuICAgIGxldCBwYWdpbmF0aW9uU3RyaW5nID0gXCI8dWw+XCI7XG4gICAgcGFnaW5hdGlvblN0cmluZyArPSBcIjxhIGlkPSdwcmV2aW91cycgaHJlZj0nIyc+Jmx0OzwvYT5cIjsgLy9nZW5lcmF0ZXMgcHJldmlvdXMgYnV0dG9uXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZlBhZ2VzOyBpKyspIHtcbiAgICAgICAgcGFnaW5hdGlvblN0cmluZyArPSBgIDxsaT48YSBjbGFzcz1cInBhZ2UgcGFnZS0ke2krMX1cIiBocmVmPVwiI1wiPiR7aSsxfTwvYT48L2xpPmAgLy9nZW5lcmF0ZXMgdGhlIGNvcnJlY3QgbnVtYmVyIG9mIGJsb2cgcGFnZSBidXR0b25zIGFuZCBnaXZlcyB0aGVtIGEgY2xhc3Mgb2YgYmxvZ1BhZ2UgYW5kIHBhZ2UtI1xuICAgIH1cbiAgICBwYWdpbmF0aW9uU3RyaW5nICs9IFwiIDxhIGlkPSduZXh0JyBjbGFzcz0ncGFnZS0yJyBocmVmPScjJz4mZ3Q7PC9hPlwiOyAvL2dlbmVyYXRlcyBuZXh0IGJ1dHRvbiwgZGVmYXVsdCBjbGFzcyBpcyBwYWdlLTJcbiAgICBwYWdpbmF0aW9uU3RyaW5nICs9IFwiPC91bD5cIjtcblxuICAgIHBhZ2luYXRpb25FbC5odG1sKHBhZ2luYXRpb25TdHJpbmcpOyAvL2FkZCB0byBET01cblxuICAgIC8vIHJlZmVyZW5jZXMgdG8gdGhlIG5leHQgYW5kIHByZXZpb3VzIGFycm93c1xuICAgIGNvbnN0IHByZXZpb3VzRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZXZpb3VzXCIpOyBcbiAgICBjb25zdCBuZXh0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5leHRcIik7XG5cbiAgICAvL2Z1bmN0aW9uIHRvIGludm9rZSB3aGVuIHVzZXIgY2xpY2tzIHBhZ2luYXRpb24gbGluayBhdCBib3R0b20gb2YgcGFnZVxuICAgIGZ1bmN0aW9uIHByb2R1Y2VJdGVtcyhldmVudCkge1xuXG4gICAgICAgIC8vd2hhdCBkaWQgdGhlIHVzZXIgY2xpY2tcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSBwYXJzZUludCAoIC8vcGFyc2Ugc2luY2UgdGhlIGFycmF5IHdpbGwgcmV0dXJuIGEgc3RyaW5nXG4gICAgICAgICAgICBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QpIC8vdGFyZ2V0IGNsYXNzZXMgb24gdGhlIGNsaWNrZWQgcGFnaW5hdGlvbiBsaW5rXG4gICAgICAgICAgICAgICAgLmZpbmQocGFnZUNsYXNzID0+IHsgXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYWdlQ2xhc3Muc3RhcnRzV2l0aChcInBhZ2UtXCIpKSByZXR1cm4gcGFnZUNsYXNzIC8vaWYgY2xhc3Mgc3RhcnRzIHdpdGggXCJwYWdlLVwiIHRoZW4gcmV0dXJuIHRoYXQgY2xhc3NcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIi1cIilbMV0gLy9zcGxpdCBjbGFzcyB1c2luZyB0aGUgXCItXCIgYXMgdGhlIGRlbGltaXRlciwgWzBdPXBhZ2UgWzFdPSMsIGN1cnJlbnRQYWdlID0gI1xuICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgLy9jaGFuZ2UgY2xhc3Mgb2YgcHJldmlvdXMgYXJyb3dcbiAgICAgICAgaWYgKChjdXJyZW50UGFnZSAtIDEpID09PSAwICkgeyAvL2lmIHRoZSBjdXJyZW50IHBhZ2UgLTEgaXMgMCBcbiAgICAgICAgICAgIHByZXZpb3VzRWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7IC8vdGhlbiBkb24ndCBkaXNwbGF5IHByZXZpb3VzIGFycm93XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcmV2aW91c0VsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjsgLy9pZiBncmVhdGVyIHRoYW4gMCB0aGVuIGRpc3BsYXkgYXJyb3cgXG4gICAgICAgICAgICBwcmV2aW91c0VsLmNsYXNzTmFtZSA9IGBwYWdlLSR7Y3VycmVudFBhZ2UgLSAxfWAgLy9hbmQgYWRkIHRoZSBjbGFzcyBvZiB0aGUgcHJldmlvdXMgcGFnZVxuICAgICAgICB9XG4gICAgICAgIC8vY2hhbmdlIGNsYXNzIG9mIG5leHQgYXJyb3dcbiAgICAgICAgaWYgKChjdXJyZW50UGFnZSArIDEpID4gbnVtYmVyT2ZQYWdlcyApIHsgLy9pZiB0aGUgY3VycmVudCBwYWdlICsxIGlzIG1vcmUgdGhhbiB0aGUgdG90YWwgcGFnZXMgXG4gICAgICAgICAgICBuZXh0RWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7IC8vdGhlbiBkb24ndCBkaXNwbGF5IG5leHQgYXJyb3dcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHRFbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7IC8vaWYgbGVzcyB0aGFuIHRvdGFsIHBhZ2VzIHRoZW4gZGlzcGxheSBhcnJvdyBcbiAgICAgICAgICAgIG5leHRFbC5jbGFzc05hbWUgPSBgcGFnZS0ke2N1cnJlbnRQYWdlICsgMX1gIC8vYW5kIGFkZCB0aGUgY2xhc3Mgb2YgdGhlIG5leHQgcGFnZVxuICAgICAgICB9XG5cbiAgICAgICAgLy9kZXRlcm1pbmUgYmxvZ3MgdG8gZGlzcGxheSBieSBzbGljaW5nIGFycmF5XG4gICAgICAgIGNvbnN0IGJlZ2luID0gKGN1cnJlbnRQYWdlLTEpICogaXRlbXNQZXJQYWdlOyAvL2N1cnJlbnQgcGFnZSBtaW51cyBvbmUsIHRoZW4gbXVsdGlwbHkgYnkgaXRlbXMgcGVyIHBhZ2VcbiAgICAgICAgY29uc3QgZW5kID0gY3VycmVudFBhZ2UgKiBpdGVtc1BlclBhZ2U7IC8vY3VycmVudCBwYWdlIG11bHRpcGxpZWQgYnkgaXRlbXMgcGVyIHBhZ2VcbiAgICAgICAgY29uc3QgaXRlbXNUb0Rpc3BsYXkgPSBpdGVtcy5zbGljZShiZWdpbiwgZW5kKTtcblxuICAgICAgICAvL2l0ZXJhdGUgdGhyb3VnaCBpdGVtc1RvRGlzcGxheSBhbmQgaW5zZXJ0cyB0aGVtIGludG8gRE9NXG4gICAgICAgIGNvbnN0IHBhZ2VMb2FkID0gZnVuYyhpdGVtc1RvRGlzcGxheSkgLy9mdW5jdGlvbiB0byB1cGRhdGUgZG9tXG4gICAgICAgIGRlYnVnZ2VyXG5cbiAgICAgICAgb3V0cHV0RWwuY29udGVudC5odG1sKHBhZ2VMb2FkKVxuICAgIFxuICAgIH0vL2VuZCBvZiBwcm9kdWNlSXRlbXNcblxuICAgIC8vIEdldCB0aGUgYXJyYXkgb2YgcGFnaW5hdGlvbiBhbmNob3IgdGFncyB3ZSBhZGRlZCB0byB0aGUgRE9NXG4gICAgY29uc3QgcGFnZUxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBhZ2VcIik7XG4gICAgXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyB0byBlYWNoIDxhPiBlbGVtZW50IGluIHRoZSBwYWdpbmF0aW9uXG4gICAgcGFnZUxpbmtzLmZvckVhY2goIGxpbmsgPT4ge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9kdWNlSXRlbXMsIGZhbHNlKSAvL3doZW4gcGFnaW5hdGlvbiBsaW5rIGlzIGNsaWNrZWQsIHJ1biBwcm9kdWNlSXRlbXMgZnVuY3Rpb24gXG4gICAgfSlcbiAgICBcbiAgICAvL2RlZmF1bHQgc28gdGhhdCBmaXJzdCBwYWdlIGxvYWRzXG4gICAgcHJvZHVjZUl0ZW1zKHtcbiAgICAgICAgXCJ0YXJnZXRcIjoge1xuICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1wicGFnZS0xXCJdXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL2V2ZW50IGxpc3RlbmVycyBmb3IgcHJldmlvdXMgYW5kIG5leHQgZWxlbWVudHNcbiAgICBwcmV2aW91c0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9kdWNlSXRlbXMsIGZhbHNlKTtcbiAgICBuZXh0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2R1Y2VJdGVtcywgZmFsc2UpO1xuXG59Ly9lbmQgb2YgcGFnaW5hdGVcblxubW9kdWxlLmV4cG9ydHMgPSBwYWdpbmF0ZSIsIi8vdGhpcyBtb2R1bGUgd2lsbCBkaXNwbGF5IHByb2plY3QgaW5mb3JtYXRpb25cblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IHByb2plY3RDb250ZW50ID0gcmVxdWlyZShcIi4vcHJvamVjdHNDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlQcm9qZWN0ID0gKCkgPT4ge1xuICAgIFxuICAgIHByb2plY3RDb250ZW50KCkudGhlbiggcHJvZHVjdFN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RIZWFkZXIgPSBcIjxoMT5LcmlzdGVuJ3MgUHJvamVjdHM8L2gxPlwiXG4gICAgICAgIGNvbnN0IHByb2plY3RJbmZvID0gcHJvZHVjdFN0cmluZ1xuICAgIFxuICAgICAgICBkaXNwbGF5UGFnZShwcm9qZWN0SGVhZGVyLCBwcm9qZWN0SW5mbylcbiAgICAgICAgXG4gICAgICAgICQoXCIjcGFnZS1mb290ZXJcIikuaHRtbChcIlwiKVxuICAgIH0pXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5UHJvamVjdFxuIiwiY29uc3QgcHJvamVjdENvbnRlbnQgPSAoaXRlbUFycmF5KSA9PiB7XG4gICAgbGV0IHByb2plY3RTdHJpbmcgPSBcIlwiXG4gICAgLy8gYnVpbGRzIHByb2plY3Qgc2VjdGlvblxuICAgIHByb2plY3RTdHJpbmcgKz0gYFxuICAgIDxzZWN0aW9uIGlkPVwicHJvamVjdHNcIj5cbiAgICBgXG4gICAgLy9pdGVyYXRlIHRocm91Z2ggZWFjaCBwcm9qZWN0IGFuZCBhZGQgdG8gcHJvamVjdFN0cmluZ1xuICAgIGl0ZW1BcnJheS5mb3JFYWNoKFxuICAgICAgICBwcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIHByb2plY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwcm9qZWN0XCI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwicHJvamVjdC1uYW1lXCI+JHtwcm9qZWN0Lm5hbWV9PC9oMj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtZGF0ZVwiPjxiPkRhdGUgQ29tcGxldGVkOjwvYj4gJHtwcm9qZWN0LmRhdGVfY29tcGxldGVkfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtdGVjaFwiPjxiPlRlY2hub2xvZ2llcyBVc2VkOjwvYj4gJHtwcm9qZWN0LnRlY2hub2xvZ2llc191c2VkfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtdGVhbVwiPjxiPlRlYW1tYXRlcyAoaWYgYXBwbGljYWJsZSk6PC9iPiAke3Byb2plY3QudGVhbW1hdGVzfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtZGVzY3JpcHRpb25cIj4ke3Byb2plY3QuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgIH1cbiAgICApXG5cbiAgICAvL2Nsb3NpbmcgdGFnIGZvciBwcm9qZWN0IHNlY3Rpb25cbiAgICBwcm9qZWN0U3RyaW5nICs9IGBcbiAgICAgICAgPC9zZWN0aW9uPlxuICAgIGBcbiAgICByZXR1cm4gcHJvamVjdFN0cmluZ1xuICAgIFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb2plY3RDb250ZW50IiwiLy9jb250cm9scyBob3cgdGhlIGNvbnRlbnQgaXMgd3JpdHRlbiB0byB0aGUgZG9tIGZvciBwcm9qZWN0cyBwYWdlXG5jb25zdCBwcm9qZWN0RmlsdGVyID0gcmVxdWlyZShcIi4uL3BhZ2VGaWx0ZXJcIilcbmNvbnN0IHByb2plY3RDb250ZW50ID0gcmVxdWlyZShcIi4vcHJvamVjdENvbnRlbnRcIilcblxuY29uc3QgcHJvamVjdHNET00gPSAoKSA9PiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9wZXJzb25hbC1zaXRlLWNmMWI4LmZpcmViYXNlaW8uY29tL3Byb2plY3RzLmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIiAgXG4gICAgfSkudGhlbihcbiAgICAgICAgcHJvamVjdERiID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHByb2plY3RGaWx0ZXIocHJvamVjdERiLCBwcm9qZWN0Q29udGVudClcblxuICAgICAgICB9XG4gICAgKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvamVjdHNET01cblxuIiwiLy90aGlzIG1vZHVsZSB3aWxsIGRpc3BsYXkgcmVzdW1lIGluZm9ybWF0aW9uXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCByZXN1bWVDb250ZW50ID0gcmVxdWlyZShcIi4vcmVzdW1lQ29udHJvbGxlclwiKVxuXG5jb25zdCBkaXNwbGF5UmVzdW1lID0gKCkgPT4ge1xuICAgIFxuICAgIHJlc3VtZUNvbnRlbnQoKS50aGVuKCByZXN1bWVTdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCByZXN1bWVIZWFkZXIgPSBcIjxoMT5Kb2IgSGlzdG9yeSBmb3IgS3Jpc3RlbiBOb3JyaXM8L2gxPlwiXG4gICAgICAgIGNvbnN0IHJlc3VtZUluZm8gPSByZXN1bWVTdHJpbmdcbiAgICBcbiAgICAgICAgZGlzcGxheVBhZ2UocmVzdW1lSGVhZGVyLCByZXN1bWVJbmZvKVxuICAgIH0pXG5cbiAgICAkKFwiI3BhZ2UtZmlsdGVyXCIpLmh0bWwoXCJcIilcbiAgICAkKFwiI3BhZ2UtZm9vdGVyXCIpLmh0bWwoXCJcIilcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5UmVzdW1lIiwiLy9jb250cm9scyBob3cgdGhlIGNvbnRlbnQgaXMgd3JpdHRlbiB0byB0aGUgZG9tIGZvciByZXN1bWUgcGFnZVxuXG5jb25zdCByZXN1bWVET00gPSAoKSA9PiB7XG5cbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL3BlcnNvbmFsLXNpdGUtY2YxYjguZmlyZWJhc2Vpby5jb20vcmVzdW1lLmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIlxuICAgIH0pXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgICAgcmVzdW1lRGIgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bWVTdHJpbmcgPSBcIlwiXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVzdW1lRGIuZm9yRWFjaCggam9iID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdW1lU3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJqb2JcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwiY29tcGFueVwiPiR7am9iLmNvbXBhbnl9ICgke2pvYi5sb2NhdGlvbn0pPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPiR7am9iLnBvc2l0aW9ufTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzPiR7am9iLnN0YXJ0RGF0ZX0gLSAke2pvYi5lbmREYXRlfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic3VtbWFyeVwiPjxiPlN1bW1hcnk6IDwvYj4ke2pvYi5zdW1tYXJ5fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInJlc3BvbnNpYmlsaXRpZXNcIj48Yj5SZXNwb25zaWJpbGl0aWVzIGluY2x1ZGVkOiA8L2I+JHtqb2IucmVzcG9uc2liaWxpdGllc308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdW1lU3RyaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgIClcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3VtZURPTSJdfQ==
