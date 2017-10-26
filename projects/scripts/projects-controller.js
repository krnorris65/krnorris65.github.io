//populate project page using stored data
const storedProjectList = JSON.parse(localStorage.getItem("projectList"));
const projectsElement = document.getElementById("projects");

//loop through projects array and insert them into projects.html
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