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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2J1aWxkTmF2aWdhdGlvbi5qcyIsInNjcmlwdHMvY29udGFjdC9jb250YWN0Q29udHJvbGxlci5qcyIsInNjcmlwdHMvY29udGFjdC9kaXNwbGF5Q29udGFjdC5qcyIsInNjcmlwdHMvZGlzcGxheVBhZ2UuanMiLCJzY3JpcHRzL2RvbUVsZW1lbnRzLmpzIiwic2NyaXB0cy9tYWluLmpzIiwic2NyaXB0cy9wcm9qZWN0cy9kaXNwbGF5UHJvamVjdHMuanMiLCJzY3JpcHRzL3Byb2plY3RzL3Byb2R1Y3RzSW5mby5qcyIsInNjcmlwdHMvcHJvamVjdHMvcHJvamVjdHNDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBuYXZpZ2F0aW9uID0gW1xuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiSG9tZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIlJlc3VtZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkNvbnRhY3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJQcm9qZWN0c1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkJsb2dcIlxuICAgIH1cbl1cblxuY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LWl0ZW1zXCIpO1xuXG5jb25zdCBuYXZMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG5cbm5hdmlnYXRpb24uZm9yRWFjaChcbiAgICBwYWdlID0+IHtcbiAgICAgICAgY29uc3QgbmF2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcbiAgICAgICAgbmF2RWwuY2xhc3NMaXN0LmFkZChcIm5hdkxpbmtcIilcblxuICAgICAgICBjb25zdCBuYXZMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcbiAgICAgICAgbmF2TGluay5ocmVmID0gXCIjXCJcbiAgICAgICAgbmF2TGluay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwYWdlLmRpc3BsYXkpKVxuXG4gICAgICAgIG5hdkVsLmFwcGVuZENoaWxkKG5hdkxpbmspXG4gICAgICAgIG5hdkxpc3QuYXBwZW5kQ2hpbGQobmF2RWwpXG4gICAgfVxuKVxubmF2RWxlbWVudC5hcHBlbmRDaGlsZChuYXZMaXN0KVxuXG5tb2R1bGUuZXhwb3J0cyA9IG51bGwiLCIvL2dlbmVyYXRlcyBjb250ZW50IGZvciBjb250YWN0IHBhZ2VcbmNvbnN0IGNvbnRhY3RDb250ZW50ID0gKCkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIFwidXJsXCI6IFwiLi9kYXRhL2RhdGFiYXNlLmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIlxuICAgIH0pLnRoZW4oXG4gICAgICAgIGNvbnRhY3RJbmZvID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3REYiA9IGNvbnRhY3RJbmZvLmNvbnRhY3Q7XG5cbiAgICAgICAgICAgIGxldCBjb250YWN0U3RyaW5nID0gXCJcIjtcblxuICAgICAgICAgICAgLy9idWlsZHMgY29udGFjdCBieSBlbWFpbCBzZWN0aW9uXG4gICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY29udGFjdFwiPlNlbmQgYW4gZW1haWw6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPVwic2VuZC1lbWFpbFwiPiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImVtYWlsXCI+PGEgaHJlZj1cIm1haWx0bzoke2NvbnRhY3REYi5lbWFpbH1cIj4ke2NvbnRhY3REYi5lbWFpbH08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgICAvL2J1aWxkcyBjb250YWN0IHRocm91Z2ggc29jaWFsIHNlY3Rpb25cbiAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjb250YWN0XCI+Q29ubmVjdCBvbiBzb2NpYWwgbWVkaWE6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPVwic29jaWFsLW1lZGlhXCI+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vaXRlcmF0ZXMgdGhyb3VnaCBlYWNoIHNvY2lhbCBzaXRlXG4gICAgICAgICAgICBjb250YWN0RGIuc29jaWFsLmZvckVhY2ggKHNpdGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJzb2NpYWxcIj48YSBocmVmPVwiJHtzaXRlLnVybH1cIj4ke3NpdGUuc2VydmljZX08L2E+PC9saT5cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvL2Nsb3NpbmcgdGFncyBmb3IgdW5vcmRlcmVkIGxpc3QgYW5kIGNvbnRhY3Qgc2VjdGlvblxuICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgICByZXR1cm4gY29udGFjdFN0cmluZ1xuICAgICAgICB9XG4gICAgKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRhY3RDb250ZW50IiwiLy90aGlzIG1vZHVsZSB3aWxsIGRpc3BsYXkgY29udGFjdCBpbmZvcm1hdGlvblxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IHJlcXVpcmUoXCIuLi9kaXNwbGF5UGFnZVwiKVxuY29uc3QgY29udGFjdENvbmVudCA9IHJlcXVpcmUoXCIuL2NvbnRhY3RDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlDb250YWN0ID0gKCkgPT4ge1xuICAgIFxuICAgIGNvbnN0IGNvbnRhY3RIZWFkZXIgPSBcIjxoMT5Db250YWN0IE1lPC9oMT5cIlxuXG4gICAgY29uc3QgY29udGFjdEluZm8gPSBjb250YWN0Q29uZW50KClcblxuICAgIGRpc3BsYXlQYWdlKGNvbnRhY3RIZWFkZXIsIGNvbnRhY3RJbmZvKVxuXG59IiwiY29uc3QgZG9tRWwgPSByZXF1aXJlKFwiLi4vc2NyaXB0cy9kb21FbGVtZW50c1wiKVxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IChwYWdlSGVhZGVyLCBwYWdlQ29udGVudCkgPT4ge1xuXG4gICAgZG9tRWwuaGVhZGVyLmh0bWwocGFnZUhlYWRlcikgLy9hZGRzIHRoZSBwYWdlIGhlYWRlciB0byB0aGUgZG9tXG5cbiAgICBkb21FbC5jb250ZW50Lmh0bWwocGFnZUNvbnRlbnQpIC8vYWRkcyB0aGUgY29udGVudCBvZiBwYWdlIHRvIHRoZSBkb21cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlQYWdlIiwiLy90aGlzIG1vZHVsZSBjYXB0dXJlcyB0aGUgZG9tIGVsZW1lbnRzIHRoYXQgd2lsbCBiZSB3cml0dGVuIHRvIHdoZW4gZWFjaCBwYWdlIGlzIGNhbGxlZFxuXG5jb25zdCBkb21FbGVtZW50cyA9ICgpID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG4gICAgICAgIFwiaGVhZGVyXCI6ICQoXCIjcGFnZS1oZWFkZXJcIiksXG4gICAgICAgIFwiY29udGVudFwiOiAkKFwiI3BhZ2UtY29udGVudFwiKVxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tRWxlbWVudHMiLCIvL2Rpc3BsYXkgbmF2aWdhdGlvblxuY29uc3QgbmF2QmFyID0gcmVxdWlyZShcIi4vYnVpbGROYXZpZ2F0aW9uXCIpXG5cbi8vZGlzcGxheSBjb250YWN0XG5jb25zdCBjb250YWN0UGFnZSA9IHJlcXVpcmUoXCIuL2NvbnRhY3QvZGlzcGxheUNvbnRhY3RcIilcblxuLy9kaXNwbGF5IHByb2plY3RzXG5jb25zdCBwcm9qZWN0UGFnZSA9IHJlcXVpcmUoXCIuL3Byb2plY3RzL2Rpc3BsYXlQcm9qZWN0c1wiKVxuXG4vL2Rpc3BsYXkgcmVzdW1lXG5cbi8vZGlzcGxheSBibG9nXG5cbmNvbnNvbGUubG9nKGNvbnRhY3RQYWdlKSIsIi8vdGhpcyBtb2R1bGUgd2lsbCBkaXNwbGF5IHByb2plY3QgaW5mb3JtYXRpb25cblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IHByb2plY3RDb25lbnQgPSByZXF1aXJlKFwiLi9wcm9qZWN0c0NvbnRyb2xsZXJcIilcblxuY29uc3QgZGlzcGxheUNvbnRhY3QgPSAoKSA9PiB7XG4gICAgXG4gICAgY29uc3QgcHJvamVjdEhlYWRlciA9IFwiPGgxPktyaXN0ZW4ncyBQcm9qZWN0czwvaDE+XCJcblxuICAgIGNvbnN0IHByb2plY3RJbmZvID0gcHJvamVjdENvbmVudCgpXG5cbiAgICBkaXNwbGF5UGFnZShwcm9qZWN0SGVhZGVyLCBwcm9qZWN0SW5mbylcblxufSIsImNvbnN0IHVwZGF0ZURPTSA9IChpdGVtQXJyYXkpID0+IHtcbiAgICBpdGVtQXJyYXkuZm9yRWFjaChcbiAgICAgICAgcHJvamVjdCA9PiB7XG4gICAgICAgICAgICBsZXQgZmluYWxTdHJpbmcgPSBcIlwiXG4gICAgICAgICAgICBmaW5hbFN0cmluZyArPSBgXG4gICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInByb2plY3RcIj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJwcm9qZWN0LW5hbWVcIj4ke3Byb2plY3QubmFtZX08L2gyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvamVjdC1kYXRlXCI+PGI+RGF0ZSBDb21wbGV0ZWQ6PC9iPiAke3Byb2plY3QuZGF0ZV9jb21wbGV0ZWR9PC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvamVjdC10ZWNoXCI+PGI+VGVjaG5vbG9naWVzIFVzZWQ6PC9iPiAke3Byb2plY3QudGVjaG5vbG9naWVzX3VzZWR9PC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvamVjdC10ZWFtXCI+PGI+VGVhbW1hdGVzIChpZiBhcHBsaWNhYmxlKTo8L2I+ICR7cHJvamVjdC50ZWFtbWF0ZXN9PC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvamVjdC1kZXNjcmlwdGlvblwiPiR7cHJvamVjdC5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgICByZXR1cm4gZmluYWxTdHJpbmdcbiAgICAgICAgfVxuICAgIClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1cGRhdGVET00iLCIvL2dlbmVyYXRlcyBjb250ZW50IGZvciBwcm9qZWN0cyBwYWdlXG5jb25zdCBwcm9qZWN0RE9NID0gcmVxdWlyZShcIi4vcHJvZHVjdHNJbmZvXCIpXG5cbiQoXCJpbnB1dFtuYW1lPSdwcm9qZWN0c0ZpbHRlciddXCIpXG5cbmNvbnN0IHByb2plY3RzQ29udGVudCA9ICgpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgICBcInVybFwiOiBcImRhdGEvZGF0YWJhc2UuanNvblwiLFxuICAgICAgICBcIm1ldGhvZFwiOiBcIkdFVFwiICBcbiAgICB9KS50aGVuKFxuICAgICAgICBwcm9qZWN0SW5mbyA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0RGIgPSBwcm9qZWN0SW5mby5wcm9qZWN0O1xuXG4gICAgICAgICAgICBsZXQgcHJvamVjdFN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgICAgIC8vYnVpbGRzIHNlYXJjaCBpbnB1dCBvbiBET01cbiAgICAgICAgICAgIHByb2plY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDxwPlNlYXJjaDogPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInByb2plY3RzRmlsdGVyXCIgcGxhY2Vob2xkZXI9XCJzZWFyY2ggYWxsIHByb2plY3RzXCI+PC9wPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICAvLyBidWlsZHMgcHJvamVjdCBzZWN0aW9uXG4gICAgICAgICAgICBwcm9qZWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBpZD1cInByb2plY3RzXCI+XG4gICAgICAgICAgICBgXG5cbiAgICAgICAgICAgIC8vaXRlcmF0ZXMgdGhyb3VnaCBwcm9qZWN0c1xuICAgICAgICAgICAgY29uc3QgcEluZm8gPSBwcm9qZWN0RE9NKHByb2plY3REYilcblxuICAgICAgICAgICAgcHJvamVjdFN0cmluZyArPSBwSW5mb1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2Nsb3NpbmcgdGFnIGZvciBwcm9qZWN0IHNlY3Rpb25cbiAgICAgICAgICAgIHByb2plY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIGBcblxuICAgICAgICAgICAgcmV0dXJuIHByb2plY3RTdHJpbmdcbiAgICAgICAgfVxuICAgIClcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb2plY3RzQ29udGVudFxuIl19
