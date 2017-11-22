$(document).ready(function () {
    //display navigation
    const navBar = require("./buildNavigation")
    
    //display contact
    const contactPage = require("./contact/displayContact")
    $(".nav_contact").on("click", contactPage)
    
    
    //display projects
    const projectPage = require("./projects/displayProjects")
    $(".nav_projects").on("click", projectPage)
    // projectPage()
    
    //display resume
    const resumePage = require("./resume/displayResume")
    $(".nav_resume").on("click", resumePage)
    // resumePage()
    
    //display blog
    const blogPage = require("./blog/displayBlogs")
    $(".nav_blog").on("click", blogPage)


})

