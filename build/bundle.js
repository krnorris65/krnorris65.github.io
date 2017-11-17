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

        const navLink = document.createElement("a")
        navEl.href = "#"
        navEl.appendChild(document.createTextNode(page.display))

        navEl.appendChild(navLink)
        navList.appendChild(navEl)
    }
)
navElement.appendChild(navList)

module.exports = null
},{}],2:[function(require,module,exports){
//generates content for contact page
const contactContent = () => {
    $.ajax({
        "url": "./data/database.json",
        "method": "GET"
    }).then(
        contactInfo => {
            const contactDb = contactInfo.contact;

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
            contactDb.social.forEach (site => {
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
    
    const contactHeader = "<h1>Contact Me</h1>"

    const contactInfo = contactConent()

    displayPage(contactHeader, contactInfo)

}
},{"../displayPage":4,"./contactController":2}],4:[function(require,module,exports){
const domEl = require("../scripts/domElements")

const displayPage = (pageHeader, pageContent) => {

    domEl.header.html(pageHeader) //adds the page header to the dom

    domEl.content.html(pageContent) //adds the content of page to the dom

}

module.exports = displayPage
},{"../scripts/domElements":5}],5:[function(require,module,exports){
//this module captures the dom elements that will be written to when each page is called

const domElements = () => {
    return Object.create(null, {
        "header": $("#page-header"),
        "content": $("#page-content")
    })
}

module.exports = domElements
},{}],6:[function(require,module,exports){
//display navigation
const navBar = require("./buildNavigation")

//display contact
const contactPage = require("./contact/displayContact")

//display projects
const projectPage = require("./projects/displayProjects")

//display resume

//display blog

console.log(contactPage)
},{"./buildNavigation":1,"./contact/displayContact":3,"./projects/displayProjects":7}],7:[function(require,module,exports){
//this module will display project information

const displayPage = require("../displayPage")
const projectConent = require("./projectsController")

const displayContact = () => {
    
    const projectHeader = "<h1>Kristen's Projects</h1>"

    const projectInfo = projectConent()

    displayPage(projectHeader, projectInfo)

}
},{"../displayPage":4,"./projectsController":9}],8:[function(require,module,exports){
const updateDOM = (itemArray) => {
    itemArray.forEach(
        project => {
            let finalString = ""
            finalString += `
            <article class="project">
                <h2 class="project-name">${project.name}</h2>
                <p class="project-date"><b>Date Completed:</b> ${project.date_completed}</p>
                <p class="project-tech"><b>Technologies Used:</b> ${project.technologies_used}</p>
                <p class="project-team"><b>Teammates (if applicable):</b> ${project.teammates}</p>
                <p class="project-description">${project.description}</p>
            </article>
            `
            return finalString
        }
    )
}

module.exports = updateDOM
},{}],9:[function(require,module,exports){
//generates content for projects page
const projectDOM = require("./productsInfo")

$("input[name='projectsFilter']")

const projectsContent = () => {
    $.ajax({
        "url": "data/database.json",
        "method": "GET"  
    }).then(
        projectInfo => {
            const projectDb = projectInfo.project;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2J1aWxkTmF2aWdhdGlvbi5qcyIsInNjcmlwdHMvY29udGFjdC9jb250YWN0Q29udHJvbGxlci5qcyIsInNjcmlwdHMvY29udGFjdC9kaXNwbGF5Q29udGFjdC5qcyIsInNjcmlwdHMvZGlzcGxheVBhZ2UuanMiLCJzY3JpcHRzL2RvbUVsZW1lbnRzLmpzIiwic2NyaXB0cy9tYWluLmpzIiwic2NyaXB0cy9wcm9qZWN0cy9kaXNwbGF5UHJvamVjdHMuanMiLCJzY3JpcHRzL3Byb2plY3RzL3Byb2R1Y3RzSW5mby5qcyIsInNjcmlwdHMvcHJvamVjdHMvcHJvamVjdHNDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBuYXZpZ2F0aW9uID0gW1xuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiSG9tZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIlJlc3VtZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkNvbnRhY3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJQcm9qZWN0c1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkJsb2dcIlxuICAgIH1cbl1cblxuY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LWl0ZW1zXCIpO1xuXG5jb25zdCBuYXZMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG5cbm5hdmlnYXRpb24uZm9yRWFjaChcbiAgICBwYWdlID0+IHtcbiAgICAgICAgY29uc3QgbmF2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcbiAgICAgICAgbmF2RWwuY2xhc3NMaXN0LmFkZChcIm5hdkxpbmtcIilcblxuICAgICAgICBjb25zdCBuYXZMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcbiAgICAgICAgbmF2RWwuaHJlZiA9IFwiI1wiXG4gICAgICAgIG5hdkVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBhZ2UuZGlzcGxheSkpXG5cbiAgICAgICAgbmF2RWwuYXBwZW5kQ2hpbGQobmF2TGluaylcbiAgICAgICAgbmF2TGlzdC5hcHBlbmRDaGlsZChuYXZFbClcbiAgICB9XG4pXG5uYXZFbGVtZW50LmFwcGVuZENoaWxkKG5hdkxpc3QpXG5cbm1vZHVsZS5leHBvcnRzID0gbnVsbCIsIi8vZ2VuZXJhdGVzIGNvbnRlbnQgZm9yIGNvbnRhY3QgcGFnZVxuY29uc3QgY29udGFjdENvbnRlbnQgPSAoKSA9PiB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgXCJ1cmxcIjogXCIuL2RhdGEvZGF0YWJhc2UuanNvblwiLFxuICAgICAgICBcIm1ldGhvZFwiOiBcIkdFVFwiXG4gICAgfSkudGhlbihcbiAgICAgICAgY29udGFjdEluZm8gPT4ge1xuICAgICAgICAgICAgY29uc3QgY29udGFjdERiID0gY29udGFjdEluZm8uY29udGFjdDtcblxuICAgICAgICAgICAgbGV0IGNvbnRhY3RTdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgICAgICAvL2J1aWxkcyBjb250YWN0IGJ5IGVtYWlsIHNlY3Rpb25cbiAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjb250YWN0XCI+U2VuZCBhbiBlbWFpbDo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9XCJzZW5kLWVtYWlsXCI+IFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZW1haWxcIj48YSBocmVmPVwibWFpbHRvOiR7Y29udGFjdERiLmVtYWlsfVwiPiR7Y29udGFjdERiLmVtYWlsfTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgIC8vYnVpbGRzIGNvbnRhY3QgdGhyb3VnaCBzb2NpYWwgc2VjdGlvblxuICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNvbnRhY3RcIj5Db25uZWN0IG9uIHNvY2lhbCBtZWRpYTo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9XCJzb2NpYWwtbWVkaWFcIj5cbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9pdGVyYXRlcyB0aHJvdWdoIGVhY2ggc29jaWFsIHNpdGVcbiAgICAgICAgICAgIGNvbnRhY3REYi5zb2NpYWwuZm9yRWFjaCAoc2l0ZSA9PiB7XG4gICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInNvY2lhbFwiPjxhIGhyZWY9XCIke3NpdGUudXJsfVwiPiR7c2l0ZS5zZXJ2aWNlfTwvYT48L2xpPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vY2xvc2luZyB0YWdzIGZvciB1bm9yZGVyZWQgbGlzdCBhbmQgY29udGFjdCBzZWN0aW9uXG4gICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgIHJldHVybiBjb250YWN0U3RyaW5nXG4gICAgICAgIH1cbiAgICApXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29udGFjdENvbnRlbnQiLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSBjb250YWN0IGluZm9ybWF0aW9uXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCBjb250YWN0Q29uZW50ID0gcmVxdWlyZShcIi4vY29udGFjdENvbnRyb2xsZXJcIilcblxuY29uc3QgZGlzcGxheUNvbnRhY3QgPSAoKSA9PiB7XG4gICAgXG4gICAgY29uc3QgY29udGFjdEhlYWRlciA9IFwiPGgxPkNvbnRhY3QgTWU8L2gxPlwiXG5cbiAgICBjb25zdCBjb250YWN0SW5mbyA9IGNvbnRhY3RDb25lbnQoKVxuXG4gICAgZGlzcGxheVBhZ2UoY29udGFjdEhlYWRlciwgY29udGFjdEluZm8pXG5cbn0iLCJjb25zdCBkb21FbCA9IHJlcXVpcmUoXCIuLi9zY3JpcHRzL2RvbUVsZW1lbnRzXCIpXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gKHBhZ2VIZWFkZXIsIHBhZ2VDb250ZW50KSA9PiB7XG5cbiAgICBkb21FbC5oZWFkZXIuaHRtbChwYWdlSGVhZGVyKSAvL2FkZHMgdGhlIHBhZ2UgaGVhZGVyIHRvIHRoZSBkb21cblxuICAgIGRvbUVsLmNvbnRlbnQuaHRtbChwYWdlQ29udGVudCkgLy9hZGRzIHRoZSBjb250ZW50IG9mIHBhZ2UgdG8gdGhlIGRvbVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheVBhZ2UiLCIvL3RoaXMgbW9kdWxlIGNhcHR1cmVzIHRoZSBkb20gZWxlbWVudHMgdGhhdCB3aWxsIGJlIHdyaXR0ZW4gdG8gd2hlbiBlYWNoIHBhZ2UgaXMgY2FsbGVkXG5cbmNvbnN0IGRvbUVsZW1lbnRzID0gKCkgPT4ge1xuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKG51bGwsIHtcbiAgICAgICAgXCJoZWFkZXJcIjogJChcIiNwYWdlLWhlYWRlclwiKSxcbiAgICAgICAgXCJjb250ZW50XCI6ICQoXCIjcGFnZS1jb250ZW50XCIpXG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21FbGVtZW50cyIsIi8vZGlzcGxheSBuYXZpZ2F0aW9uXG5jb25zdCBuYXZCYXIgPSByZXF1aXJlKFwiLi9idWlsZE5hdmlnYXRpb25cIilcblxuLy9kaXNwbGF5IGNvbnRhY3RcbmNvbnN0IGNvbnRhY3RQYWdlID0gcmVxdWlyZShcIi4vY29udGFjdC9kaXNwbGF5Q29udGFjdFwiKVxuXG4vL2Rpc3BsYXkgcHJvamVjdHNcbmNvbnN0IHByb2plY3RQYWdlID0gcmVxdWlyZShcIi4vcHJvamVjdHMvZGlzcGxheVByb2plY3RzXCIpXG5cbi8vZGlzcGxheSByZXN1bWVcblxuLy9kaXNwbGF5IGJsb2dcblxuY29uc29sZS5sb2coY29udGFjdFBhZ2UpIiwiLy90aGlzIG1vZHVsZSB3aWxsIGRpc3BsYXkgcHJvamVjdCBpbmZvcm1hdGlvblxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IHJlcXVpcmUoXCIuLi9kaXNwbGF5UGFnZVwiKVxuY29uc3QgcHJvamVjdENvbmVudCA9IHJlcXVpcmUoXCIuL3Byb2plY3RzQ29udHJvbGxlclwiKVxuXG5jb25zdCBkaXNwbGF5Q29udGFjdCA9ICgpID0+IHtcbiAgICBcbiAgICBjb25zdCBwcm9qZWN0SGVhZGVyID0gXCI8aDE+S3Jpc3RlbidzIFByb2plY3RzPC9oMT5cIlxuXG4gICAgY29uc3QgcHJvamVjdEluZm8gPSBwcm9qZWN0Q29uZW50KClcblxuICAgIGRpc3BsYXlQYWdlKHByb2plY3RIZWFkZXIsIHByb2plY3RJbmZvKVxuXG59IiwiY29uc3QgdXBkYXRlRE9NID0gKGl0ZW1BcnJheSkgPT4ge1xuICAgIGl0ZW1BcnJheS5mb3JFYWNoKFxuICAgICAgICBwcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIGxldCBmaW5hbFN0cmluZyA9IFwiXCJcbiAgICAgICAgICAgIGZpbmFsU3RyaW5nICs9IGBcbiAgICAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwicHJvamVjdFwiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInByb2plY3QtbmFtZVwiPiR7cHJvamVjdC5uYW1lfTwvaDI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9qZWN0LWRhdGVcIj48Yj5EYXRlIENvbXBsZXRlZDo8L2I+ICR7cHJvamVjdC5kYXRlX2NvbXBsZXRlZH08L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9qZWN0LXRlY2hcIj48Yj5UZWNobm9sb2dpZXMgVXNlZDo8L2I+ICR7cHJvamVjdC50ZWNobm9sb2dpZXNfdXNlZH08L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9qZWN0LXRlYW1cIj48Yj5UZWFtbWF0ZXMgKGlmIGFwcGxpY2FibGUpOjwvYj4gJHtwcm9qZWN0LnRlYW1tYXRlc308L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9qZWN0LWRlc2NyaXB0aW9uXCI+JHtwcm9qZWN0LmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgIHJldHVybiBmaW5hbFN0cmluZ1xuICAgICAgICB9XG4gICAgKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZURPTSIsIi8vZ2VuZXJhdGVzIGNvbnRlbnQgZm9yIHByb2plY3RzIHBhZ2VcbmNvbnN0IHByb2plY3RET00gPSByZXF1aXJlKFwiLi9wcm9kdWN0c0luZm9cIilcblxuJChcImlucHV0W25hbWU9J3Byb2plY3RzRmlsdGVyJ11cIilcblxuY29uc3QgcHJvamVjdHNDb250ZW50ID0gKCkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIFwidXJsXCI6IFwiZGF0YS9kYXRhYmFzZS5qc29uXCIsXG4gICAgICAgIFwibWV0aG9kXCI6IFwiR0VUXCIgIFxuICAgIH0pLnRoZW4oXG4gICAgICAgIHByb2plY3RJbmZvID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3REYiA9IHByb2plY3RJbmZvLnByb2plY3Q7XG5cbiAgICAgICAgICAgIGxldCBwcm9qZWN0U3RyaW5nID0gXCJcIjtcblxuICAgICAgICAgICAgLy9idWlsZHMgc2VhcmNoIGlucHV0IG9uIERPTVxuICAgICAgICAgICAgcHJvamVjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPHA+U2VhcmNoOiA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicHJvamVjdHNGaWx0ZXJcIiBwbGFjZWhvbGRlcj1cInNlYXJjaCBhbGwgcHJvamVjdHNcIj48L3A+XG4gICAgICAgICAgICBgXG5cbiAgICAgICAgICAgIC8vIGJ1aWxkcyBwcm9qZWN0IHNlY3Rpb25cbiAgICAgICAgICAgIHByb2plY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGlkPVwicHJvamVjdHNcIj5cbiAgICAgICAgICAgIGBcblxuICAgICAgICAgICAgLy9pdGVyYXRlcyB0aHJvdWdoIHByb2plY3RzXG4gICAgICAgICAgICBjb25zdCBwSW5mbyA9IHByb2plY3RET00ocHJvamVjdERiKVxuXG4gICAgICAgICAgICBwcm9qZWN0U3RyaW5nICs9IHBJbmZvXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vY2xvc2luZyB0YWcgZm9yIHByb2plY3Qgc2VjdGlvblxuICAgICAgICAgICAgcHJvamVjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdFN0cmluZ1xuICAgICAgICB9XG4gICAgKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvamVjdHNDb250ZW50XG4iXX0=
