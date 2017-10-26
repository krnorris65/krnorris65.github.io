const personalSite = {
    "name": "Personal Site", 
    "date_completed": "in progress", 
    "technologies_used": "HTML, CSS, JS", 
    "teammates": "n/a",
    "description": "description of project" 
}

//array of projects
let projectsList = [];

projectsList.push(personalSite);

//stringify for storage
const projectListString = JSON.stringify(projectsList);
localStorage.setItem("projectList", projectListString);




    