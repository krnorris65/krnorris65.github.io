const personalSite = {
    "name": "Personal Site", 
    "date completed": "in progress", 
    "technologies used": "HTML, CSS", 
    "teammates": "n/a" 
}

//array of projects
let projectList = [];

projectList.push(personalSite);

//stringify
const projectListString = JSON.stringify(projectList);
localStorage.setItem("projectList", projectListString);

//parse
const storedProjectList = JSON.parse(localStorage.getItem("projectList"));