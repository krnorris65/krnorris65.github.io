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
    
    //display blog



})


},{"./buildNavigation":1,"./contact/displayContact":3,"./projects/displayProjects":7}],7:[function(require,module,exports){
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
},{"../displayPage":4,"./projectsController":9}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
//generates content for projects page
const projectDOM = require("./productsInfo")

const projectsContent = () => {
    return $.ajax({
        "url": "https://personal-site-cf1b8.firebaseio.com/projects.json",
        "method": "GET"  
    }).then(
        projectDb => {
            let projectString = "";
            
            //builds search input on DOM
            projectString += `
            <p>Search: <input type="text" name="projectsFilter" placeholder="search all projects"></p>
            `
            
            // builds project section
            projectString += `
            <section id="projects">
            `
            
            //iterates through projects
            const pInfo = projectDOM(projectDb)

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

},{"./productsInfo":8}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2J1aWxkTmF2aWdhdGlvbi5qcyIsInNjcmlwdHMvY29udGFjdC9jb250YWN0Q29udHJvbGxlci5qcyIsInNjcmlwdHMvY29udGFjdC9kaXNwbGF5Q29udGFjdC5qcyIsInNjcmlwdHMvZGlzcGxheVBhZ2UuanMiLCJzY3JpcHRzL2RvbUVsZW1lbnRzLmpzIiwic2NyaXB0cy9tYWluLmpzIiwic2NyaXB0cy9wcm9qZWN0cy9kaXNwbGF5UHJvamVjdHMuanMiLCJzY3JpcHRzL3Byb2plY3RzL3Byb2R1Y3RzSW5mby5qcyIsInNjcmlwdHMvcHJvamVjdHMvcHJvamVjdHNDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgbmF2aWdhdGlvbiA9IFtcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkhvbWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJSZXN1bWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJDb250YWN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiUHJvamVjdHNcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJCbG9nXCJcbiAgICB9XG5dXG5cbmNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1pdGVtc1wiKTtcblxuY29uc3QgbmF2TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuXG5uYXZpZ2F0aW9uLmZvckVhY2goXG4gICAgcGFnZSA9PiB7XG4gICAgICAgIGNvbnN0IG5hdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXG4gICAgICAgIG5hdkVsLmNsYXNzTGlzdC5hZGQoXCJuYXZMaW5rXCIpXG4gICAgICAgIG5hdkVsLmlkID0gYG5hdl8ke3BhZ2UuZGlzcGxheX1gXG5cbiAgICAgICAgY29uc3QgbmF2TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXG4gICAgICAgIG5hdkxpbmsuaHJlZiA9IFwiI1wiXG4gICAgICAgIG5hdkxpbmsuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocGFnZS5kaXNwbGF5KSlcblxuICAgICAgICBuYXZFbC5hcHBlbmRDaGlsZChuYXZMaW5rKVxuICAgICAgICBuYXZMaXN0LmFwcGVuZENoaWxkKG5hdkVsKVxuICAgIH1cbilcbm5hdkVsZW1lbnQuYXBwZW5kQ2hpbGQobmF2TGlzdClcblxubW9kdWxlLmV4cG9ydHMgPSBudWxsIiwiLy9nZW5lcmF0ZXMgY29udGVudCBmb3IgY29udGFjdCBwYWdlXG5jb25zdCBjb250YWN0Q29udGVudCA9ICgpID0+IHtcblxuICAgIHJldHVybiAkLmFqYXgoeyAvL25lZWQgdG8gcmV0dXJuIGFqYXggZnVuY3Rpb24gc28gdGhhdCBjb250YWN0Q29udGVudCBjYW4gYWNjZXNzIHRoZSBzdHJpbmcgcmV0dXJuZWQgaW4gLnRoZW4oKVxuICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vcGVyc29uYWwtc2l0ZS1jZjFiOC5maXJlYmFzZWlvLmNvbS9jb250YWN0Lmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIlxuICAgIH0pXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgICAgY29udGFjdERiID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGFjdFN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAvL2J1aWxkcyBjb250YWN0IGJ5IGVtYWlsIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY29udGFjdFwiPlNlbmQgYW4gZW1haWw6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPVwic2VuZC1lbWFpbFwiPiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImVtYWlsXCI+PGEgaHJlZj1cIm1haWx0bzoke2NvbnRhY3REYi5lbWFpbH1cIj4ke2NvbnRhY3REYi5lbWFpbH08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgLy9idWlsZHMgY29udGFjdCB0aHJvdWdoIHNvY2lhbCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNvbnRhY3RcIj5Db25uZWN0IG9uIHNvY2lhbCBtZWRpYTo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9XCJzb2NpYWwtbWVkaWFcIj5cbiAgICAgICAgICAgIGBcblxuICAgICAgICAgICAgICAgIC8vaXRlcmF0ZXMgdGhyb3VnaCBlYWNoIHNvY2lhbCBzaXRlXG4gICAgICAgICAgICAgICAgY29udGFjdERiLnNvY2lhbC5mb3JFYWNoKHNpdGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwic29jaWFsXCI+PGEgaHJlZj1cIiR7c2l0ZS51cmx9XCI+JHtzaXRlLnNlcnZpY2V9PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAvL2Nsb3NpbmcgdGFncyBmb3IgdW5vcmRlcmVkIGxpc3QgYW5kIGNvbnRhY3Qgc2VjdGlvblxuICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhY3RTdHJpbmdcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRhY3RDb250ZW50IiwiLy90aGlzIG1vZHVsZSB3aWxsIGRpc3BsYXkgY29udGFjdCBpbmZvcm1hdGlvblxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IHJlcXVpcmUoXCIuLi9kaXNwbGF5UGFnZVwiKVxuY29uc3QgY29udGFjdENvbmVudCA9IHJlcXVpcmUoXCIuL2NvbnRhY3RDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlDb250YWN0ID0gKCkgPT4ge1xuICAgIGNvbnRhY3RDb25lbnQoKS50aGVuKGNvbnRhY3RTdHJpbmcgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY29udGFjdEhlYWRlciA9IFwiPGgxPkNvbnRhY3QgTWU8L2gxPlwiXG4gICAgICAgIGNvbnN0IGNvbnRhY3RJbmZvID0gY29udGFjdFN0cmluZ1xuICAgICAgICBcbiAgICAgICAgZGlzcGxheVBhZ2UoY29udGFjdEhlYWRlciwgY29udGFjdEluZm8pIC8vZGlzcGxheVBhZ2UgbmVlZHMgdG8gYmUgd2l0aGluIHRoZSBjb250YWN0Q29udGVudCgpLnRoZW4gYmVjYXVzZSBpdCBpcyBkZXBlbmRlbnQgb24gdGhlIHN0cmluZyB0aGF0IGlzIHJldHVybmVkIHdoZW4gdGhlIHRoZW4gZnVuY3Rpb24gcnVuc1xuICAgICAgICBcbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlDb250YWN0IiwiY29uc3QgZG9tRWwgPSByZXF1aXJlKFwiLi9kb21FbGVtZW50c1wiKVxuXG5jb25zdCBvdXRwdXRFbCA9IGRvbUVsKClcblxuY29uc3QgZGlzcGxheVBhZ2UgPSAocGFnZUhlYWRlciwgcGFnZUNvbnRlbnQpID0+IHtcblxuICAgIGNvbnN0IGhlYWRlckVsID0gb3V0cHV0RWwuaGVhZGVyXG4gICAgXG4gICAgaGVhZGVyRWwuaHRtbChwYWdlSGVhZGVyKSAvL2FkZHMgdGhlIHBhZ2UgaGVhZGVyIHRvIHRoZSBkb21cblxuICAgIGNvbnN0IGNvbnRlbnRFbCA9IG91dHB1dEVsLmNvbnRlbnRcbiAgICBcbiAgICBjb250ZW50RWwuaHRtbChwYWdlQ29udGVudCkgLy9hZGRzIHRoZSBjb250ZW50IG9mIHBhZ2UgdG8gdGhlIGRvbVxuXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5UGFnZSIsIi8vdGhpcyBtb2R1bGUgY2FwdHVyZXMgdGhlIGRvbSBlbGVtZW50cyB0aGF0IHdpbGwgYmUgd3JpdHRlbiB0byB3aGVuIGVhY2ggcGFnZSBpcyBjYWxsZWRcblxuY29uc3QgZG9tRWxlbWVudHMgPSAoKSA9PiB7XG4gICAgY29uc3QgZG9tT2JqZWN0ID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG4gICAgICAgIFwiaGVhZGVyXCI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAkKFwiI3BhZ2UtaGVhZGVyXCIpXG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGVudFwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogJChcIiNwYWdlLWNvbnRlbnRcIilcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGRvbU9iamVjdFxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZG9tRWxlbWVudHMiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgLy9kaXNwbGF5IG5hdmlnYXRpb25cbiAgICBjb25zdCBuYXZCYXIgPSByZXF1aXJlKFwiLi9idWlsZE5hdmlnYXRpb25cIilcbiAgICBcbiAgICAvL2Rpc3BsYXkgY29udGFjdFxuICAgIGNvbnN0IGNvbnRhY3RQYWdlID0gcmVxdWlyZShcIi4vY29udGFjdC9kaXNwbGF5Q29udGFjdFwiKVxuICAgIC8vIGNvbnRhY3RQYWdlKClcblxuICAgIFxuICAgIC8vZGlzcGxheSBwcm9qZWN0c1xuICAgIGNvbnN0IHByb2plY3RQYWdlID0gcmVxdWlyZShcIi4vcHJvamVjdHMvZGlzcGxheVByb2plY3RzXCIpXG4gICAgcHJvamVjdFBhZ2UoKVxuXG4gICAgLy9kaXNwbGF5IHJlc3VtZVxuICAgIFxuICAgIC8vZGlzcGxheSBibG9nXG5cblxuXG59KVxuXG4iLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSBwcm9qZWN0IGluZm9ybWF0aW9uXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCBwcm9qZWN0Q29udGVudCA9IHJlcXVpcmUoXCIuL3Byb2plY3RzQ29udHJvbGxlclwiKVxuXG5jb25zdCBkaXNwbGF5UHJvamVjdCA9ICgpID0+IHtcbiAgICBcbiAgICBwcm9qZWN0Q29udGVudCgpLnRoZW4oIHByb2R1Y3RTdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGVyID0gXCI8aDE+S3Jpc3RlbidzIFByb2plY3RzPC9oMT5cIlxuICAgICAgICBjb25zdCBwcm9qZWN0SW5mbyA9IHByb2R1Y3RTdHJpbmdcbiAgICAgICAgXG4gICAgICAgIGRpc3BsYXlQYWdlKHByb2plY3RIZWFkZXIsIHByb2plY3RJbmZvKVxuICAgIH0pXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5UHJvamVjdCIsImNvbnN0IHByb2plY3RET00gPSAoaXRlbUFycmF5KSA9PiB7XG4gICAgbGV0IHByb2plY3RMaXN0ID0gXCJcIlxuICAgIGl0ZW1BcnJheS5mb3JFYWNoKFxuICAgICAgICBwcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIHByb2plY3RMaXN0ICs9IGBcbiAgICAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwicHJvamVjdFwiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInByb2plY3QtbmFtZVwiPiR7cHJvamVjdC5uYW1lfTwvaDI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9qZWN0LWRhdGVcIj48Yj5EYXRlIENvbXBsZXRlZDo8L2I+ICR7cHJvamVjdC5kYXRlX2NvbXBsZXRlZH08L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9qZWN0LXRlY2hcIj48Yj5UZWNobm9sb2dpZXMgVXNlZDo8L2I+ICR7cHJvamVjdC50ZWNobm9sb2dpZXNfdXNlZH08L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9qZWN0LXRlYW1cIj48Yj5UZWFtbWF0ZXMgKGlmIGFwcGxpY2FibGUpOjwvYj4gJHtwcm9qZWN0LnRlYW1tYXRlc308L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9qZWN0LWRlc2NyaXB0aW9uXCI+JHtwcm9qZWN0LmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgIGBcblxuICAgICAgICB9XG4gICAgKVxuICAgIHJldHVybiBwcm9qZWN0TGlzdFxuICAgIFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb2plY3RET00iLCIvL2dlbmVyYXRlcyBjb250ZW50IGZvciBwcm9qZWN0cyBwYWdlXG5jb25zdCBwcm9qZWN0RE9NID0gcmVxdWlyZShcIi4vcHJvZHVjdHNJbmZvXCIpXG5cbmNvbnN0IHByb2plY3RzQ29udGVudCA9ICgpID0+IHtcbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL3BlcnNvbmFsLXNpdGUtY2YxYjguZmlyZWJhc2Vpby5jb20vcHJvamVjdHMuanNvblwiLFxuICAgICAgICBcIm1ldGhvZFwiOiBcIkdFVFwiICBcbiAgICB9KS50aGVuKFxuICAgICAgICBwcm9qZWN0RGIgPT4ge1xuICAgICAgICAgICAgbGV0IHByb2plY3RTdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2J1aWxkcyBzZWFyY2ggaW5wdXQgb24gRE9NXG4gICAgICAgICAgICBwcm9qZWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgIDxwPlNlYXJjaDogPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInByb2plY3RzRmlsdGVyXCIgcGxhY2Vob2xkZXI9XCJzZWFyY2ggYWxsIHByb2plY3RzXCI+PC9wPlxuICAgICAgICAgICAgYFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBidWlsZHMgcHJvamVjdCBzZWN0aW9uXG4gICAgICAgICAgICBwcm9qZWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgIDxzZWN0aW9uIGlkPVwicHJvamVjdHNcIj5cbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9pdGVyYXRlcyB0aHJvdWdoIHByb2plY3RzXG4gICAgICAgICAgICBjb25zdCBwSW5mbyA9IHByb2plY3RET00ocHJvamVjdERiKVxuXG4gICAgICAgICAgICBwcm9qZWN0U3RyaW5nICs9IHBJbmZvXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vY2xvc2luZyB0YWcgZm9yIHByb2plY3Qgc2VjdGlvblxuICAgICAgICAgICAgcHJvamVjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdFN0cmluZ1xuICAgICAgICB9XG4gICAgKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvamVjdHNDb250ZW50XG4iXX0=
