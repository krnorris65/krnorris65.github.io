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

//populate project page using stored data
const storedProjectList = JSON.parse(localStorage.getItem("projectList"));
const projectsElement = document.getElementById("projects");

for (let i = 0; i < storedProjectList.length; i++) {
        let project = storedProjectList[i];
        
        projectsElement.innerHTML += `
        <article class="project">
            <h2 class="project-name">${project.name}</h2>
            <p class="project-date"><b>Date Completed:</b> ${project.date_completed}</p>
            <p class="project-tech"><b>Technologies Used:</b> ${project.technologies_used}</p>
            <p class="project-team"><b>Teammates (if applicable):</b> ${project.teammates}</p>
            <p class="project-description">${project.description}</p>
        </article>
        `
    }


    