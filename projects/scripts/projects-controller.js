//populate project page using stored data
const projectDatabase = JSON.parse(localStorage.getItem("projectList"));
const projectsEl = document.getElementById("projects");

//loop through projects array and insert them into projects.html
for (let i = 0; i < projectDatabase.length; i++) {
        let project = projectDatabase[i];
        
        projectsEl.innerHTML += `
        <article class="project">
            <h2 class="project-name">${project.name}</h2>
            <p class="project-date"><b>Date Completed:</b> ${project.date_completed}</p>
            <p class="project-tech"><b>Technologies Used:</b> ${project.technologies_used}</p>
            <p class="project-team"><b>Teammates (if applicable):</b> ${project.teammates}</p>
            <p class="project-description">${project.description}</p>
        </article>
        `
}

