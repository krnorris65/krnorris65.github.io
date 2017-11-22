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
},{"../pageFilter":13,"../paginate":14,"./blogContent":1,"./blogFilter":3}],3:[function(require,module,exports){

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
},{"../displayPage":9,"./blogController":2}],5:[function(require,module,exports){
{
    const footerEl = $("#site-footer")

    footerEl.append("<a href=\"#\" id=\"site_admin\">Admin</a>")

    // footerEl.create("button")
}
module.exports = null
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{"../displayPage":9,"./contactController":7}],9:[function(require,module,exports){
const domEl = require("./domElements")

const outputEl = domEl()

const displayPage = (pageHeader, pageContent) => {

    const headerEl = outputEl.header
    headerEl.html(pageHeader) //adds the page header to the dom

    const contentEl = outputEl.content
    contentEl.html(pageContent) //adds the content of page to the dom

}


module.exports = displayPage
},{"./domElements":10}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{"../displayPage":9}],12:[function(require,module,exports){

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


})


},{"./blog/displayBlogs":4,"./buildFooter":5,"./buildNavigation":6,"./contact/displayContact":8,"./home/displayHome":11,"./projects/displayProjects":15,"./resume/displayResume":18}],13:[function(require,module,exports){
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
},{"./domElements":10}],14:[function(require,module,exports){
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
},{"./domElements":10}],15:[function(require,module,exports){
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

},{"../displayPage":9,"./projectsController":17}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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


},{"../pageFilter":13,"./projectContent":16}],18:[function(require,module,exports){
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
},{"../displayPage":9,"./resumeController":19}],19:[function(require,module,exports){
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
},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0NvbnRlbnQuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0NvbnRyb2xsZXIuanMiLCJzY3JpcHRzL2Jsb2cvYmxvZ0ZpbHRlci5qcyIsInNjcmlwdHMvYmxvZy9kaXNwbGF5QmxvZ3MuanMiLCJzY3JpcHRzL2J1aWxkRm9vdGVyLmpzIiwic2NyaXB0cy9idWlsZE5hdmlnYXRpb24uanMiLCJzY3JpcHRzL2NvbnRhY3QvY29udGFjdENvbnRyb2xsZXIuanMiLCJzY3JpcHRzL2NvbnRhY3QvZGlzcGxheUNvbnRhY3QuanMiLCJzY3JpcHRzL2Rpc3BsYXlQYWdlLmpzIiwic2NyaXB0cy9kb21FbGVtZW50cy5qcyIsInNjcmlwdHMvaG9tZS9kaXNwbGF5SG9tZS5qcyIsInNjcmlwdHMvbWFpbi5qcyIsInNjcmlwdHMvcGFnZUZpbHRlci5qcyIsInNjcmlwdHMvcGFnaW5hdGUuanMiLCJzY3JpcHRzL3Byb2plY3RzL2Rpc3BsYXlQcm9qZWN0cy5qcyIsInNjcmlwdHMvcHJvamVjdHMvcHJvamVjdENvbnRlbnQuanMiLCJzY3JpcHRzL3Byb2plY3RzL3Byb2plY3RzQ29udHJvbGxlci5qcyIsInNjcmlwdHMvcmVzdW1lL2Rpc3BsYXlSZXN1bWUuanMiLCJzY3JpcHRzL3Jlc3VtZS9yZXN1bWVDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy90aGUgbW9kdWxlIGdlbmVyYXRlcyB0aGUgY29udGVudCBvZiB0aGUgYmxvZ3NcblxuY29uc3QgYmxvZ0NvbnRlbnQgPSAoaXRlbUFycmF5KSA9PiB7XG4gICAgbGV0IGJsb2dTdHJpbmcgPSBcIlwiXG4gICAgXG4gICAgLy9idWlsZHMgYmxvZyBzZWN0aW9uXG4gICAgYmxvZ1N0cmluZyArPSBgXG4gICAgPHNlY3Rpb24gaWQ9XCJwcm9qZWN0c1wiPlxuICAgIGBcbiAgICBcbiAgICAvLyBmb3IgZWFjaCBibG9nIGVudHJ5LCBidWlsZCB0aGUgZm9sbG93aW5nIGh0bWwgdG8gY3JlYXRlIGJsb2cgY29udGVudFxuICAgIGl0ZW1BcnJheS5mb3JFYWNoKFxuICAgICAgICBibG9nID0+IHsgXG4gICAgICAgICAgICBibG9nU3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8YXJ0aWNsZSBpZD1cImJsb2ctJHtibG9nLmlkfVwiIGNsYXNzPVwiYmxvZ1wiPlxuICAgICAgICAgICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwid2Vla051bVwiPiR7YmxvZy50aXRsZX08L2gyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwid2Vla0RhdGVcIj4ke2Jsb2cud2Vla19kYXRlc308L3A+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGgzPkNlbGVicmF0aW9ucyAmIEluc3BpcmF0aW9uczwvaDM+XG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgXG4gICAgICAgICAgICAvL2l0ZXJhdGVzIG92ZXIgY2VsZWJyYXRpb24gYXJyYXlcbiAgICAgICAgICAgIGJsb2cuY2VsZWJyYXRpb25zLmZvckVhY2goY2VsZWJyYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGJsb2dTdHJpbmcgKz0gYDxsaT4ke2NlbGVicmF0aW9ufTwvbGk+YDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJsb2dTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxoMz5DaGFsbGVuZ2VzICYgSGFuZy1VcHM8L2gzPlxuICAgICAgICAgICAgICAgIDx1bD5gXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vaXRlcmF0ZXMgb3ZlciBjaGFsbGVuZ2VzIGFycmF5XG4gICAgICAgICAgICBibG9nLmNoYWxsZW5nZXMuZm9yRWFjaChjaGFsbGVuZ2UgPT4ge1xuICAgICAgICAgICAgICAgIGJsb2dTdHJpbmcgKz0gYDxsaT4ke2NoYWxsZW5nZX08L2xpPmA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBibG9nU3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8Zm9vdGVyPlxuICAgICAgICAgICAgICAgIDxzcGFuPlBvc3RlZCBieSAke2Jsb2cuYXV0aG9yfSBvbiAke2Jsb2cucHVibGlzaGVkfTwvdGltZT48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgKVxuICAgIFxuICAgIC8vY2xvc2luZyB0YWcgZm9yIGJsb2cgc2VjdGlvblxuICAgIGJsb2dTdHJpbmcgKz0gYFxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgYFxuXG4gICAgcmV0dXJuIGJsb2dTdHJpbmdcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBibG9nQ29udGVudFxuIiwiLy9jb250cm9scyBob3cgdGhlIGNvbnRlbnQgaXMgd3JpdHRlbiB0byB0aGUgZG9tIGZvciBibG9nIHBhZ2VcbmNvbnN0IHBhZ2luYXRlID0gcmVxdWlyZShcIi4uL3BhZ2luYXRlXCIpXG5jb25zdCBibG9nRmlsdGVyID0gcmVxdWlyZShcIi4uL3BhZ2VGaWx0ZXJcIilcbmNvbnN0IGZpbHRlciA9IHJlcXVpcmUoXCIuL2Jsb2dGaWx0ZXJcIilcbmNvbnN0IGJsb2dDb250ZW50ID0gcmVxdWlyZShcIi4vYmxvZ0NvbnRlbnRcIilcblxuY29uc3QgYmxvZ0RPTSA9ICgpID0+IHtcbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL3BlcnNvbmFsLXNpdGUtY2YxYjguZmlyZWJhc2Vpby5jb20vYmxvZy5qc29uXCIsXG4gICAgICAgIFwibWV0aG9kXCI6IFwiR0VUXCJcbiAgICB9KS50aGVuKFxuICAgICAgICBibG9nRGIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJsb2dGaWx0ZXIoYmxvZ0RiLCBibG9nQ29udGVudCwgZmlsdGVyKVxuICAgICAgICAgICAgLy8gcmV0dXJuIHBhZ2luYXRlKGJsb2dEYiwgYmxvZ0NvbnRlbnQpXG4gICAgICAgIH1cbiAgICApXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBibG9nRE9NIiwiXG5jb25zdCBibG9nc0ZpbHRlciA9IChkYXRhYmFzZSkgPT4ge1xuICAgIGRhdGFiYXNlLmZpbHRlcihcbiAgICAgICAgZmlsdGVyZWRCbG9nID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZEJsb2cudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh1c2VyRmlsdGVyU3RyaW5nKSB8fCAvL2xvb2sgdGhyb3VnaCB0aXRsZXNcbiAgICAgICAgICAgIGZpbHRlcmVkQmxvZy5jZWxlYnJhdGlvbnMuZmlsdGVyKCAvL2l0ZXJhdGUgb3ZlciB0aGUgY2VsZWJyYXRpb25zIGFycmF5XG4gICAgICAgICAgICAgICAgZmlsdGVyQ2VsZWJyYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyQ2VsZWJyYXRpb24udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh1c2VyRmlsdGVyU3RyaW5nKVxuICAgICAgICAgICAgICAgIH0pLmxlbmd0aCB8fCAvL2lmIHRoZSBsZW5ndGggaXMgMCB0aGVuIGl0IHJldHVybnMgZmFsc2VcbiAgICAgICAgICAgIGZpbHRlcmVkQmxvZy5jaGFsbGVuZ2VzLmZpbHRlciggLy9pdGVyYXRlIG92ZXIgdGhlIGNoYWxsZW5nZXMgYXJyYXlcbiAgICAgICAgICAgICAgICBmaWx0ZXJDaGFsbGVuZ2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyQ2hhbGxlbmdlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModXNlckZpbHRlclN0cmluZylcbiAgICAgICAgICAgICAgICB9KS5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZEJsb2cud2Vla19kYXRlcy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHVzZXJGaWx0ZXJTdHJpbmcpXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIClcbn1cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gYmxvZ3NGaWx0ZXIiLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSB0aGUgYmxvZ3NcblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IGJsb2dDb250ZW50ID0gcmVxdWlyZShcIi4vYmxvZ0NvbnRyb2xsZXJcIilcblxuY29uc3QgZGlzcGxheUJsb2cgPSAoKSA9PiB7XG5cbiAgICBcbiAgICBibG9nQ29udGVudCgpLnRoZW4oXG4gICAgICAgIGJsb2dTdHJpbmcgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmxvZ0hlYWRlciA9IFwiPGgxPk15IE5hc2h2aWxsZSBTb2Z0d2FyZSBTY2hvb2wgRXhwZXJpZW5jZTwvaDE+XCJcbiAgICAgICAgICAgIGNvbnN0IGJsb2dJbmZvID0gYmxvZ1N0cmluZ1xuXG4gICAgICAgICAgICBkaXNwbGF5UGFnZShibG9nSGVhZGVyLCBibG9nSW5mbylcbiAgICAgICAgfVxuICAgIClcblxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheUJsb2dcblxuLy8gY29uc3QgZGlzcGxheUJsb2cgPSAoKSA9PiB7XG4vLyAgICAgPGhlYWRlciBjbGFzcz1cInBhZ2UtaGVhZGVyXCI+XG4vLyAgICAgPGgxPk15IE5hc2h2aWxsZSBTb2Z0d2FyZSBTY2hvb2wgRXhwZXJpZW5jZTwvaDE+XG4vLyAgICAgPGEgaHJlZj1cIi4uL2FkbWluL2Jsb2cuaHRtbFwiPkFkbWluPC9hPlxuLy8gICAgIDwvaGVhZGVyPlxuXG4vLyAgICAgPHA+U2VhcmNoOiA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYmxvZ0ZpbHRlclwiIHBsYWNlaG9sZGVyPVwic2VhcmNoIGFsbCBibG9nIHBvc3RzXCI+PC9wPlxuLy8gICAgIDxzZWN0aW9uIGlkPVwiYmxvZy1wb3N0c1wiPlxuLy8gICAgIDwhLS0gcG9wdWxhdGVkIHRocm91Z2ggZGF0YWJhc2UgLS0+XG4vLyAgICAgPC9zZWN0aW9uPlxuXG5cbi8vICAgICA8Zm9vdGVyIGlkPVwiYmxvZy1wYWdpbmF0b3JcIj5cblxuLy8gICAgIDwvZm9vdGVyPlxuXG5cbi8vIH0iLCJ7XG4gICAgY29uc3QgZm9vdGVyRWwgPSAkKFwiI3NpdGUtZm9vdGVyXCIpXG5cbiAgICBmb290ZXJFbC5hcHBlbmQoXCI8YSBocmVmPVxcXCIjXFxcIiBpZD1cXFwic2l0ZV9hZG1pblxcXCI+QWRtaW48L2E+XCIpXG5cbiAgICAvLyBmb290ZXJFbC5jcmVhdGUoXCJidXR0b25cIilcbn1cbm1vZHVsZS5leHBvcnRzID0gbnVsbCIsImNvbnN0IG5hdmlnYXRpb24gPSBbXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJIb21lXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiUmVzdW1lXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiQ29udGFjdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIlByb2plY3RzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiQmxvZ1wiXG4gICAgfVxuXVxuXG5jb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtaXRlbXNcIik7XG5cbmNvbnN0IG5hdkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcblxubmF2aWdhdGlvbi5mb3JFYWNoKFxuICAgIHBhZ2UgPT4ge1xuICAgICAgICBjb25zdCBuYXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKVxuICAgICAgICBuYXZFbC5jbGFzc0xpc3QuYWRkKFwibmF2TGlua1wiKVxuXG4gICAgICAgIGNvbnN0IG5hdkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKVxuICAgICAgICBuYXZMaW5rLmhyZWYgPSBcIiNcIlxuICAgICAgICBuYXZMaW5rLmNsYXNzTmFtZSA9IGBuYXZfJHtwYWdlLmRpc3BsYXkudG9Mb3dlckNhc2UoKX1gXG4gICAgICAgIG5hdkxpbmsuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocGFnZS5kaXNwbGF5KSlcblxuXG4gICAgICAgIG5hdkVsLmFwcGVuZENoaWxkKG5hdkxpbmspXG4gICAgICAgIG5hdkxpc3QuYXBwZW5kQ2hpbGQobmF2RWwpXG4gICAgfVxuKVxuXG5uYXZFbGVtZW50LmFwcGVuZENoaWxkKG5hdkxpc3QpXG5cbm1vZHVsZS5leHBvcnRzID0gbnVsbCIsIi8vY29udHJvbHMgaG93IHRoZSBjb250ZW50IGlzIHdyaXR0ZW4gdG8gdGhlIGRvbSBmb3IgY29udGFjdCBwYWdlXG5jb25zdCBjb250YWN0RE9NID0gKCkgPT4ge1xuXG4gICAgcmV0dXJuICQuYWpheCh7IC8vbmVlZCB0byByZXR1cm4gYWpheCBmdW5jdGlvbiBzbyB0aGF0IGNvbnRhY3RET00gY2FuIGFjY2VzcyB0aGUgc3RyaW5nIHJldHVybmVkIGluIC50aGVuKClcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL3BlcnNvbmFsLXNpdGUtY2YxYjguZmlyZWJhc2Vpby5jb20vY29udGFjdC5qc29uXCIsXG4gICAgICAgIFwibWV0aG9kXCI6IFwiR0VUXCJcbiAgICB9KVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAgIGNvbnRhY3REYiA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRhY3RTdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgLy9idWlsZHMgY29udGFjdCBieSBlbWFpbCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNvbnRhY3RcIj5TZW5kIGFuIGVtYWlsOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBpZD1cInNlbmQtZW1haWxcIj4gXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJlbWFpbFwiPjxhIGhyZWY9XCJtYWlsdG86JHtjb250YWN0RGIuZW1haWx9XCI+JHtjb250YWN0RGIuZW1haWx9PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIC8vYnVpbGRzIGNvbnRhY3QgdGhyb3VnaCBzb2NpYWwgc2VjdGlvblxuICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjb250YWN0XCI+Q29ubmVjdCBvbiBzb2NpYWwgbWVkaWE6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPVwic29jaWFsLW1lZGlhXCI+XG4gICAgICAgICAgICBgXG5cbiAgICAgICAgICAgICAgICAvL2l0ZXJhdGVzIHRocm91Z2ggZWFjaCBzb2NpYWwgc2l0ZVxuICAgICAgICAgICAgICAgIGNvbnRhY3REYi5zb2NpYWwuZm9yRWFjaChzaXRlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInNvY2lhbFwiPjxhIGhyZWY9XCIke3NpdGUudXJsfVwiPiR7c2l0ZS5zZXJ2aWNlfTwvYT48L2xpPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgLy9jbG9zaW5nIHRhZ3MgZm9yIHVub3JkZXJlZCBsaXN0IGFuZCBjb250YWN0IHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIGBcblxuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWN0U3RyaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb250YWN0RE9NIiwiLy90aGlzIG1vZHVsZSB3aWxsIGRpc3BsYXkgY29udGFjdCBpbmZvcm1hdGlvblxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IHJlcXVpcmUoXCIuLi9kaXNwbGF5UGFnZVwiKVxuY29uc3QgY29udGFjdENvbmVudCA9IHJlcXVpcmUoXCIuL2NvbnRhY3RDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlDb250YWN0ID0gKCkgPT4ge1xuICAgIGNvbnRhY3RDb25lbnQoKS50aGVuKGNvbnRhY3RTdHJpbmcgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY29udGFjdEhlYWRlciA9IFwiPGgxPkNvbnRhY3QgTWU8L2gxPlwiXG4gICAgICAgIGNvbnN0IGNvbnRhY3RJbmZvID0gY29udGFjdFN0cmluZ1xuICAgICAgICBcbiAgICAgICAgZGlzcGxheVBhZ2UoY29udGFjdEhlYWRlciwgY29udGFjdEluZm8pIC8vZGlzcGxheVBhZ2UgbmVlZHMgdG8gYmUgd2l0aGluIHRoZSBjb250YWN0Q29udGVudCgpLnRoZW4gYmVjYXVzZSBpdCBpcyBkZXBlbmRlbnQgb24gdGhlIHN0cmluZyB0aGF0IGlzIHJldHVybmVkIHdoZW4gdGhlIHRoZW4gZnVuY3Rpb24gcnVuc1xuICAgICAgICBcbiAgICAgICAgJChcIiNwYWdlLWZpbHRlclwiKS5odG1sKFwiXCIpXG4gICAgICAgICQoXCIjcGFnZS1mb290ZXJcIikuaHRtbChcIlwiKVxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheUNvbnRhY3QiLCJjb25zdCBkb21FbCA9IHJlcXVpcmUoXCIuL2RvbUVsZW1lbnRzXCIpXG5cbmNvbnN0IG91dHB1dEVsID0gZG9tRWwoKVxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IChwYWdlSGVhZGVyLCBwYWdlQ29udGVudCkgPT4ge1xuXG4gICAgY29uc3QgaGVhZGVyRWwgPSBvdXRwdXRFbC5oZWFkZXJcbiAgICBoZWFkZXJFbC5odG1sKHBhZ2VIZWFkZXIpIC8vYWRkcyB0aGUgcGFnZSBoZWFkZXIgdG8gdGhlIGRvbVxuXG4gICAgY29uc3QgY29udGVudEVsID0gb3V0cHV0RWwuY29udGVudFxuICAgIGNvbnRlbnRFbC5odG1sKHBhZ2VDb250ZW50KSAvL2FkZHMgdGhlIGNvbnRlbnQgb2YgcGFnZSB0byB0aGUgZG9tXG5cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlQYWdlIiwiLy90aGlzIG1vZHVsZSBjYXB0dXJlcyB0aGUgZG9tIGVsZW1lbnRzIHRoYXQgd2lsbCBiZSB3cml0dGVuIHRvIHdoZW4gZWFjaCBwYWdlIGlzIGNhbGxlZFxuXG5jb25zdCBkb21FbGVtZW50cyA9ICgpID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG4gICAgICAgIFwiaGVhZGVyXCI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAkKFwiI3BhZ2UtaGVhZGVyXCIpIC8vZ2V0cyBoZWFkZXIgc2VjdGlvblxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRlbnRcIjoge1xuICAgICAgICAgICAgdmFsdWU6ICQoXCIjcGFnZS1jb250ZW50XCIpIC8vZ2V0cyBjb250ZW50IHNlY3Rpb25cbiAgICAgICAgfSxcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xuICAgICAgICAgICAgdmFsdWU6ICQoXCIjcGFnZS1maWx0ZXJcIikgLy9zZWN0aW9uIHRvIGFkZCBmaWx0ZXIgd2hlbiBwYWdlRmlsdGVyIGlzIGFkZGVkIHRvIGEgcGFnZVxuICAgICAgICB9LFxuICAgICAgICBcImZvb3RlclwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogJChcIiNwYWdlLWZvb3RlclwiKSAvL3NlY3Rpb24gdG8gYWRkIHBhZ2UgZm9vdGVyIHN1Y2ggYXMgcGFnaW5hdGlvblxuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUVsZW1lbnRzIiwiLy90aGlzIG1vZHVsZSB3aWxsIGRpc3BsYXkgdGhlIGhvbWUgcGFnZVxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IHJlcXVpcmUoXCIuLi9kaXNwbGF5UGFnZVwiKVxuXG5jb25zdCBkaXNwbGF5SG9tZSA9ICgpID0+IHtcblxuICAgIGNvbnN0IGhvbWVIZWFkZXIgPSBgXG4gICAgXG4gICAgICAgIDxoMT5LcmlzdGVuIE5vcnJpczwvaDE+XG4gICAgICAgIDxoMiBpZD1cImNvaG9ydFwiPk5TUyBDb2hvcnQgMjI8L2gyPlxuICAgIGBcbiAgICBjb25zdCBob21lSW5mbyA9IFwiXCJcbiAgICAgICAgXG4gICAgZGlzcGxheVBhZ2UoaG9tZUhlYWRlciwgaG9tZUluZm8pIFxuICAgICAgICBcbiAgICAkKFwiI3BhZ2UtZmlsdGVyXCIpLmh0bWwoXCJcIilcbiAgICAkKFwiI3BhZ2UtZm9vdGVyXCIpLmh0bWwoXCJcIilcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlIb21lIiwiXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgbmF2QmFyID0gcmVxdWlyZShcIi4vYnVpbGROYXZpZ2F0aW9uXCIpIC8vZGlzcGxheXMgc2l0ZSBuYXZpZ2F0aW9uXG4gICAgY29uc3QgZm9vdGVyID0gcmVxdWlyZShcIi4vYnVpbGRGb290ZXJcIikgLy9kaXNwbGF5cyBzaXRlIGZvb3RlclxuICAgIFxuICAgIGNvbnN0IGhvbWVQYWdlID0gcmVxdWlyZShcIi4vaG9tZS9kaXNwbGF5SG9tZVwiKVxuICAgIGhvbWVQYWdlKCkgLy9kaXNwbGF5cyBob21lIHBhZ2UgZmlyc3RcbiAgICAkKFwiLm5hdl9ob21lXCIpLm9uKFwiY2xpY2tcIiwgaG9tZVBhZ2UpIC8vd2lsbCBsb2FkIGhvbWUgcGFnZSB3aGVuIG5hdiBsaW5rIGlzIGNsaWNrZWRcblxuXG4gICAgY29uc3QgY29udGFjdFBhZ2UgPSByZXF1aXJlKFwiLi9jb250YWN0L2Rpc3BsYXlDb250YWN0XCIpXG4gICAgJChcIi5uYXZfY29udGFjdFwiKS5vbihcImNsaWNrXCIsIGNvbnRhY3RQYWdlKSAvL3dpbGwgbG9hZCBjb250YWN0IHBhZ2Ugd2hlbiBuYXYgbGluayBpcyBjbGlja2VkXG4gICAgXG4gICAgY29uc3QgcHJvamVjdFBhZ2UgPSByZXF1aXJlKFwiLi9wcm9qZWN0cy9kaXNwbGF5UHJvamVjdHNcIilcbiAgICAkKFwiLm5hdl9wcm9qZWN0c1wiKS5vbihcImNsaWNrXCIsIHByb2plY3RQYWdlKSAvL3dpbGwgbG9hZCBwcm9qZWN0cyBwYWdlIHdoZW4gbmF2IGxpbmsgaXMgY2xpY2tlZFxuICAgIFxuICAgIGNvbnN0IHJlc3VtZVBhZ2UgPSByZXF1aXJlKFwiLi9yZXN1bWUvZGlzcGxheVJlc3VtZVwiKVxuICAgICQoXCIubmF2X3Jlc3VtZVwiKS5vbihcImNsaWNrXCIsIHJlc3VtZVBhZ2UpIC8vd2lsbCBsb2FkIHJlc3VtZSBwYWdlIHdoZW4gbmF2IGxpbmsgaXMgY2xpY2tlZFxuICAgIFxuICAgIGNvbnN0IGJsb2dQYWdlID0gcmVxdWlyZShcIi4vYmxvZy9kaXNwbGF5QmxvZ3NcIilcbiAgICAkKFwiLm5hdl9ibG9nXCIpLm9uKFwiY2xpY2tcIiwgYmxvZ1BhZ2UpIC8vd2lsbCBsb2FkIGJsb2cgcGFnZSB3aGVuIG5hdiBsaW5rIGlzIGNsaWNrZWRcblxuXG59KVxuXG4iLCJjb25zdCBkb21FbCA9IHJlcXVpcmUoXCIuL2RvbUVsZW1lbnRzXCIpXG5cbi8vZmlsdGVyUGFnZSBmdW5jdGlvbiB0YWtlcyB0d28gcGFyYW1ldGVyczogdGhlIGRhdGFiYXNlIGluIHdoaWNoIHlvdSB3YW50IHRvIGZpbHRlciB0aHJvdWdoIGFuZCB0aGUgZnVuY3Rpb24geW91IHdhbnQgZXhlY3V0ZWQgb24gdGhlIGRhdGFiYXNlXG5jb25zdCBmaWx0ZXJQYWdlID0gKGRiQXJyYXksIGZ1bmMpID0+IHtcbiAgICBjb25zdCBvdXRwdXRFbCA9IGRvbUVsKClcbiAgICBsZXQgcGFnZUxvYWQgPSBcIlwiXG4gICAgXG4gICAgaWYgKGRiQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAvL2NyZWF0ZSBzZWFyY2ggaW5wdXRcbiAgICAgICAgY29uc3Qgc2VhcmNoQmFyID0gXCI8cD5TZWFyY2g6IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuYW1lPVxcXCJwYWdlRmlsdGVyXFxcIiBwbGFjZWhvbGRlcj1cXFwic2VhcmNoIGFsbFxcXCI+PC9wPlwiXG5cbiAgICAgICAgb3V0cHV0RWwuZmlsdGVyLmh0bWwoc2VhcmNoQmFyKVxuICAgICAgICBcbiAgICAgICAgLy90YXJnZXRzIGlucHV0IHRvIGFkZCBhbiBldmVudExpc3RlbmVyXG4gICAgICAgIGNvbnN0IHBhZ2VTZWFyY2ggPSAkKFwiaW5wdXRbbmFtZT0ncGFnZUZpbHRlciddXCIpWzBdXG4gICAgICAgICAgICBcbiAgICAgICAgcGFnZUxvYWQgPSBmdW5jKGRiQXJyYXkpIC8vaW5pdGlhbCBwYWdlIGxvYWQgb2YgaXRlbXNcbiAgICAgICAgXG4gICAgICAgIHBhZ2VTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIFwia2V5dXBcIixcbiAgICAgICAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZihldmVudC50YXJnZXQudmFsdWUubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb252ZXJ0IHdoYXQgaXMgYmVpbmcgZmlsdGVyZWQgdG8gbG93ZXJjYXNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJGaWx0ZXJTdHJpbmcgPSBldmVudC50YXJnZXQudmFsdWUudG9Mb3dlckNhc2UoKVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYWdlRmlsdGVyID0gZGJBcnJheS5maWx0ZXIoZmlsdGVyZWRJdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihrZXkgaW4gZmlsdGVyZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGZpbHRlcmVkSXRlbVtrZXldXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModXNlckZpbHRlclN0cmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy9vdXRwdXQuY29udGVudC5odG1sKHBhZ2VMb2FkKSByZXBvcHVsYXRlcyB0aGUgY29udGVudCBhcmVhIHdoZW4gdXNlciB0eXBlcyBpbiBzZWFyY2ggYmFyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhZ2VGaWx0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlTG9hZCA9IFwiPGgzPlNlYXJjaCBSZXN1bHRzIE5vdCBGb3VuZDwvaDM+XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dEVsLmNvbnRlbnQuaHRtbChwYWdlTG9hZCkgXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlTG9hZCA9IGZ1bmMocGFnZUZpbHRlcikgLy9kaXNwbGF5cyBmaWx0ZXJlZCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0RWwuY29udGVudC5odG1sKHBhZ2VMb2FkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZUxvYWQ9IGZ1bmMoZGJBcnJheSkgLy9kaXNwbGF5cyBpbml0aWFsIHBhZ2UgbG9hZCBpZiBzZWxlY3RvciBoYXMgbGVzcyB0aGFuIHRocmVlIGNoYXJhY3RlcnNcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0RWwuY29udGVudC5odG1sKHBhZ2VMb2FkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICBcbiAgICB9XG4gICAgcmV0dXJuIHBhZ2VMb2FkXG59XG5cbm1vZHVsZS5leHBvcnRzID0gIGZpbHRlclBhZ2UiLCJjb25zdCBkb21FbCA9IHJlcXVpcmUoXCIuL2RvbUVsZW1lbnRzXCIpXG5cbmNvbnN0IHBhZ2luYXRlID0gKGl0ZW1zLCBmdW5jKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0RWwgPSBkb21FbCgpXG4gICAgY29uc3QgdG90YWxJdGVtcyA9IGl0ZW1zLmxlbmd0aFxuICAgIGNvbnN0IGl0ZW1zUGVyUGFnZSA9IDVcbiAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBpdGVtc1BlclBhZ2UpXG4gICAgY29uc3QgcGFnaW5hdGlvbkVsID0gb3V0cHV0RWwuZm9vdGVyXG5cbiAgICAvLyBCdWlsZCB0aGUgRE9NIHN0cmluZyBmb3IgdGhlIHBhZ2luYXRpb24gbGlua3MgaW4gdGhlIGZvb3RlclxuICAgIGxldCBwYWdpbmF0aW9uU3RyaW5nID0gXCI8dWw+XCI7XG4gICAgcGFnaW5hdGlvblN0cmluZyArPSBcIjxhIGlkPSdwcmV2aW91cycgaHJlZj0nIyc+Jmx0OzwvYT5cIjsgLy9nZW5lcmF0ZXMgcHJldmlvdXMgYnV0dG9uXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZlBhZ2VzOyBpKyspIHtcbiAgICAgICAgcGFnaW5hdGlvblN0cmluZyArPSBgIDxsaT48YSBjbGFzcz1cInBhZ2UgcGFnZS0ke2krMX1cIiBocmVmPVwiI1wiPiR7aSsxfTwvYT48L2xpPmAgLy9nZW5lcmF0ZXMgdGhlIGNvcnJlY3QgbnVtYmVyIG9mIGJsb2cgcGFnZSBidXR0b25zIGFuZCBnaXZlcyB0aGVtIGEgY2xhc3Mgb2YgYmxvZ1BhZ2UgYW5kIHBhZ2UtI1xuICAgIH1cbiAgICBwYWdpbmF0aW9uU3RyaW5nICs9IFwiIDxhIGlkPSduZXh0JyBjbGFzcz0ncGFnZS0yJyBocmVmPScjJz4mZ3Q7PC9hPlwiOyAvL2dlbmVyYXRlcyBuZXh0IGJ1dHRvbiwgZGVmYXVsdCBjbGFzcyBpcyBwYWdlLTJcbiAgICBwYWdpbmF0aW9uU3RyaW5nICs9IFwiPC91bD5cIjtcblxuICAgIHBhZ2luYXRpb25FbC5odG1sKHBhZ2luYXRpb25TdHJpbmcpOyAvL2FkZCB0byBET01cblxuICAgIC8vIHJlZmVyZW5jZXMgdG8gdGhlIG5leHQgYW5kIHByZXZpb3VzIGFycm93c1xuICAgIGNvbnN0IHByZXZpb3VzRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZXZpb3VzXCIpOyBcbiAgICBjb25zdCBuZXh0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5leHRcIik7XG5cbiAgICAvL2Z1bmN0aW9uIHRvIGludm9rZSB3aGVuIHVzZXIgY2xpY2tzIHBhZ2luYXRpb24gbGluayBhdCBib3R0b20gb2YgcGFnZVxuICAgIGZ1bmN0aW9uIHByb2R1Y2VJdGVtcyhldmVudCkge1xuXG4gICAgICAgIC8vd2hhdCBkaWQgdGhlIHVzZXIgY2xpY2tcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSBwYXJzZUludCAoIC8vcGFyc2Ugc2luY2UgdGhlIGFycmF5IHdpbGwgcmV0dXJuIGEgc3RyaW5nXG4gICAgICAgICAgICBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QpIC8vdGFyZ2V0IGNsYXNzZXMgb24gdGhlIGNsaWNrZWQgcGFnaW5hdGlvbiBsaW5rXG4gICAgICAgICAgICAgICAgLmZpbmQocGFnZUNsYXNzID0+IHsgXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYWdlQ2xhc3Muc3RhcnRzV2l0aChcInBhZ2UtXCIpKSByZXR1cm4gcGFnZUNsYXNzIC8vaWYgY2xhc3Mgc3RhcnRzIHdpdGggXCJwYWdlLVwiIHRoZW4gcmV0dXJuIHRoYXQgY2xhc3NcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIi1cIilbMV0gLy9zcGxpdCBjbGFzcyB1c2luZyB0aGUgXCItXCIgYXMgdGhlIGRlbGltaXRlciwgWzBdPXBhZ2UgWzFdPSMsIGN1cnJlbnRQYWdlID0gI1xuICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgLy9jaGFuZ2UgY2xhc3Mgb2YgcHJldmlvdXMgYXJyb3dcbiAgICAgICAgaWYgKChjdXJyZW50UGFnZSAtIDEpID09PSAwICkgeyAvL2lmIHRoZSBjdXJyZW50IHBhZ2UgLTEgaXMgMCBcbiAgICAgICAgICAgIHByZXZpb3VzRWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7IC8vdGhlbiBkb24ndCBkaXNwbGF5IHByZXZpb3VzIGFycm93XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcmV2aW91c0VsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjsgLy9pZiBncmVhdGVyIHRoYW4gMCB0aGVuIGRpc3BsYXkgYXJyb3cgXG4gICAgICAgICAgICBwcmV2aW91c0VsLmNsYXNzTmFtZSA9IGBwYWdlLSR7Y3VycmVudFBhZ2UgLSAxfWAgLy9hbmQgYWRkIHRoZSBjbGFzcyBvZiB0aGUgcHJldmlvdXMgcGFnZVxuICAgICAgICB9XG4gICAgICAgIC8vY2hhbmdlIGNsYXNzIG9mIG5leHQgYXJyb3dcbiAgICAgICAgaWYgKChjdXJyZW50UGFnZSArIDEpID4gbnVtYmVyT2ZQYWdlcyApIHsgLy9pZiB0aGUgY3VycmVudCBwYWdlICsxIGlzIG1vcmUgdGhhbiB0aGUgdG90YWwgcGFnZXMgXG4gICAgICAgICAgICBuZXh0RWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7IC8vdGhlbiBkb24ndCBkaXNwbGF5IG5leHQgYXJyb3dcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHRFbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7IC8vaWYgbGVzcyB0aGFuIHRvdGFsIHBhZ2VzIHRoZW4gZGlzcGxheSBhcnJvdyBcbiAgICAgICAgICAgIG5leHRFbC5jbGFzc05hbWUgPSBgcGFnZS0ke2N1cnJlbnRQYWdlICsgMX1gIC8vYW5kIGFkZCB0aGUgY2xhc3Mgb2YgdGhlIG5leHQgcGFnZVxuICAgICAgICB9XG5cbiAgICAgICAgLy9kZXRlcm1pbmUgYmxvZ3MgdG8gZGlzcGxheSBieSBzbGljaW5nIGFycmF5XG4gICAgICAgIGNvbnN0IGJlZ2luID0gKGN1cnJlbnRQYWdlLTEpICogaXRlbXNQZXJQYWdlOyAvL2N1cnJlbnQgcGFnZSBtaW51cyBvbmUsIHRoZW4gbXVsdGlwbHkgYnkgaXRlbXMgcGVyIHBhZ2VcbiAgICAgICAgY29uc3QgZW5kID0gY3VycmVudFBhZ2UgKiBpdGVtc1BlclBhZ2U7IC8vY3VycmVudCBwYWdlIG11bHRpcGxpZWQgYnkgaXRlbXMgcGVyIHBhZ2VcbiAgICAgICAgY29uc3QgaXRlbXNUb0Rpc3BsYXkgPSBpdGVtcy5zbGljZShiZWdpbiwgZW5kKTtcblxuICAgICAgICAvL2l0ZXJhdGUgdGhyb3VnaCBpdGVtc1RvRGlzcGxheSBhbmQgaW5zZXJ0cyB0aGVtIGludG8gRE9NXG4gICAgICAgIGNvbnN0IHBhZ2VMb2FkID0gZnVuYyhpdGVtc1RvRGlzcGxheSkgLy9mdW5jdGlvbiB0byB1cGRhdGUgZG9tXG4gICAgICAgIGRlYnVnZ2VyXG5cbiAgICAgICAgb3V0cHV0RWwuY29udGVudC5odG1sKHBhZ2VMb2FkKVxuICAgIFxuICAgIH0vL2VuZCBvZiBwcm9kdWNlSXRlbXNcblxuICAgIC8vIEdldCB0aGUgYXJyYXkgb2YgcGFnaW5hdGlvbiBhbmNob3IgdGFncyB3ZSBhZGRlZCB0byB0aGUgRE9NXG4gICAgY29uc3QgcGFnZUxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBhZ2VcIik7XG4gICAgXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyB0byBlYWNoIDxhPiBlbGVtZW50IGluIHRoZSBwYWdpbmF0aW9uXG4gICAgcGFnZUxpbmtzLmZvckVhY2goIGxpbmsgPT4ge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9kdWNlSXRlbXMsIGZhbHNlKSAvL3doZW4gcGFnaW5hdGlvbiBsaW5rIGlzIGNsaWNrZWQsIHJ1biBwcm9kdWNlSXRlbXMgZnVuY3Rpb24gXG4gICAgfSlcbiAgICBcbiAgICAvL2RlZmF1bHQgc28gdGhhdCBmaXJzdCBwYWdlIGxvYWRzXG4gICAgcHJvZHVjZUl0ZW1zKHtcbiAgICAgICAgXCJ0YXJnZXRcIjoge1xuICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1wicGFnZS0xXCJdXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL2V2ZW50IGxpc3RlbmVycyBmb3IgcHJldmlvdXMgYW5kIG5leHQgZWxlbWVudHNcbiAgICBwcmV2aW91c0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9kdWNlSXRlbXMsIGZhbHNlKTtcbiAgICBuZXh0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2R1Y2VJdGVtcywgZmFsc2UpO1xuXG59Ly9lbmQgb2YgcGFnaW5hdGVcblxubW9kdWxlLmV4cG9ydHMgPSBwYWdpbmF0ZSIsIi8vdGhpcyBtb2R1bGUgd2lsbCBkaXNwbGF5IHByb2plY3QgaW5mb3JtYXRpb25cblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IHByb2plY3RDb250ZW50ID0gcmVxdWlyZShcIi4vcHJvamVjdHNDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlQcm9qZWN0ID0gKCkgPT4ge1xuICAgIFxuICAgIHByb2plY3RDb250ZW50KCkudGhlbiggcHJvZHVjdFN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RIZWFkZXIgPSBcIjxoMT5LcmlzdGVuJ3MgUHJvamVjdHM8L2gxPlwiXG4gICAgICAgIGNvbnN0IHByb2plY3RJbmZvID0gcHJvZHVjdFN0cmluZ1xuICAgIFxuICAgICAgICBkaXNwbGF5UGFnZShwcm9qZWN0SGVhZGVyLCBwcm9qZWN0SW5mbylcbiAgICAgICAgXG4gICAgICAgICQoXCIjcGFnZS1mb290ZXJcIikuaHRtbChcIlwiKVxuICAgIH0pXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5UHJvamVjdFxuIiwiY29uc3QgcHJvamVjdENvbnRlbnQgPSAoaXRlbUFycmF5KSA9PiB7XG4gICAgbGV0IHByb2plY3RTdHJpbmcgPSBcIlwiXG4gICAgLy8gYnVpbGRzIHByb2plY3Qgc2VjdGlvblxuICAgIHByb2plY3RTdHJpbmcgKz0gYFxuICAgIDxzZWN0aW9uIGlkPVwicHJvamVjdHNcIj5cbiAgICBgXG4gICAgLy9pdGVyYXRlIHRocm91Z2ggZWFjaCBwcm9qZWN0IGFuZCBhZGQgdG8gcHJvamVjdFN0cmluZ1xuICAgIGl0ZW1BcnJheS5mb3JFYWNoKFxuICAgICAgICBwcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIHByb2plY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwcm9qZWN0XCI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwicHJvamVjdC1uYW1lXCI+JHtwcm9qZWN0Lm5hbWV9PC9oMj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtZGF0ZVwiPjxiPkRhdGUgQ29tcGxldGVkOjwvYj4gJHtwcm9qZWN0LmRhdGVfY29tcGxldGVkfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtdGVjaFwiPjxiPlRlY2hub2xvZ2llcyBVc2VkOjwvYj4gJHtwcm9qZWN0LnRlY2hub2xvZ2llc191c2VkfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtdGVhbVwiPjxiPlRlYW1tYXRlcyAoaWYgYXBwbGljYWJsZSk6PC9iPiAke3Byb2plY3QudGVhbW1hdGVzfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2plY3QtZGVzY3JpcHRpb25cIj4ke3Byb2plY3QuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgIH1cbiAgICApXG5cbiAgICAvL2Nsb3NpbmcgdGFnIGZvciBwcm9qZWN0IHNlY3Rpb25cbiAgICBwcm9qZWN0U3RyaW5nICs9IGBcbiAgICAgICAgPC9zZWN0aW9uPlxuICAgIGBcbiAgICByZXR1cm4gcHJvamVjdFN0cmluZ1xuICAgIFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb2plY3RDb250ZW50IiwiLy9jb250cm9scyBob3cgdGhlIGNvbnRlbnQgaXMgd3JpdHRlbiB0byB0aGUgZG9tIGZvciBwcm9qZWN0cyBwYWdlXG5jb25zdCBwcm9qZWN0RmlsdGVyID0gcmVxdWlyZShcIi4uL3BhZ2VGaWx0ZXJcIilcbmNvbnN0IHByb2plY3RDb250ZW50ID0gcmVxdWlyZShcIi4vcHJvamVjdENvbnRlbnRcIilcblxuY29uc3QgcHJvamVjdHNET00gPSAoKSA9PiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9wZXJzb25hbC1zaXRlLWNmMWI4LmZpcmViYXNlaW8uY29tL3Byb2plY3RzLmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIiAgXG4gICAgfSkudGhlbihcbiAgICAgICAgcHJvamVjdERiID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHByb2plY3RGaWx0ZXIocHJvamVjdERiLCBwcm9qZWN0Q29udGVudClcblxuICAgICAgICB9XG4gICAgKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvamVjdHNET01cblxuIiwiLy90aGlzIG1vZHVsZSB3aWxsIGRpc3BsYXkgcmVzdW1lIGluZm9ybWF0aW9uXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCByZXN1bWVDb250ZW50ID0gcmVxdWlyZShcIi4vcmVzdW1lQ29udHJvbGxlclwiKVxuXG5jb25zdCBkaXNwbGF5UmVzdW1lID0gKCkgPT4ge1xuICAgIFxuICAgIHJlc3VtZUNvbnRlbnQoKS50aGVuKCByZXN1bWVTdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCByZXN1bWVIZWFkZXIgPSBcIjxoMT5Kb2IgSGlzdG9yeSBmb3IgS3Jpc3RlbiBOb3JyaXM8L2gxPlwiXG4gICAgICAgIGNvbnN0IHJlc3VtZUluZm8gPSByZXN1bWVTdHJpbmdcbiAgICBcbiAgICAgICAgZGlzcGxheVBhZ2UocmVzdW1lSGVhZGVyLCByZXN1bWVJbmZvKVxuICAgIH0pXG5cbiAgICAkKFwiI3BhZ2UtZmlsdGVyXCIpLmh0bWwoXCJcIilcbiAgICAkKFwiI3BhZ2UtZm9vdGVyXCIpLmh0bWwoXCJcIilcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5UmVzdW1lIiwiLy9jb250cm9scyBob3cgdGhlIGNvbnRlbnQgaXMgd3JpdHRlbiB0byB0aGUgZG9tIGZvciByZXN1bWUgcGFnZVxuXG5jb25zdCByZXN1bWVET00gPSAoKSA9PiB7XG5cbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL3BlcnNvbmFsLXNpdGUtY2YxYjguZmlyZWJhc2Vpby5jb20vcmVzdW1lLmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIlxuICAgIH0pXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgICAgcmVzdW1lRGIgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bWVTdHJpbmcgPSBcIlwiXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVzdW1lRGIuZm9yRWFjaCggam9iID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdW1lU3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJqb2JcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwiY29tcGFueVwiPiR7am9iLmNvbXBhbnl9ICgke2pvYi5sb2NhdGlvbn0pPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPiR7am9iLnBvc2l0aW9ufTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzPiR7am9iLnN0YXJ0RGF0ZX0gLSAke2pvYi5lbmREYXRlfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic3VtbWFyeVwiPjxiPlN1bW1hcnk6IDwvYj4ke2pvYi5zdW1tYXJ5fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInJlc3BvbnNpYmlsaXRpZXNcIj48Yj5SZXNwb25zaWJpbGl0aWVzIGluY2x1ZGVkOiA8L2I+JHtqb2IucmVzcG9uc2liaWxpdGllc308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdW1lU3RyaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgIClcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3VtZURPTSJdfQ==
