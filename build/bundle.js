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

    return $.ajax({ //need to return ajax function so that contactContent can access the string returned in .then()
        "url": "./data/database.json",
        "method": "GET"
    })
        .then(
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
    contactPage()

    

    

    

    
    //display projects
    // const projectPage = require("./projects/displayProjects")
    
    //display resume
    
    //display blog



})


},{"./buildNavigation":1,"./contact/displayContact":3}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2J1aWxkTmF2aWdhdGlvbi5qcyIsInNjcmlwdHMvY29udGFjdC9jb250YWN0Q29udHJvbGxlci5qcyIsInNjcmlwdHMvY29udGFjdC9kaXNwbGF5Q29udGFjdC5qcyIsInNjcmlwdHMvZGlzcGxheVBhZ2UuanMiLCJzY3JpcHRzL2RvbUVsZW1lbnRzLmpzIiwic2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgbmF2aWdhdGlvbiA9IFtcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkhvbWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJSZXN1bWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJDb250YWN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiUHJvamVjdHNcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJCbG9nXCJcbiAgICB9XG5dXG5cbmNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1pdGVtc1wiKTtcblxuY29uc3QgbmF2TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuXG5uYXZpZ2F0aW9uLmZvckVhY2goXG4gICAgcGFnZSA9PiB7XG4gICAgICAgIGNvbnN0IG5hdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXG4gICAgICAgIG5hdkVsLmNsYXNzTGlzdC5hZGQoXCJuYXZMaW5rXCIpXG5cbiAgICAgICAgY29uc3QgbmF2TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXG4gICAgICAgIG5hdkxpbmsuaHJlZiA9IFwiI1wiXG4gICAgICAgIG5hdkxpbmsuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocGFnZS5kaXNwbGF5KSlcblxuICAgICAgICBuYXZFbC5hcHBlbmRDaGlsZChuYXZMaW5rKVxuICAgICAgICBuYXZMaXN0LmFwcGVuZENoaWxkKG5hdkVsKVxuICAgIH1cbilcbm5hdkVsZW1lbnQuYXBwZW5kQ2hpbGQobmF2TGlzdClcblxubW9kdWxlLmV4cG9ydHMgPSBudWxsIiwiLy9nZW5lcmF0ZXMgY29udGVudCBmb3IgY29udGFjdCBwYWdlXG5jb25zdCBjb250YWN0Q29udGVudCA9ICgpID0+IHtcblxuICAgIHJldHVybiAkLmFqYXgoeyAvL25lZWQgdG8gcmV0dXJuIGFqYXggZnVuY3Rpb24gc28gdGhhdCBjb250YWN0Q29udGVudCBjYW4gYWNjZXNzIHRoZSBzdHJpbmcgcmV0dXJuZWQgaW4gLnRoZW4oKVxuICAgICAgICBcInVybFwiOiBcIi4vZGF0YS9kYXRhYmFzZS5qc29uXCIsXG4gICAgICAgIFwibWV0aG9kXCI6IFwiR0VUXCJcbiAgICB9KVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAgIGNvbnRhY3RJbmZvID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWN0RGIgPSBjb250YWN0SW5mby5jb250YWN0O1xuICAgICAgICAgICAgICAgIGxldCBjb250YWN0U3RyaW5nID0gXCJcIjtcblxuICAgICAgICAgICAgICAgIC8vYnVpbGRzIGNvbnRhY3QgYnkgZW1haWwgc2VjdGlvblxuICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjb250YWN0XCI+U2VuZCBhbiBlbWFpbDo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8dWwgaWQ9XCJzZW5kLWVtYWlsXCI+IFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZW1haWxcIj48YSBocmVmPVwibWFpbHRvOiR7Y29udGFjdERiLmVtYWlsfVwiPiR7Y29udGFjdERiLmVtYWlsfTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAvL2J1aWxkcyBjb250YWN0IHRocm91Z2ggc29jaWFsIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY29udGFjdFwiPkNvbm5lY3Qgb24gc29jaWFsIG1lZGlhOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBpZD1cInNvY2lhbC1tZWRpYVwiPlxuICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICAgICAgLy9pdGVyYXRlcyB0aHJvdWdoIGVhY2ggc29jaWFsIHNpdGVcbiAgICAgICAgICAgICAgICBjb250YWN0RGIuc29jaWFsLmZvckVhY2goc2l0ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJzb2NpYWxcIj48YSBocmVmPVwiJHtzaXRlLnVybH1cIj4ke3NpdGUuc2VydmljZX08L2E+PC9saT5cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIC8vY2xvc2luZyB0YWdzIGZvciB1bm9yZGVyZWQgbGlzdCBhbmQgY29udGFjdCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICBgXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFjdFN0cmluZ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29udGFjdENvbnRlbnQiLCIvL3RoaXMgbW9kdWxlIHdpbGwgZGlzcGxheSBjb250YWN0IGluZm9ybWF0aW9uXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gcmVxdWlyZShcIi4uL2Rpc3BsYXlQYWdlXCIpXG5jb25zdCBjb250YWN0Q29uZW50ID0gcmVxdWlyZShcIi4vY29udGFjdENvbnRyb2xsZXJcIilcblxuY29uc3QgZGlzcGxheUNvbnRhY3QgPSAoKSA9PiB7XG4gICAgY29udGFjdENvbmVudCgpLnRoZW4oY29udGFjdFN0cmluZyA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWN0SGVhZGVyID0gXCI8aDE+Q29udGFjdCBNZTwvaDE+XCJcbiAgICAgICAgY29uc3QgY29udGFjdEluZm8gPSBjb250YWN0U3RyaW5nXG4gICAgICAgIFxuICAgICAgICBkaXNwbGF5UGFnZShjb250YWN0SGVhZGVyLCBjb250YWN0SW5mbykgLy9kaXNwbGF5UGFnZSBuZWVkcyB0byBiZSB3aXRoaW4gdGhlIGNvbnRhY3RDb250ZW50KCkudGhlbiBiZWNhdXNlIGl0IGlzIGRlcGVuZGVudCBvbiB0aGUgc3RyaW5nIHRoYXQgaXMgcmV0dXJuZWQgd2hlbiB0aGUgdGhlbiBmdW5jdGlvbiBydW5zXG4gICAgICAgIFxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheUNvbnRhY3QiLCJjb25zdCBkb21FbCA9IHJlcXVpcmUoXCIuL2RvbUVsZW1lbnRzXCIpXG5cbmNvbnN0IG91dHB1dEVsID0gZG9tRWwoKVxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IChwYWdlSGVhZGVyLCBwYWdlQ29udGVudCkgPT4ge1xuXG4gICAgY29uc3QgaGVhZGVyRWwgPSBvdXRwdXRFbC5oZWFkZXJcbiAgICBcbiAgICBoZWFkZXJFbC5odG1sKHBhZ2VIZWFkZXIpIC8vYWRkcyB0aGUgcGFnZSBoZWFkZXIgdG8gdGhlIGRvbVxuXG4gICAgY29uc3QgY29udGVudEVsID0gb3V0cHV0RWwuY29udGVudFxuICAgIFxuICAgIGNvbnRlbnRFbC5odG1sKHBhZ2VDb250ZW50KSAvL2FkZHMgdGhlIGNvbnRlbnQgb2YgcGFnZSB0byB0aGUgZG9tXG5cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BsYXlQYWdlIiwiLy90aGlzIG1vZHVsZSBjYXB0dXJlcyB0aGUgZG9tIGVsZW1lbnRzIHRoYXQgd2lsbCBiZSB3cml0dGVuIHRvIHdoZW4gZWFjaCBwYWdlIGlzIGNhbGxlZFxuXG5jb25zdCBkb21FbGVtZW50cyA9ICgpID0+IHtcbiAgICBjb25zdCBkb21PYmplY3QgPSBPYmplY3QuY3JlYXRlKG51bGwsIHtcbiAgICAgICAgXCJoZWFkZXJcIjoge1xuICAgICAgICAgICAgdmFsdWU6ICQoXCIjcGFnZS1oZWFkZXJcIilcbiAgICAgICAgfSxcbiAgICAgICAgXCJjb250ZW50XCI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAkKFwiI3BhZ2UtY29udGVudFwiKVxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZG9tT2JqZWN0XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBkb21FbGVtZW50cyIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAvL2Rpc3BsYXkgbmF2aWdhdGlvblxuICAgIGNvbnN0IG5hdkJhciA9IHJlcXVpcmUoXCIuL2J1aWxkTmF2aWdhdGlvblwiKVxuICAgIFxuICAgIC8vZGlzcGxheSBjb250YWN0XG4gICAgY29uc3QgY29udGFjdFBhZ2UgPSByZXF1aXJlKFwiLi9jb250YWN0L2Rpc3BsYXlDb250YWN0XCIpXG4gICAgY29udGFjdFBhZ2UoKVxuXG4gICAgXG5cbiAgICBcblxuICAgIFxuXG4gICAgXG4gICAgLy9kaXNwbGF5IHByb2plY3RzXG4gICAgLy8gY29uc3QgcHJvamVjdFBhZ2UgPSByZXF1aXJlKFwiLi9wcm9qZWN0cy9kaXNwbGF5UHJvamVjdHNcIilcbiAgICBcbiAgICAvL2Rpc3BsYXkgcmVzdW1lXG4gICAgXG4gICAgLy9kaXNwbGF5IGJsb2dcblxuXG5cbn0pXG5cbiJdfQ==
