//Job 1
const devSpecialist = {
    "company": "Monroe Harding",
    "position": "Development Specialist",
    "location": "Nashville, TN",
    "startDate": "January 2016",
    "endDate": "October 2017"
}

//Job 2
const vetCaseManager = {
    "company": "Room In The Inn",
    "position": "Veterans Case Manager",
    "location": "Nashville, TN",
    "startDate": "May 2015",
    "endDate": "November 2015"
}

//Job 3
const caseManager = {
    "company": "Room In The Inn",
    "position": "Case Manager",
    "location": "Nashville, TN",
    "startDate": "August 2013",
    "endDate": "May 2015"
}

//Job 4
const jvOdyssey = {
    "company": "Room In The Inn",
    "position": "Jesuit Volunteer/Odyssey Assitant",
    "location": "Nashville, TN",
    "startDate": "August 2012",
    "endDate": "August 2013"
}

//Job 5
const progamSupervisor = {
    "company": "Re-Member",
    "position": "Program Supervisor",
    "location": "Pine Ridge, SD",
    "startDate": "June 2012",
    "endDate": "July 2012"
}

//Array of jobs
let jobList = [];

jobList.push(devSpecialist, vetCaseManager, caseManager, jvOdyssey, progamSupervisor);

//stringify
const jobListString = JSON.stringify(jobList);
localStorage.setItem("jobList", jobListString);

//parse
const storedJobList = JSON.parse(localStorage.getItem("jobList"));

console.log(storedJobList);