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
const domEl = require("./domElements")

const outputEl = domEl()

const displayPage = (pageHeader, pageContent) => {

    const headerEl = outputEl.header
    
    headerEl.html(pageHeader) //adds the page header to the dom

    const contentEl = outputEl.content
    
    contentEl.html(pageContent) //adds the content of page to the dom

    console.log(headerEl)
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
    
    //display projects
    // const projectPage = require("./projects/displayProjects")
    
    //display resume
    
    //display blog



})


},{"./buildNavigation":1,"./contact/displayContact":3}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2J1aWxkTmF2aWdhdGlvbi5qcyIsInNjcmlwdHMvY29udGFjdC9jb250YWN0Q29udHJvbGxlci5qcyIsInNjcmlwdHMvY29udGFjdC9kaXNwbGF5Q29udGFjdC5qcyIsInNjcmlwdHMvZGlzcGxheVBhZ2UuanMiLCJzY3JpcHRzL2RvbUVsZW1lbnRzLmpzIiwic2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBuYXZpZ2F0aW9uID0gW1xuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiSG9tZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIlJlc3VtZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkNvbnRhY3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJQcm9qZWN0c1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIkJsb2dcIlxuICAgIH1cbl1cblxuY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LWl0ZW1zXCIpO1xuXG5jb25zdCBuYXZMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG5cbm5hdmlnYXRpb24uZm9yRWFjaChcbiAgICBwYWdlID0+IHtcbiAgICAgICAgY29uc3QgbmF2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcbiAgICAgICAgbmF2RWwuY2xhc3NMaXN0LmFkZChcIm5hdkxpbmtcIilcblxuICAgICAgICBjb25zdCBuYXZMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcbiAgICAgICAgbmF2TGluay5ocmVmID0gXCIjXCJcbiAgICAgICAgbmF2TGluay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwYWdlLmRpc3BsYXkpKVxuXG4gICAgICAgIG5hdkVsLmFwcGVuZENoaWxkKG5hdkxpbmspXG4gICAgICAgIG5hdkxpc3QuYXBwZW5kQ2hpbGQobmF2RWwpXG4gICAgfVxuKVxubmF2RWxlbWVudC5hcHBlbmRDaGlsZChuYXZMaXN0KVxuXG5tb2R1bGUuZXhwb3J0cyA9IG51bGwiLCIvL2dlbmVyYXRlcyBjb250ZW50IGZvciBjb250YWN0IHBhZ2VcbmNvbnN0IGNvbnRhY3RDb250ZW50ID0gKCkgPT4ge1xuICAgICQuYWpheCh7XG4gICAgICAgIFwidXJsXCI6IFwiLi9kYXRhL2RhdGFiYXNlLmpzb25cIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIlxuICAgIH0pLnRoZW4oXG4gICAgICAgIGNvbnRhY3RJbmZvID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3REYiA9IGNvbnRhY3RJbmZvLmNvbnRhY3Q7XG5cbiAgICAgICAgICAgIGxldCBjb250YWN0U3RyaW5nID0gXCJcIjtcblxuICAgICAgICAgICAgLy9idWlsZHMgY29udGFjdCBieSBlbWFpbCBzZWN0aW9uXG4gICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY29udGFjdFwiPlNlbmQgYW4gZW1haWw6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPVwic2VuZC1lbWFpbFwiPiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImVtYWlsXCI+PGEgaHJlZj1cIm1haWx0bzoke2NvbnRhY3REYi5lbWFpbH1cIj4ke2NvbnRhY3REYi5lbWFpbH08L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgICAvL2J1aWxkcyBjb250YWN0IHRocm91Z2ggc29jaWFsIHNlY3Rpb25cbiAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjb250YWN0XCI+Q29ubmVjdCBvbiBzb2NpYWwgbWVkaWE6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPVwic29jaWFsLW1lZGlhXCI+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vaXRlcmF0ZXMgdGhyb3VnaCBlYWNoIHNvY2lhbCBzaXRlXG4gICAgICAgICAgICBjb250YWN0RGIuc29jaWFsLmZvckVhY2ggKHNpdGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJzb2NpYWxcIj48YSBocmVmPVwiJHtzaXRlLnVybH1cIj4ke3NpdGUuc2VydmljZX08L2E+PC9saT5cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvL2Nsb3NpbmcgdGFncyBmb3IgdW5vcmRlcmVkIGxpc3QgYW5kIGNvbnRhY3Qgc2VjdGlvblxuICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgICByZXR1cm4gY29udGFjdFN0cmluZ1xuICAgICAgICB9XG4gICAgKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRhY3RDb250ZW50IiwiLy90aGlzIG1vZHVsZSB3aWxsIGRpc3BsYXkgY29udGFjdCBpbmZvcm1hdGlvblxuXG5jb25zdCBkaXNwbGF5UGFnZSA9IHJlcXVpcmUoXCIuLi9kaXNwbGF5UGFnZVwiKVxuY29uc3QgY29udGFjdENvbmVudCA9IHJlcXVpcmUoXCIuL2NvbnRhY3RDb250cm9sbGVyXCIpXG5cbmNvbnN0IGRpc3BsYXlDb250YWN0ID0gKCkgPT4ge1xuICAgIFxuICAgIGNvbnN0IGNvbnRhY3RIZWFkZXIgPSBcIjxoMT5Db250YWN0IE1lPC9oMT5cIlxuXG4gICAgY29uc3QgY29udGFjdEluZm8gPSBjb250YWN0Q29uZW50KClcblxuICAgIGRpc3BsYXlQYWdlKGNvbnRhY3RIZWFkZXIsIGNvbnRhY3RJbmZvKVxuXG59IiwiY29uc3QgZG9tRWwgPSByZXF1aXJlKFwiLi9kb21FbGVtZW50c1wiKVxuXG5jb25zdCBvdXRwdXRFbCA9IGRvbUVsKClcblxuY29uc3QgZGlzcGxheVBhZ2UgPSAocGFnZUhlYWRlciwgcGFnZUNvbnRlbnQpID0+IHtcblxuICAgIGNvbnN0IGhlYWRlckVsID0gb3V0cHV0RWwuaGVhZGVyXG4gICAgXG4gICAgaGVhZGVyRWwuaHRtbChwYWdlSGVhZGVyKSAvL2FkZHMgdGhlIHBhZ2UgaGVhZGVyIHRvIHRoZSBkb21cblxuICAgIGNvbnN0IGNvbnRlbnRFbCA9IG91dHB1dEVsLmNvbnRlbnRcbiAgICBcbiAgICBjb250ZW50RWwuaHRtbChwYWdlQ29udGVudCkgLy9hZGRzIHRoZSBjb250ZW50IG9mIHBhZ2UgdG8gdGhlIGRvbVxuXG4gICAgY29uc29sZS5sb2coaGVhZGVyRWwpXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5UGFnZSIsIi8vdGhpcyBtb2R1bGUgY2FwdHVyZXMgdGhlIGRvbSBlbGVtZW50cyB0aGF0IHdpbGwgYmUgd3JpdHRlbiB0byB3aGVuIGVhY2ggcGFnZSBpcyBjYWxsZWRcblxuY29uc3QgZG9tRWxlbWVudHMgPSAoKSA9PiB7XG4gICAgY29uc3QgZG9tT2JqZWN0ID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG4gICAgICAgIFwiaGVhZGVyXCI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAkKFwiI3BhZ2UtaGVhZGVyXCIpXG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGVudFwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogJChcIiNwYWdlLWNvbnRlbnRcIilcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGRvbU9iamVjdFxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZG9tRWxlbWVudHMiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgLy9kaXNwbGF5IG5hdmlnYXRpb25cbiAgICBjb25zdCBuYXZCYXIgPSByZXF1aXJlKFwiLi9idWlsZE5hdmlnYXRpb25cIilcbiAgICBcbiAgICAvL2Rpc3BsYXkgY29udGFjdFxuICAgIGNvbnN0IGNvbnRhY3RQYWdlID0gcmVxdWlyZShcIi4vY29udGFjdC9kaXNwbGF5Q29udGFjdFwiKVxuICAgIFxuICAgIC8vZGlzcGxheSBwcm9qZWN0c1xuICAgIC8vIGNvbnN0IHByb2plY3RQYWdlID0gcmVxdWlyZShcIi4vcHJvamVjdHMvZGlzcGxheVByb2plY3RzXCIpXG4gICAgXG4gICAgLy9kaXNwbGF5IHJlc3VtZVxuICAgIFxuICAgIC8vZGlzcGxheSBibG9nXG5cblxuXG59KVxuXG4iXX0=
