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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FkbWluL2Jsb2dGb3JtLmpzIiwic2NyaXB0cy9hZG1pbi9kaXNwbGF5QWRtaW4uanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0NvbnRlbnQuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0NvbnRyb2xsZXIuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0ZpbHRlci5qcyIsInNjcmlwdHMvYmxvZy9kaXNwbGF5QmxvZ3MuanMiLCJzY3JpcHRzL2J1aWxkRm9vdGVyLmpzIiwic2NyaXB0cy9idWlsZE5hdmlnYXRpb24uanMiLCJzY3JpcHRzL2NvbnRhY3QvY29udGFjdENvbnRyb2xsZXIuanMiLCJzY3JpcHRzL2NvbnRhY3QvZGlzcGxheUNvbnRhY3QuanMiLCJzY3JpcHRzL2Rpc3BsYXlQYWdlLmpzIiwic2NyaXB0cy9kb21FbGVtZW50cy5qcyIsInNjcmlwdHMvaG9tZS9kaXNwbGF5SG9tZS5qcyIsInNjcmlwdHMvbWFpbi5qcyIsInNjcmlwdHMvcGFnZUZpbHRlci5qcyIsInNjcmlwdHMvcGFnaW5hdGUuanMiLCJzY3JpcHRzL3Byb2plY3RzL2Rpc3BsYXlQcm9qZWN0cy5qcyIsInNjcmlwdHMvcHJvamVjdHMvcHJvamVjdENvbnRlbnQuanMiLCJzY3JpcHRzL3Byb2plY3RzL3Byb2plY3RzQ29udHJvbGxlci5qcyIsInNjcmlwdHMvcmVzdW1lL2Rpc3BsYXlSZXN1bWUuanMiLCJzY3JpcHRzL3Jlc3VtZS9yZXN1bWVDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5sZXQgZm9ybVN0cmluZyA9IFwiXCJcblxuZm9ybVN0cmluZyArPSBgXG4gICAgPHNlY3Rpb24gaWQ9XCJibG9nX2Zvcm1cIj5cbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJmb3JtX25ldy1ibG9nXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZm9ybV90aXRsZVwiPlRpdGxlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cImZvcm1fdGl0bGVcIiBwbGFjZWhvbGRlcj1cInRpdGxlXCIgY2xhc3M9XCJmb3JtX2ZpZWxkXCI+XG5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmb3JtX3B1Ymxpc2hlZFwiPkRhdGUgUG9zdGVkPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBuYW1lPVwicHVibGlzaGVkXCIgaWQ9XCJmb3JtX3B1Ymxpc2hlZFwiIGNsYXNzPVwiZm9ybV9maWVsZFwiIHJlcXVpcmVkPlxuXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZm9ybV93ZWVrXCI+RGF0ZXMgb2YgV2VlazwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIndlZWtfZGF0ZXNcIiBpZD1cImZvcm1fd2Vla1wiIHBsYWNlaG9sZGVyPVwiTU9OVEggbW9uIC0gZnJpLCBZRUFSXCI+XG5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmb3JtX2F1dGhvclwiPkF1dGhvcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImF1dGhvclwiIGlkPVwiZm9ybV9hdXRob3JcIiB2YWx1ZT1cIktyaXN0ZW4gTm9ycmlzXCI+XG5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJcIj5DZWxlYnJhdGlvbnMgYW5kIEluc3BpcmF0aW9uczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cImZvcm1fY2VsZWJyYXRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGlkPVwiZm9ybV9jZWxlYnJhdGlvbl8xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY2VsZWJyYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJyZW1vdmVfY2VsZWJyYXRpb25fMVwiPlJlbW92ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImFkZC1jZWxlYnJhdGlvblwiIGNsYXNzPVwiYWRkXCI+QWRkIENlbGVicmF0aW9uPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJcIj5DaGFsbGVuZ2VzIGFuZCBIYW5nLVVwczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cImZvcm1fY2hhbGxlbmdlc1wiPlxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBpZD1cImZvcm1fY2hhbGxlbmdlXzFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJjaGFsbGVuZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJyZW1vdmVfY2hhbGxlbmdlXzFcIj5SZW1vdmU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJhZGQtY2hhbGxlbmdlXCIgY2xhc3M9XCJhZGRcIj5BZGQgQ2hhbGxlbmdlPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmb3JtX3RhZ3NcIj5CbG9nIFRhZ3M8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0YWdzXCIgaWQ9XCJmb3JtX3RhZ3NcIiBwbGFjZWhvbGRlcj1cInNlcGFyYXRlIHRhZ3Mgd2l0aCBhIGNvbW1hXCI+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgPGJ1dHRvbiBpZD1cImJ1dHRvbl9zdWJtaXQtYmxvZ1wiPlN1Ym1pdCBCbG9nPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gaWQ9XCJidXR0b25fY2xlYXItYmxvZ1wiPkNsZWFyPC9idXR0b24+XG4gICAgPC9zZWN0aW9uPlxuYFxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvcm1TdHJpbmciLCJcbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCBibG9nRm9ybSA9IHJlcXVpcmUoXCIuL2Jsb2dGb3JtXCIpXG5cbmNvbnN0IGRpc3BsYXlBZG1pbiA9ICgpID0+IHtcblxuXG4gICAgY29uc3QgYWRtaW5IZWFkZXIgPSBcIjxoMT5DcmVhdGUgYSBCbG9nIFBvc3Q8L2gxPlwiXG4gICAgZGlzcGxheVBhZ2UoYWRtaW5IZWFkZXIsIGJsb2dGb3JtKVxuXG59XG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlBZG1pbiIsIi8vdGhlIG1vZHVsZSBnZW5lcmF0ZXMgdGhlIGNvbnRlbnQgb2YgdGhlIGJsb2dzXG5cbmNvbnN0IGJsb2dDb250ZW50ID0gKGl0ZW1BcnJheSkgPT4ge1xuICAgIGxldCBibG9nU3RyaW5nID0gXCJcIlxuICAgIFxuICAgIC8vYnVpbGRzIGJsb2cgc2VjdGlvblxuICAgIGJsb2dTdHJpbmcgKz0gYFxuICAgIDxzZWN0aW9uIGlkPVwicHJvamVjdHNcIj5cbiAgICBgXG4gICAgXG4gICAgLy8gZm9yIGVhY2ggYmxvZyBlbnRyeSwgYnVpbGQgdGhlIGZvbGxvd2luZyBodG1sIHRvIGNyZWF0ZSBibG9nIGNvbnRlbnRcbiAgICBpdGVtQXJyYXkuZm9yRWFjaChcbiAgICAgICAgYmxvZyA9PiB7IFxuICAgICAgICAgICAgYmxvZ1N0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPGFydGljbGUgaWQ9XCJibG9nLSR7YmxvZy5pZH1cIiBjbGFzcz1cImJsb2dcIj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cIndlZWtOdW1cIj4ke2Jsb2cudGl0bGV9PC9oMj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIndlZWtEYXRlXCI+JHtibG9nLndlZWtfZGF0ZXN9PC9wPlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxoMz5DZWxlYnJhdGlvbnMgJiBJbnNwaXJhdGlvbnM8L2gzPlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgIFxuICAgICAgICAgICAgLy9pdGVyYXRlcyBvdmVyIGNlbGVicmF0aW9uIGFycmF5XG4gICAgICAgICAgICBibG9nLmNlbGVicmF0aW9ucy5mb3JFYWNoKGNlbGVicmF0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBibG9nU3RyaW5nICs9IGA8bGk+JHtjZWxlYnJhdGlvbn08L2xpPmA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBibG9nU3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8aDM+Q2hhbGxlbmdlcyAmIEhhbmctVXBzPC9oMz5cbiAgICAgICAgICAgICAgICA8dWw+YFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2l0ZXJhdGVzIG92ZXIgY2hhbGxlbmdlcyBhcnJheVxuICAgICAgICAgICAgYmxvZy5jaGFsbGVuZ2VzLmZvckVhY2goY2hhbGxlbmdlID0+IHtcbiAgICAgICAgICAgICAgICBibG9nU3RyaW5nICs9IGA8bGk+JHtjaGFsbGVuZ2V9PC9saT5gO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYmxvZ1N0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGZvb3Rlcj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Qb3N0ZWQgYnkgJHtibG9nLmF1dGhvcn0gb24gJHtibG9nLnB1Ymxpc2hlZH08L3RpbWU+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIClcbiAgICBcbiAgICAvL2Nsb3NpbmcgdGFnIGZvciBibG9nIHNlY3Rpb25cbiAgICBibG9nU3RyaW5nICs9IGBcbiAgICAgICAgPC9zZWN0aW9uPlxuICAgIGBcblxuICAgIHJldHVybiBibG9nU3RyaW5nXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmxvZ0NvbnRlbnRcbiIsIi8vY29udHJvbHMgaG93IHRoZSBjb250ZW50IGlzIHdyaXR0ZW4gdG8gdGhlIGRvbSBmb3IgYmxvZyBwYWdlXG5jb25zdCBwYWdpbmF0ZSA9IHJlcXVpcmUoXCIuLi9wYWdpbmF0ZVwiKVxuY29uc3QgYmxvZ0ZpbHRlciA9IHJlcXVpcmUoXCIuLi9wYWdlRmlsdGVyXCIpXG5jb25zdCBmaWx0ZXIgPSByZXF1aXJlKFwiLi9ibG9nRmlsdGVyXCIpXG5jb25zdCBibG9nQ29udGVudCA9IHJlcXVpcmUoXCIuL2Jsb2dDb250ZW50XCIpXG5cbmNvbnN0IGJsb2dET00gPSAoKSA9PiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9wZXJzb25hbC1zaXRlLWNmMWI4LmZpcmViYXNlaW8uY29tL2Jsb2cuanNvblwiLFxuICAgICAgICBcIm1ldGhvZFwiOiBcIkdFVFwiXG4gICAgfSkudGhlbihcbiAgICAgICAgYmxvZ0RiID0+IHtcbiAgICAgICAgICAgIHJldHVybiBibG9nRmlsdGVyKGJsb2dEYiwgYmxvZ0NvbnRlbnQsIGZpbHRlcilcbiAgICAgICAgICAgIC8vIHJldHVybiBwYWdpbmF0ZShibG9nRGIsIGJsb2dDb250ZW50KVxuICAgICAgICB9XG4gICAgKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmxvZ0RPTSIsIlxuY29uc3QgYmxvZ3NGaWx0ZXIgPSAoZGF0YWJhc2UpID0+IHtcbiAgICBkYXRhYmFzZS5maWx0ZXIoXG4gICAgICAgIGZpbHRlcmVkQmxvZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWRCbG9nLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModXNlckZpbHRlclN0cmluZykgfHwgLy9sb29rIHRocm91Z2ggdGl0bGVzXG4gICAgICAgICAgICBmaWx0ZXJlZEJsb2cuY2VsZWJyYXRpb25zLmZpbHRlciggLy9pdGVyYXRlIG92ZXIgdGhlIGNlbGVicmF0aW9ucyBhcnJheVxuICAgICAgICAgICAgICAgIGZpbHRlckNlbGVicmF0aW9uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlckNlbGVicmF0aW9uLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModXNlckZpbHRlclN0cmluZylcbiAgICAgICAgICAgICAgICB9KS5sZW5ndGggfHwgLy9pZiB0aGUgbGVuZ3RoIGlzIDAgdGhlbiBpdCByZXR1cm5zIGZhbHNlXG4gICAgICAgICAgICBmaWx0ZXJlZEJsb2cuY2hhbGxlbmdlcy5maWx0ZXIoIC8vaXRlcmF0ZSBvdmVyIHRoZSBjaGFsbGVuZ2VzIGFycmF5XG4gICAgICAgICAgICAgICAgZmlsdGVyQ2hhbGxlbmdlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlckNoYWxsZW5nZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHVzZXJGaWx0ZXJTdHJpbmcpXG4gICAgICAgICAgICAgICAgfSkubGVuZ3RoIHx8XG4gICAgICAgICAgICAgICAgZmlsdGVyZWRCbG9nLndlZWtfZGF0ZXMudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh1c2VyRmlsdGVyU3RyaW5nKVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICApXG59XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGJsb2dzRmlsdGVyIiwiLy90aGlzIG1vZHVsZSB3aWxsIGRpc3BsYXkgdGhlIGJsb2dzXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCBibG9nQ29udGVudCA9IHJlcXVpcmUoXCIuL2Jsb2dDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlCbG9nID0gKCkgPT4ge1xuXG4gICAgXG4gICAgYmxvZ0NvbnRlbnQoKS50aGVuKFxuICAgICAgICBibG9nU3RyaW5nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJsb2dIZWFkZXIgPSBcIjxoMT5NeSBOYXNodmlsbGUgU29mdHdhcmUgU2Nob29sIEV4cGVyaWVuY2U8L2gxPlwiXG4gICAgICAgICAgICBjb25zdCBibG9nSW5mbyA9IGJsb2dTdHJpbmdcblxuICAgICAgICAgICAgZGlzcGxheVBhZ2UoYmxvZ0hlYWRlciwgYmxvZ0luZm8pXG4gICAgICAgIH1cbiAgICApXG5cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlCbG9nXG5cbi8vIGNvbnN0IGRpc3BsYXlCbG9nID0gKCkgPT4ge1xuLy8gICAgIDxoZWFkZXIgY2xhc3M9XCJwYWdlLWhlYWRlclwiPlxuLy8gICAgIDxoMT5NeSBOYXNodmlsbGUgU29mdHdhcmUgU2Nob29sIEV4cGVyaWVuY2U8L2gxPlxuLy8gICAgIDxhIGhyZWY9XCIuLi9hZG1pbi9ibG9nLmh0bWxcIj5BZG1pbjwvYT5cbi8vICAgICA8L2hlYWRlcj5cblxuLy8gICAgIDxwPlNlYXJjaDogPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImJsb2dGaWx0ZXJcIiBwbGFjZWhvbGRlcj1cInNlYXJjaCBhbGwgYmxvZyBwb3N0c1wiPjwvcD5cbi8vICAgICA8c2VjdGlvbiBpZD1cImJsb2ctcG9zdHNcIj5cbi8vICAgICA8IS0tIHBvcHVsYXRlZCB0aHJvdWdoIGRhdGFiYXNlIC0tPlxuLy8gICAgIDwvc2VjdGlvbj5cblxuXG4vLyAgICAgPGZvb3RlciBpZD1cImJsb2ctcGFnaW5hdG9yXCI+XG5cbi8vICAgICA8L2Zvb3Rlcj5cblxuXG4vLyB9Iiwie1xuICAgIGNvbnN0IGZvb3RlckVsID0gJChcIiNzaXRlLWZvb3RlclwiKVxuXG4gICAgZm9vdGVyRWwuYXBwZW5kKFwiPGEgaHJlZj1cXFwiI1xcXCIgaWQ9XFxcInNpdGVfYWRtaW5cXFwiPkFkbWluPC9hPlwiKVxuXG4gICAgLy8gZm9vdGVyRWwuY3JlYXRlKFwiYnV0dG9uXCIpXG59XG5tb2R1bGUuZXhwb3J0cyA9IG51bGwiLCJjb25zdCBuYXZpZ2F0aW9uID0gW1xuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiSG9tZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIlJlc3VtZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkNvbnRhY3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJQcm9qZWN0c1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkJsb2dcIlxuICAgIH1cbl1cblxuY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LWl0ZW1zXCIpO1xuXG5jb25zdCBuYXZMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG5cbm5hdmlnYXRpb24uZm9yRWFjaChcbiAgICBwYWdlID0+IHtcbiAgICAgICAgY29uc3QgbmF2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcbiAgICAgICAgbmF2RWwuY2xhc3NMaXN0LmFkZChcIm5hdkxpbmtcIilcblxuICAgICAgICBjb25zdCBuYXZMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcbiAgICAgICAgbmF2TGluay5ocmVmID0gXCIjXCJcbiAgICAgICAgbmF2TGluay5jbGFzc05hbWUgPSBgbmF2XyR7cGFnZS5kaXNwbGF5LnRvTG93ZXJDYXNlKCl9YFxuICAgICAgICBuYXZMaW5rLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBhZ2UuZGlzcGxheSkpXG5cblxuICAgICAgICBuYXZFbC5hcHBlbmRDaGlsZChuYXZMaW5rKVxuICAgICAgICBuYXZMaXN0LmFwcGVuZENoaWxkKG5hdkVsKVxuICAgIH1cbilcblxubmF2RWxlbWVudC5hcHBlbmRDaGlsZChuYXZMaXN0KVxuXG5tb2R1bGUuZXhwb3J0cyA9IG51bGwiLCIvL2NvbnRyb2xzIGhvdyB0aGUgY29udGVudCBpcyB3cml0dGVuIHRvIHRoZSBkb20gZm9yIGNvbnRhY3QgcGFnZVxuY29uc3QgY29udGFjdERPTSA9ICgpID0+IHtcblxuICAgIHJldHVybiAkLmFqYXgoeyAvL25lZWQgdG8gcmV0dXJuIGFqYXggZnVuY3Rpb24gc28gdGhhdCBjb250YWN0RE9NIGNhbiBhY2Nlc3MgdGhlIHN0cmluZyByZXR1cm5lZCBpbiAudGhlbigpXG4gICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9wZXJzb25hbC1zaXRlLWNmMWI4LmZpcmViYXNlaW8uY29tL2NvbnRhY3QuanNvblwiLFxuICAgICAgICBcIm1ldGhvZFwiOiBcIkdFVFwiXG4gICAgfSlcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICBjb250YWN0RGIgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb250YWN0U3RyaW5nID0gXCJcIjtcblxuICAgICAgICAgICAgICAgIC8vYnVpbGRzIGNvbnRhY3QgYnkgZW1haWwgc2VjdGlvblxuICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjb250YWN0XCI+U2VuZCBhbiBlbWFpbDo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9XCJzZW5kLWVtYWlsXCI+IFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZW1haWxcIj48YSBocmVmPVwibWFpbHRvOiR7Y29udGFjdERiLmVtYWlsfVwiPiR7Y29udGFjdERiLmVtYWlsfTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAvL2J1aWxkcyBjb250YWN0IHRocm91Z2ggc29jaWFsIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY29udGFjdFwiPkNvbm5lY3Qgb24gc29jaWFsIG1lZGlhOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBpZD1cInNvY2lhbC1tZWRpYVwiPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICAgICAgLy9pdGVyYXRlcyB0aHJvdWdoIGVhY2ggc29jaWFsIHNpdGVcbiAgICAgICAgICAgICAgICBjb250YWN0RGIuc29jaWFsLmZvckVhY2goc2l0ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJzb2NpYWxcIj48YSBocmVmPVwiJHtzaXRlLnVybH1cIj4ke3NpdGUuc2VydmljZX08L2E+PC9saT5cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIC8vY2xvc2luZyB0YWdzIGZvciB1bm9yZGVyZWQgbGlzdCBhbmQgY29udGFjdCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICBgXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFjdFN0cmluZ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29udGFjdERPTSIsIi8vdGhpcyBtb2R1bGUgd2lsbCBkaXNwbGF5IGNvbnRhY3QgaW5mb3JtYXRpb25cblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IGNvbnRhY3RDb25lbnQgPSByZXF1aXJlKFwiLi9jb250YWN0Q29udHJvbGxlclwiKVxuXG5jb25zdCBkaXNwbGF5Q29udGFjdCA9ICgpID0+IHtcbiAgICBjb250YWN0Q29uZW50KCkudGhlbihjb250YWN0U3RyaW5nID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbnRhY3RIZWFkZXIgPSBcIjxoMT5Db250YWN0IE1lPC9oMT5cIlxuICAgICAgICBjb25zdCBjb250YWN0SW5mbyA9IGNvbnRhY3RTdHJpbmdcbiAgICAgICAgXG4gICAgICAgIGRpc3BsYXlQYWdlKGNvbnRhY3RIZWFkZXIsIGNvbnRhY3RJbmZvKSAvL2Rpc3BsYXlQYWdlIG5lZWRzIHRvIGJlIHdpdGhpbiB0aGUgY29udGFjdENvbnRlbnQoKS50aGVuIGJlY2F1c2UgaXQgaXMgZGVwZW5kZW50IG9uIHRoZSBzdHJpbmcgdGhhdCBpcyByZXR1cm5lZCB3aGVuIHRoZSB0aGVuIGZ1bmN0aW9uIHJ1bnNcbiAgICAgICAgXG4gICAgICAgICQoXCIjcGFnZS1maWx0ZXJcIikuaHRtbChcIlwiKVxuICAgICAgICAkKFwiI3BhZ2UtZm9vdGVyXCIpLmh0bWwoXCJcIilcbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlDb250YWN0IiwiY29uc3QgZG9tRWwgPSByZXF1aXJlKFwiLi9kb21FbGVtZW50c1wiKVxuXG5jb25zdCBvdXRwdXRFbCA9IGRvbUVsKClcblxuY29uc3QgZGlzcGxheVBhZ2UgPSAocGFnZUhlYWRlciwgcGFnZUNvbnRlbnQpID0+IHtcblxuICAgIGNvbnN0IGhlYWRlckVsID0gb3V0cHV0RWwuaGVhZGVyXG4gICAgaGVhZGVyRWwuaHRtbChwYWdlSGVhZGVyKSAvL2FkZHMgdGhlIHBhZ2UgaGVhZGVyIHRvIHRoZSBkb21cblxuICAgIGNvbnN0IGNvbnRlbnRFbCA9IG91dHB1dEVsLmNvbnRlbnRcbiAgICBjb250ZW50RWwuaHRtbChwYWdlQ29udGVudCkgLy9hZGRzIHRoZSBjb250ZW50IG9mIHBhZ2UgdG8gdGhlIGRvbVxuXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5UGFnZSIsIi8vdGhpcyBtb2R1bGUgY2FwdHVyZXMgdGhlIGRvbSBlbGVtZW50cyB0aGF0IHdpbGwgYmUgd3JpdHRlbiB0byB3aGVuIGVhY2ggcGFnZSBpcyBjYWxsZWRcblxuY29uc3QgZG9tRWxlbWVudHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCwge1xuICAgICAgICBcImhlYWRlclwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogJChcIiNwYWdlLWhlYWRlclwiKSAvL2dldHMgaGVhZGVyIHNlY3Rpb25cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb250ZW50XCI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAkKFwiI3BhZ2UtY29udGVudFwiKSAvL2dldHMgY29udGVudCBzZWN0aW9uXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAkKFwiI3BhZ2UtZmlsdGVyXCIpIC8vc2VjdGlvbiB0byBhZGQgZmlsdGVyIHdoZW4gcGFnZUZpbHRlciBpcyBhZGRlZCB0byBhIHBhZ2VcbiAgICAgICAgfSxcbiAgICAgICAgXCJmb290ZXJcIjoge1xuICAgICAgICAgICAgdmFsdWU6ICQoXCIjcGFnZS1mb290ZXJcIikgLy9zZWN0aW9uIHRvIGFkZCBwYWdlIGZvb3RlciBzdWNoIGFzIHBhZ2luYXRpb25cbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBkb21FbGVtZW50cyIsIi8vdGhpcyBtb2R1bGUgd2lsbCBkaXNwbGF5IHRoZSBob21lIHBhZ2VcblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcblxuY29uc3QgZGlzcGxheUhvbWUgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBob21lSGVhZGVyID0gYFxuICAgIFxuICAgICAgICA8aDE+S3Jpc3RlbiBOb3JyaXM8L2gxPlxuICAgICAgICA8aDIgaWQ9XCJjb2hvcnRcIj5OU1MgQ29ob3J0IDIyPC9oMj5cbiAgICBgXG4gICAgY29uc3QgaG9tZUluZm8gPSBcIlwiXG4gICAgICAgIFxuICAgIGRpc3BsYXlQYWdlKGhvbWVIZWFkZXIsIGhvbWVJbmZvKSBcbiAgICAgICAgXG4gICAgJChcIiNwYWdlLWZpbHRlclwiKS5odG1sKFwiXCIpXG4gICAgJChcIiNwYWdlLWZvb3RlclwiKS5odG1sKFwiXCIpXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5SG9tZSIsIlxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IG5hdkJhciA9IHJlcXVpcmUoXCIuL2J1aWxkTmF2aWdhdGlvblwiKSAvL2Rpc3BsYXlzIHNpdGUgbmF2aWdhdGlvblxuICAgIGNvbnN0IGZvb3RlciA9IHJlcXVpcmUoXCIuL2J1aWxkRm9vdGVyXCIpIC8vZGlzcGxheXMgc2l0ZSBmb290ZXJcbiAgICBcbiAgICBjb25zdCBob21lUGFnZSA9IHJlcXVpcmUoXCIuL2hvbWUvZGlzcGxheUhvbWVcIilcbiAgICBob21lUGFnZSgpIC8vZGlzcGxheXMgaG9tZSBwYWdlIGZpcnN0XG4gICAgJChcIi5uYXZfaG9tZVwiKS5vbihcImNsaWNrXCIsIGhvbWVQYWdlKSAvL3dpbGwgbG9hZCBob21lIHBhZ2Ugd2hlbiBuYXYgbGluayBpcyBjbGlja2VkXG5cblxuICAgIGNvbnN0IGNvbnRhY3RQYWdlID0gcmVxdWlyZShcIi4vY29udGFjdC9kaXNwbGF5Q29udGFjdFwiKVxuICAgICQoXCIubmF2X2NvbnRhY3RcIikub24oXCJjbGlja1wiLCBjb250YWN0UGFnZSkgLy93aWxsIGxvYWQgY29udGFjdCBwYWdlIHdoZW4gbmF2IGxpbmsgaXMgY2xpY2tlZFxuICAgIFxuICAgIGNvbnN0IHByb2plY3RQYWdlID0gcmVxdWlyZShcIi4vcHJvamVjdHMvZGlzcGxheVByb2plY3RzXCIpXG4gICAgJChcIi5uYXZfcHJvamVjdHNcIikub24oXCJjbGlja1wiLCBwcm9qZWN0UGFnZSkgLy93aWxsIGxvYWQgcHJvamVjdHMgcGFnZSB3aGVuIG5hdiBsaW5rIGlzIGNsaWNrZWRcbiAgICBcbiAgICBjb25zdCByZXN1bWVQYWdlID0gcmVxdWlyZShcIi4vcmVzdW1lL2Rpc3BsYXlSZXN1bWVcIilcbiAgICAkKFwiLm5hdl9yZXN1bWVcIikub24oXCJjbGlja1wiLCByZXN1bWVQYWdlKSAvL3dpbGwgbG9hZCByZXN1bWUgcGFnZSB3aGVuIG5hdiBsaW5rIGlzIGNsaWNrZWRcbiAgICBcbiAgICBjb25zdCBibG9nUGFnZSA9IHJlcXVpcmUoXCIuL2Jsb2cvZGlzcGxheUJsb2dzXCIpXG4gICAgJChcIi5uYXZfYmxvZ1wiKS5vbihcImNsaWNrXCIsIGJsb2dQYWdlKSAvL3dpbGwgbG9hZCBibG9nIHBhZ2Ugd2hlbiBuYXYgbGluayBpcyBjbGlja2VkXG4gICAgXG4gICAgY29uc3QgYWRtaW5QYWdlID0gcmVxdWlyZShcIi4vYWRtaW4vZGlzcGxheUFkbWluXCIpXG4gICAgJChcIiNzaXRlX2FkbWluXCIpLm9uKFwiY2xpY2tcIiwgYWRtaW5QYWdlKSAvL3dpbGwgbG9hZCBhZG1pbiBwYWdlIHdoZW4gbGluayBpbiBmb290ZXIgaXMgY2xpY2tlZFxuXG5cbn0pXG5cbiIsImNvbnN0IGRvbUVsID0gcmVxdWlyZShcIi4vZG9tRWxlbWVudHNcIilcblxuLy9maWx0ZXJQYWdlIGZ1bmN0aW9uIHRha2VzIHR3byBwYXJhbWV0ZXJzOiB0aGUgZGF0YWJhc2UgaW4gd2hpY2ggeW91IHdhbnQgdG8gZmlsdGVyIHRocm91Z2ggYW5kIHRoZSBmdW5jdGlvbiB5b3Ugd2FudCBleGVjdXRlZCBvbiB0aGUgZGF0YWJhc2VcbmNvbnN0IGZpbHRlclBhZ2UgPSAoZGJBcnJheSwgZnVuYykgPT4ge1xuICAgIGNvbnN0IG91dHB1dEVsID0gZG9tRWwoKVxuICAgIGxldCBwYWdlTG9hZCA9IFwiXCJcbiAgICBcbiAgICBpZiAoZGJBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vY3JlYXRlIHNlYXJjaCBpbnB1dFxuICAgICAgICBjb25zdCBzZWFyY2hCYXIgPSBcIjxwPlNlYXJjaDogPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcInBhZ2VGaWx0ZXJcXFwiIHBsYWNlaG9sZGVyPVxcXCJzZWFyY2ggYWxsXFxcIj48L3A+XCJcblxuICAgICAgICBvdXRwdXRFbC5maWx0ZXIuaHRtbChzZWFyY2hCYXIpXG4gICAgICAgIFxuICAgICAgICAvL3RhcmdldHMgaW5wdXQgdG8gYWRkIGFuIGV2ZW50TGlzdGVuZXJcbiAgICAgICAgY29uc3QgcGFnZVNlYXJjaCA9ICQoXCJpbnB1dFtuYW1lPSdwYWdlRmlsdGVyJ11cIilbMF1cbiAgICAgICAgICAgIFxuICAgICAgICBwYWdlTG9hZCA9IGZ1bmMoZGJBcnJheSkgLy9pbml0aWFsIHBhZ2UgbG9hZCBvZiBpdGVtc1xuICAgICAgICBcbiAgICAgICAgcGFnZVNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgXCJrZXl1cFwiLFxuICAgICAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnZlcnQgd2hhdCBpcyBiZWluZyBmaWx0ZXJlZCB0byBsb3dlcmNhc2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlckZpbHRlclN0cmluZyA9IGV2ZW50LnRhcmdldC52YWx1ZS50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhZ2VGaWx0ZXIgPSBkYkFycmF5LmZpbHRlcihmaWx0ZXJlZEl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGtleSBpbiBmaWx0ZXJlZEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gZmlsdGVyZWRJdGVtW2tleV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh1c2VyRmlsdGVyU3RyaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvL291dHB1dC5jb250ZW50Lmh0bWwocGFnZUxvYWQpIHJlcG9wdWxhdGVzIHRoZSBjb250ZW50IGFyZWEgd2hlbiB1c2VyIHR5cGVzIGluIHNlYXJjaCBiYXJcbiAgICAgICAgICAgICAgICAgICAgaWYocGFnZUZpbHRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VMb2FkID0gXCI8aDM+U2VhcmNoIFJlc3VsdHMgTm90IEZvdW5kPC9oMz5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0RWwuY29udGVudC5odG1sKHBhZ2VMb2FkKSBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VMb2FkID0gZnVuYyhwYWdlRmlsdGVyKSAvL2Rpc3BsYXlzIGZpbHRlcmVkIGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRFbC5jb250ZW50Lmh0bWwocGFnZUxvYWQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYWdlTG9hZD0gZnVuYyhkYkFycmF5KSAvL2Rpc3BsYXlzIGluaXRpYWwgcGFnZSBsb2FkIGlmIHNlbGVjdG9yIGhhcyBsZXNzIHRoYW4gdGhyZWUgY2hhcmFjdGVyc1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXRFbC5jb250ZW50Lmh0bWwocGFnZUxvYWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIFxuICAgIH1cbiAgICByZXR1cm4gcGFnZUxvYWRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSAgZmlsdGVyUGFnZSIsImNvbnN0IGRvbUVsID0gcmVxdWlyZShcIi4vZG9tRWxlbWVudHNcIilcblxuY29uc3QgcGFnaW5hdGUgPSAoaXRlbXMsIGZ1bmMpID0+IHtcbiAgICBjb25zdCBvdXRwdXRFbCA9IGRvbUVsKClcbiAgICBjb25zdCB0b3RhbEl0ZW1zID0gaXRlbXMubGVuZ3RoXG4gICAgY29uc3QgaXRlbXNQZXJQYWdlID0gNVxuICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwodG90YWxJdGVtcyAvIGl0ZW1zUGVyUGFnZSlcbiAgICBjb25zdCBwYWdpbmF0aW9uRWwgPSBvdXRwdXRFbC5mb290ZXJcblxuICAgIC8vIEJ1aWxkIHRoZSBET00gc3RyaW5nIGZvciB0aGUgcGFnaW5hdGlvbiBsaW5rcyBpbiB0aGUgZm9vdGVyXG4gICAgbGV0IHBhZ2luYXRpb25TdHJpbmcgPSBcIjx1bD5cIjtcbiAgICBwYWdpbmF0aW9uU3RyaW5nICs9IFwiPGEgaWQ9J3ByZXZpb3VzJyBocmVmPScjJz4mbHQ7PC9hPlwiOyAvL2dlbmVyYXRlcyBwcmV2aW91cyBidXR0b25cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mUGFnZXM7IGkrKykge1xuICAgICAgICBwYWdpbmF0aW9uU3RyaW5nICs9IGAgPGxpPjxhIGNsYXNzPVwicGFnZSBwYWdlLSR7aSsxfVwiIGhyZWY9XCIjXCI+JHtpKzF9PC9hPjwvbGk+YCAvL2dlbmVyYXRlcyB0aGUgY29ycmVjdCBudW1iZXIgb2YgYmxvZyBwYWdlIGJ1dHRvbnMgYW5kIGdpdmVzIHRoZW0gYSBjbGFzcyBvZiBibG9nUGFnZSBhbmQgcGFnZS0jXG4gICAgfVxuICAgIHBhZ2luYXRpb25TdHJpbmcgKz0gXCIgPGEgaWQ9J25leHQnIGNsYXNzPSdwYWdlLTInIGhyZWY9JyMnPiZndDs8L2E+XCI7IC8vZ2VuZXJhdGVzIG5leHQgYnV0dG9uLCBkZWZhdWx0IGNsYXNzIGlzIHBhZ2UtMlxuICAgIHBhZ2luYXRpb25TdHJpbmcgKz0gXCI8L3VsPlwiO1xuXG4gICAgcGFnaW5hdGlvbkVsLmh0bWwocGFnaW5hdGlvblN0cmluZyk7IC8vYWRkIHRvIERPTVxuXG4gICAgLy8gcmVmZXJlbmNlcyB0byB0aGUgbmV4dCBhbmQgcHJldmlvdXMgYXJyb3dzXG4gICAgY29uc3QgcHJldmlvdXNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJldmlvdXNcIik7IFxuICAgIGNvbnN0IG5leHRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV4dFwiKTtcblxuICAgIC8vZnVuY3Rpb24gdG8gaW52b2tlIHdoZW4gdXNlciBjbGlja3MgcGFnaW5hdGlvbiBsaW5rIGF0IGJvdHRvbSBvZiBwYWdlXG4gICAgZnVuY3Rpb24gcHJvZHVjZUl0ZW1zKGV2ZW50KSB7XG5cbiAgICAgICAgLy93aGF0IGRpZCB0aGUgdXNlciBjbGlja1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHBhcnNlSW50ICggLy9wYXJzZSBzaW5jZSB0aGUgYXJyYXkgd2lsbCByZXR1cm4gYSBzdHJpbmdcbiAgICAgICAgICAgIEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LmNsYXNzTGlzdCkgLy90YXJnZXQgY2xhc3NlcyBvbiB0aGUgY2xpY2tlZCBwYWdpbmF0aW9uIGxpbmtcbiAgICAgICAgICAgICAgICAuZmluZChwYWdlQ2xhc3MgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhZ2VDbGFzcy5zdGFydHNXaXRoKFwicGFnZS1cIikpIHJldHVybiBwYWdlQ2xhc3MgLy9pZiBjbGFzcyBzdGFydHMgd2l0aCBcInBhZ2UtXCIgdGhlbiByZXR1cm4gdGhhdCBjbGFzc1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiLVwiKVsxXSAvL3NwbGl0IGNsYXNzIHVzaW5nIHRoZSBcIi1cIiBhcyB0aGUgZGVsaW1pdGVyLCBbMF09cGFnZSBbMV09IywgY3VycmVudFBhZ2UgPSAjXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICAvL2NoYW5nZSBjbGFzcyBvZiBwcmV2aW91cyBhcnJvd1xuICAgICAgICBpZiAoKGN1cnJlbnRQYWdlIC0gMSkgPT09IDAgKSB7IC8vaWYgdGhlIGN1cnJlbnQgcGFnZSAtMSBpcyAwIFxuICAgICAgICAgICAgcHJldmlvdXNFbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjsgLy90aGVuIGRvbid0IGRpc3BsYXkgcHJldmlvdXMgYXJyb3dcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZXZpb3VzRWwuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiOyAvL2lmIGdyZWF0ZXIgdGhhbiAwIHRoZW4gZGlzcGxheSBhcnJvdyBcbiAgICAgICAgICAgIHByZXZpb3VzRWwuY2xhc3NOYW1lID0gYHBhZ2UtJHtjdXJyZW50UGFnZSAtIDF9YCAvL2FuZCBhZGQgdGhlIGNsYXNzIG9mIHRoZSBwcmV2aW91cyBwYWdlXG4gICAgICAgIH1cbiAgICAgICAgLy9jaGFuZ2UgY2xhc3Mgb2YgbmV4dCBhcnJvd1xuICAgICAgICBpZiAoKGN1cnJlbnRQYWdlICsgMSkgPiBudW1iZXJPZlBhZ2VzICkgeyAvL2lmIHRoZSBjdXJyZW50IHBhZ2UgKzEgaXMgbW9yZSB0aGFuIHRoZSB0b3RhbCBwYWdlcyBcbiAgICAgICAgICAgIG5leHRFbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjsgLy90aGVuIGRvbid0IGRpc3BsYXkgbmV4dCBhcnJvd1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dEVsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjsgLy9pZiBsZXNzIHRoYW4gdG90YWwgcGFnZXMgdGhlbiBkaXNwbGF5IGFycm93IFxuICAgICAgICAgICAgbmV4dEVsLmNsYXNzTmFtZSA9IGBwYWdlLSR7Y3VycmVudFBhZ2UgKyAxfWAgLy9hbmQgYWRkIHRoZSBjbGFzcyBvZiB0aGUgbmV4dCBwYWdlXG4gICAgICAgIH1cblxuICAgICAgICAvL2RldGVybWluZSBibG9ncyB0byBkaXNwbGF5IGJ5IHNsaWNpbmcgYXJyYXlcbiAgICAgICAgY29uc3QgYmVnaW4gPSAoY3VycmVudFBhZ2UtMSkgKiBpdGVtc1BlclBhZ2U7IC8vY3VycmVudCBwYWdlIG1pbnVzIG9uZSwgdGhlbiBtdWx0aXBseSBieSBpdGVtcyBwZXIgcGFnZVxuICAgICAgICBjb25zdCBlbmQgPSBjdXJyZW50UGFnZSAqIGl0ZW1zUGVyUGFnZTsgLy9jdXJyZW50IHBhZ2UgbXVsdGlwbGllZCBieSBpdGVtcyBwZXIgcGFnZVxuICAgICAgICBjb25zdCBpdGVtc1RvRGlzcGxheSA9IGl0ZW1zLnNsaWNlKGJlZ2luLCBlbmQpO1xuXG4gICAgICAgIC8vaXRlcmF0ZSB0aHJvdWdoIGl0ZW1zVG9EaXNwbGF5IGFuZCBpbnNlcnRzIHRoZW0gaW50byBET01cbiAgICAgICAgY29uc3QgcGFnZUxvYWQgPSBmdW5jKGl0ZW1zVG9EaXNwbGF5KSAvL2Z1bmN0aW9uIHRvIHVwZGF0ZSBkb21cbiAgICAgICAgZGVidWdnZXJcblxuICAgICAgICBvdXRwdXRFbC5jb250ZW50Lmh0bWwocGFnZUxvYWQpXG4gICAgXG4gICAgfS8vZW5kIG9mIHByb2R1Y2VJdGVtc1xuXG4gICAgLy8gR2V0IHRoZSBhcnJheSBvZiBwYWdpbmF0aW9uIGFuY2hvciB0YWdzIHdlIGFkZGVkIHRvIHRoZSBET01cbiAgICBjb25zdCBwYWdlTGlua3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGFnZVwiKTtcbiAgICBcbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIHRvIGVhY2ggPGE+IGVsZW1lbnQgaW4gdGhlIHBhZ2luYXRpb25cbiAgICBwYWdlTGlua3MuZm9yRWFjaCggbGluayA9PiB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2R1Y2VJdGVtcywgZmFsc2UpIC8vd2hlbiBwYWdpbmF0aW9uIGxpbmsgaXMgY2xpY2tlZCwgcnVuIHByb2R1Y2VJdGVtcyBmdW5jdGlvbiBcbiAgICB9KVxuICAgIFxuICAgIC8vZGVmYXVsdCBzbyB0aGF0IGZpcnN0IHBhZ2UgbG9hZHNcbiAgICBwcm9kdWNlSXRlbXMoe1xuICAgICAgICBcInRhcmdldFwiOiB7XG4gICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXCJwYWdlLTFcIl1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vZXZlbnQgbGlzdGVuZXJzIGZvciBwcmV2aW91cyBhbmQgbmV4dCBlbGVtZW50c1xuICAgIHByZXZpb3VzRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2R1Y2VJdGVtcywgZmFsc2UpO1xuICAgIG5leHRFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvZHVjZUl0ZW1zLCBmYWxzZSk7XG5cbn0vL2VuZCBvZiBwYWdpbmF0ZVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhZ2luYXRlIiwiLy90aGlzIG1vZHVsZSB3aWxsIGRpc3BsYXkgcHJvamVjdCBpbmZvcm1hdGlvblxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IHJlcXVpcmUoXCIuLi9kaXNwbGF5UGFnZVwiKVxuY29uc3QgcHJvamVjdENvbnRlbnQgPSByZXF1aXJlKFwiLi9wcm9qZWN0c0NvbnRyb2xsZXJcIilcblxuY29uc3QgZGlzcGxheVByb2plY3QgPSAoKSA9PiB7XG4gICAgXG4gICAgcHJvamVjdENvbnRlbnQoKS50aGVuKCBwcm9kdWN0U3RyaW5nID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEhlYWRlciA9IFwiPGgxPktyaXN0ZW4ncyBQcm9qZWN0czwvaDE+XCJcbiAgICAgICAgY29uc3QgcHJvamVjdEluZm8gPSBwcm9kdWN0U3RyaW5nXG4gICAgXG4gICAgICAgIGRpc3BsYXlQYWdlKHByb2plY3RIZWFkZXIsIHByb2plY3RJbmZvKVxuICAgICAgICBcbiAgICAgICAgJChcIiNwYWdlLWZvb3RlclwiKS5odG1sKFwiXCIpXG4gICAgfSlcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlQcm9qZWN0XG4iLCJjb25zdCBwcm9qZWN0Q29udGVudCA9IChpdGVtQXJyYXkpID0+IHtcbiAgICBsZXQgcHJvamVjdFN0cmluZyA9IFwiXCJcbiAgICAvLyBidWlsZHMgcHJvamVjdCBzZWN0aW9uXG4gICAgcHJvamVjdFN0cmluZyArPSBgXG4gICAgPHNlY3Rpb24gaWQ9XCJwcm9qZWN0c1wiPlxuICAgIGBcbiAgICAvL2l0ZXJhdGUgdGhyb3VnaCBlYWNoIHByb2plY3QgYW5kIGFkZCB0byBwcm9qZWN0U3RyaW5nXG4gICAgaXRlbUFycmF5LmZvckVhY2goXG4gICAgICAgIHByb2plY3QgPT4ge1xuICAgICAgICAgICAgcHJvamVjdFN0cmluZyArPSBgXG4gICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInByb2plY3RcIj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJwcm9qZWN0LW5hbWVcIj4ke3Byb2plY3QubmFtZX08L2gyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvamVjdC1kYXRlXCI+PGI+RGF0ZSBDb21wbGV0ZWQ6PC9iPiAke3Byb2plY3QuZGF0ZV9jb21wbGV0ZWR9PC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvamVjdC10ZWNoXCI+PGI+VGVjaG5vbG9naWVzIFVzZWQ6PC9iPiAke3Byb2plY3QudGVjaG5vbG9naWVzX3VzZWR9PC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvamVjdC10ZWFtXCI+PGI+VGVhbW1hdGVzIChpZiBhcHBsaWNhYmxlKTo8L2I+ICR7cHJvamVjdC50ZWFtbWF0ZXN9PC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvamVjdC1kZXNjcmlwdGlvblwiPiR7cHJvamVjdC5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgICBgXG5cbiAgICAgICAgfVxuICAgIClcblxuICAgIC8vY2xvc2luZyB0YWcgZm9yIHByb2plY3Qgc2VjdGlvblxuICAgIHByb2plY3RTdHJpbmcgKz0gYFxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgYFxuICAgIHJldHVybiBwcm9qZWN0U3RyaW5nXG4gICAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvamVjdENvbnRlbnQiLCIvL2NvbnRyb2xzIGhvdyB0aGUgY29udGVudCBpcyB3cml0dGVuIHRvIHRoZSBkb20gZm9yIHByb2plY3RzIHBhZ2VcbmNvbnN0IHByb2plY3RGaWx0ZXIgPSByZXF1aXJlKFwiLi4vcGFnZUZpbHRlclwiKVxuY29uc3QgcHJvamVjdENvbnRlbnQgPSByZXF1aXJlKFwiLi9wcm9qZWN0Q29udGVudFwiKVxuXG5jb25zdCBwcm9qZWN0c0RPTSA9ICgpID0+IHtcbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL3BlcnNvbmFsLXNpdGUtY2YxYjguZmlyZWJhc2Vpby5jb20vcHJvamVjdHMuanNvblwiLFxuICAgICAgICBcIm1ldGhvZFwiOiBcIkdFVFwiICBcbiAgICB9KS50aGVuKFxuICAgICAgICBwcm9qZWN0RGIgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdEZpbHRlcihwcm9qZWN0RGIsIHByb2plY3RDb250ZW50KVxuXG4gICAgICAgIH1cbiAgICApXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcm9qZWN0c0RPTVxuXG4iLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSByZXN1bWUgaW5mb3JtYXRpb25cblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IHJlc3VtZUNvbnRlbnQgPSByZXF1aXJlKFwiLi9yZXN1bWVDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlSZXN1bWUgPSAoKSA9PiB7XG4gICAgXG4gICAgcmVzdW1lQ29udGVudCgpLnRoZW4oIHJlc3VtZVN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VtZUhlYWRlciA9IFwiPGgxPkpvYiBIaXN0b3J5IGZvciBLcmlzdGVuIE5vcnJpczwvaDE+XCJcbiAgICAgICAgY29uc3QgcmVzdW1lSW5mbyA9IHJlc3VtZVN0cmluZ1xuICAgIFxuICAgICAgICBkaXNwbGF5UGFnZShyZXN1bWVIZWFkZXIsIHJlc3VtZUluZm8pXG4gICAgfSlcblxuICAgICQoXCIjcGFnZS1maWx0ZXJcIikuaHRtbChcIlwiKVxuICAgICQoXCIjcGFnZS1mb290ZXJcIikuaHRtbChcIlwiKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlSZXN1bWUiLCIvL2NvbnRyb2xzIGhvdyB0aGUgY29udGVudCBpcyB3cml0dGVuIHRvIHRoZSBkb20gZm9yIHJlc3VtZSBwYWdlXG5cbmNvbnN0IHJlc3VtZURPTSA9ICgpID0+IHtcblxuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vcGVyc29uYWwtc2l0ZS1jZjFiOC5maXJlYmFzZWlvLmNvbS9yZXN1bWUuanNvblwiLFxuICAgICAgICBcIm1ldGhvZFwiOiBcIkdFVFwiXG4gICAgfSlcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICByZXN1bWVEYiA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VtZVN0cmluZyA9IFwiXCJcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXN1bWVEYi5mb3JFYWNoKCBqb2IgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bWVTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cImpvYlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJjb21wYW55XCI+JHtqb2IuY29tcGFueX0gKCR7am9iLmxvY2F0aW9ufSk8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInRpdGxlXCI+JHtqb2IucG9zaXRpb259PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDM+JHtqb2Iuc3RhcnREYXRlfSAtICR7am9iLmVuZERhdGV9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJzdW1tYXJ5XCI+PGI+U3VtbWFyeTogPC9iPiR7am9iLnN1bW1hcnl9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicmVzcG9uc2liaWxpdGllc1wiPjxiPlJlc3BvbnNpYmlsaXRpZXMgaW5jbHVkZWQ6IDwvYj4ke2pvYi5yZXNwb25zaWJpbGl0aWVzfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bWVTdHJpbmdcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdW1lRE9NIl19
