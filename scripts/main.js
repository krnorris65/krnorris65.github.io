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

