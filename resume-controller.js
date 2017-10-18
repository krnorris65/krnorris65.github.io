//parse to read from storage
const storedJobList = JSON.parse(localStorage.getItem("jobList"));
const resumeElement = document.getElementById("job-history");

//loop through resume array and insert into resume.html
for (let i = 0; i < storedJobList.length; i++) {
    let currentJob = storedJobList[i];

    resumeElement.innerHTML += `
    <article class="job">
        <header>
            <h2 class="company">${currentJob.company} (${currentJob.location})</h2>
            <h2 class="title">${currentJob.position}</h2>
            <h3>${currentJob.startDate} - ${currentJob.endDate}</h3>
        </header>
        <section>
            <p>${currentJob.summary}</p>
            <p>${currentJob.responsibilities}</p>
        </section>
    </article>
    `
}
