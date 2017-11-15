//populate project page using stored data
const projectDatabase = JSON.parse(localStorage.getItem("projectList"));
const projectItems = projectDatabase.length
const projectsEl = document.getElementById("projects");

//loop through projects array and insert them into projects.html
const updateDOM = (itemArray) => {
    itemArray.forEach(
        function(currentProject) {
            let finalProjectString = ""

            finalProjectString += `
            <article class="project">
                <h2 class="project-name">${currentProject.name}</h2>
                <p class="project-date"><b>Date Completed:</b> ${currentProject.date_completed}</p>
                <p class="project-tech"><b>Technologies Used:</b> ${currentProject.technologies_used}</p>
                <p class="project-team"><b>Teammates (if applicable):</b> ${currentProject.teammates}</p>
                <p class="project-description">${currentProject.description}</p>
            </article>
            `
            projectsEl.innerHTML += finalProjectString
        }
    )
}


if (projectItems > 0) {
    updateDOM(projectDatabase) //loads all projects on page load

    document.querySelector("input[name='projectsFilter']").addEventListener(
        "keyup",
        event => {
            if(event.target.value.length >= 3) {
                //convert what is being filtered to lowercase
                const userFilterString = event.target.value.toLowerCase()

                const projectFilter = projectDatabase.filter(filteredProject => {
                        return filteredProject.name.toLowerCase().includes(userFilterString) ||
                        filteredProject.description.toLowerCase().includes(userFilterString)
                    }
                )

                if(projectFilter.length === 0) {
                    projectsEl.innerHTML = `
                        <h3>Search Results Not Found</h3>
                    `
                } else {
                    projectsEl.innerHTML = " "
                    updateDOM(projectFilter)

                }
            } else {
                projectsEl.innerHTML = " "
                updateDOM(projectDatabase)
            }
        }
    )
}
