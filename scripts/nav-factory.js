//objects for nav bar
const home = {
    "page" : "Home",
    "link" : "../index.html"
};

const resume = {
    "page" : "Resume",
    "link" : "../resume/index.html"
};

const contact = {
    "page" : "Contact",
    "link" : "../contact/index.html"
};

const projects = {
    "page" : "Projects",
    "link" : "../projects/index.html"
};

const blog = {
    "page" : "Blog",
    "link" : "../blog/index.html"
};

//objects into one array
const navBarArray = [];

navBarArray.push(home, resume, contact, projects, blog);


//stringify to localstorage
const navBarString = JSON.stringify(navBarArray);

localStorage.setItem("navBar", navBarString); 