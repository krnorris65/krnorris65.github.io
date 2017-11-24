
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

