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
    contactPage()

    

    

    

    
    //display projects
    // const projectPage = require("./projects/displayProjects")
    
    //display resume
    
    //display blog



})


},{"./buildNavigation":1,"./contact/displayContact":3}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2J1aWxkTmF2aWdhdGlvbi5qcyIsInNjcmlwdHMvY29udGFjdC9jb250YWN0Q29udHJvbGxlci5qcyIsInNjcmlwdHMvY29udGFjdC9kaXNwbGF5Q29udGFjdC5qcyIsInNjcmlwdHMvZGlzcGxheVBhZ2UuanMiLCJzY3JpcHRzL2RvbUVsZW1lbnRzLmpzIiwic2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IG5hdmlnYXRpb24gPSBbXG4gICAge1xuICAgICAgICBcImRpc3BsYXlcIjogXCJIb21lXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiUmVzdW1lXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiQ29udGFjdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcIlByb2plY3RzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiQmxvZ1wiXG4gICAgfVxuXVxuXG5jb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtaXRlbXNcIik7XG5cbmNvbnN0IG5hdkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcblxubmF2aWdhdGlvbi5mb3JFYWNoKFxuICAgIHBhZ2UgPT4ge1xuICAgICAgICBjb25zdCBuYXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKVxuICAgICAgICBuYXZFbC5jbGFzc0xpc3QuYWRkKFwibmF2TGlua1wiKVxuXG4gICAgICAgIGNvbnN0IG5hdkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKVxuICAgICAgICBuYXZMaW5rLmhyZWYgPSBcIiNcIlxuICAgICAgICBuYXZMaW5rLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBhZ2UuZGlzcGxheSkpXG5cbiAgICAgICAgbmF2RWwuYXBwZW5kQ2hpbGQobmF2TGluaylcbiAgICAgICAgbmF2TGlzdC5hcHBlbmRDaGlsZChuYXZFbClcbiAgICB9XG4pXG5uYXZFbGVtZW50LmFwcGVuZENoaWxkKG5hdkxpc3QpXG5cbm1vZHVsZS5leHBvcnRzID0gbnVsbCIsIi8vZ2VuZXJhdGVzIGNvbnRlbnQgZm9yIGNvbnRhY3QgcGFnZVxuY29uc3QgY29udGFjdENvbnRlbnQgPSAoKSA9PiB7XG5cbiAgICByZXR1cm4gJC5hamF4KHsgLy9uZWVkIHRvIHJldHVybiBhamF4IGZ1bmN0aW9uIHNvIHRoYXQgY29udGFjdENvbnRlbnQgY2FuIGFjY2VzcyB0aGUgc3RyaW5nIHJldHVybmVkIGluIC50aGVuKClcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL3BlcnNvbmFsLXNpdGUtY2YxYjguZmlyZWJhc2Vpby5jb20vY29udGFjdC5qc29uXCIsXG4gICAgICAgIFwibWV0aG9kXCI6IFwiR0VUXCJcbiAgICB9KVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAgIGNvbnRhY3REYiA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRhY3RTdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgLy9idWlsZHMgY29udGFjdCBieSBlbWFpbCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNvbnRhY3RcIj5TZW5kIGFuIGVtYWlsOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBpZD1cInNlbmQtZW1haWxcIj4gXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJlbWFpbFwiPjxhIGhyZWY9XCJtYWlsdG86JHtjb250YWN0RGIuZW1haWx9XCI+JHtjb250YWN0RGIuZW1haWx9PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIC8vYnVpbGRzIGNvbnRhY3QgdGhyb3VnaCBzb2NpYWwgc2VjdGlvblxuICAgICAgICAgICAgICAgIGNvbnRhY3RTdHJpbmcgKz0gYFxuICAgICAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjb250YWN0XCI+Q29ubmVjdCBvbiBzb2NpYWwgbWVkaWE6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGlkPVwic29jaWFsLW1lZGlhXCI+XG4gICAgICAgICAgICBgXG5cbiAgICAgICAgICAgICAgICAvL2l0ZXJhdGVzIHRocm91Z2ggZWFjaCBzb2NpYWwgc2l0ZVxuICAgICAgICAgICAgICAgIGNvbnRhY3REYi5zb2NpYWwuZm9yRWFjaChzaXRlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFjdFN0cmluZyArPSBgXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInNvY2lhbFwiPjxhIGhyZWY9XCIke3NpdGUudXJsfVwiPiR7c2l0ZS5zZXJ2aWNlfTwvYT48L2xpPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgLy9jbG9zaW5nIHRhZ3MgZm9yIHVub3JkZXJlZCBsaXN0IGFuZCBjb250YWN0IHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjb250YWN0U3RyaW5nICs9IGBcbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIGBcblxuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWN0U3RyaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb250YWN0Q29udGVudCIsIi8vdGhpcyBtb2R1bGUgd2lsbCBkaXNwbGF5IGNvbnRhY3QgaW5mb3JtYXRpb25cblxuY29uc3QgZGlzcGxheVBhZ2UgPSByZXF1aXJlKFwiLi4vZGlzcGxheVBhZ2VcIilcbmNvbnN0IGNvbnRhY3RDb25lbnQgPSByZXF1aXJlKFwiLi9jb250YWN0Q29udHJvbGxlclwiKVxuXG5jb25zdCBkaXNwbGF5Q29udGFjdCA9ICgpID0+IHtcbiAgICBjb250YWN0Q29uZW50KCkudGhlbihjb250YWN0U3RyaW5nID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbnRhY3RIZWFkZXIgPSBcIjxoMT5Db250YWN0IE1lPC9oMT5cIlxuICAgICAgICBjb25zdCBjb250YWN0SW5mbyA9IGNvbnRhY3RTdHJpbmdcbiAgICAgICAgXG4gICAgICAgIGRpc3BsYXlQYWdlKGNvbnRhY3RIZWFkZXIsIGNvbnRhY3RJbmZvKSAvL2Rpc3BsYXlQYWdlIG5lZWRzIHRvIGJlIHdpdGhpbiB0aGUgY29udGFjdENvbnRlbnQoKS50aGVuIGJlY2F1c2UgaXQgaXMgZGVwZW5kZW50IG9uIHRoZSBzdHJpbmcgdGhhdCBpcyByZXR1cm5lZCB3aGVuIHRoZSB0aGVuIGZ1bmN0aW9uIHJ1bnNcbiAgICAgICAgXG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5Q29udGFjdCIsImNvbnN0IGRvbUVsID0gcmVxdWlyZShcIi4vZG9tRWxlbWVudHNcIilcblxuY29uc3Qgb3V0cHV0RWwgPSBkb21FbCgpXG5cbmNvbnN0IGRpc3BsYXlQYWdlID0gKHBhZ2VIZWFkZXIsIHBhZ2VDb250ZW50KSA9PiB7XG5cbiAgICBjb25zdCBoZWFkZXJFbCA9IG91dHB1dEVsLmhlYWRlclxuICAgIFxuICAgIGhlYWRlckVsLmh0bWwocGFnZUhlYWRlcikgLy9hZGRzIHRoZSBwYWdlIGhlYWRlciB0byB0aGUgZG9tXG5cbiAgICBjb25zdCBjb250ZW50RWwgPSBvdXRwdXRFbC5jb250ZW50XG4gICAgXG4gICAgY29udGVudEVsLmh0bWwocGFnZUNvbnRlbnQpIC8vYWRkcyB0aGUgY29udGVudCBvZiBwYWdlIHRvIHRoZSBkb21cblxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGxheVBhZ2UiLCIvL3RoaXMgbW9kdWxlIGNhcHR1cmVzIHRoZSBkb20gZWxlbWVudHMgdGhhdCB3aWxsIGJlIHdyaXR0ZW4gdG8gd2hlbiBlYWNoIHBhZ2UgaXMgY2FsbGVkXG5cbmNvbnN0IGRvbUVsZW1lbnRzID0gKCkgPT4ge1xuICAgIGNvbnN0IGRvbU9iamVjdCA9IE9iamVjdC5jcmVhdGUobnVsbCwge1xuICAgICAgICBcImhlYWRlclwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogJChcIiNwYWdlLWhlYWRlclwiKVxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRlbnRcIjoge1xuICAgICAgICAgICAgdmFsdWU6ICQoXCIjcGFnZS1jb250ZW50XCIpXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBkb21PYmplY3Rcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUVsZW1lbnRzIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIC8vZGlzcGxheSBuYXZpZ2F0aW9uXG4gICAgY29uc3QgbmF2QmFyID0gcmVxdWlyZShcIi4vYnVpbGROYXZpZ2F0aW9uXCIpXG4gICAgXG4gICAgLy9kaXNwbGF5IGNvbnRhY3RcbiAgICBjb25zdCBjb250YWN0UGFnZSA9IHJlcXVpcmUoXCIuL2NvbnRhY3QvZGlzcGxheUNvbnRhY3RcIilcbiAgICBjb250YWN0UGFnZSgpXG5cbiAgICBcblxuICAgIFxuXG4gICAgXG5cbiAgICBcbiAgICAvL2Rpc3BsYXkgcHJvamVjdHNcbiAgICAvLyBjb25zdCBwcm9qZWN0UGFnZSA9IHJlcXVpcmUoXCIuL3Byb2plY3RzL2Rpc3BsYXlQcm9qZWN0c1wiKVxuICAgIFxuICAgIC8vZGlzcGxheSByZXN1bWVcbiAgICBcbiAgICAvL2Rpc3BsYXkgYmxvZ1xuXG5cblxufSlcblxuIl19
