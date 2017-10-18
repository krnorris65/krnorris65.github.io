//Job 1
const devSpecialist = {
    "company": "Monroe Harding",
    "position": "Development Specialist",
    "location": "Nashville, TN",
    "startDate": "January 2016",
    "endDate": "October 2017",
    "summary": "Offered general support to the development team.",
    "responsibilities": "Responsibilities included: tracking donations and making sure donors were properly acknowledged, assisting with marketing efforts, creating a dashboard to report fundraising and outreach progress each month, and assisted with the annual fall fundraiser."
}

//Job 2
const vetCaseManager = {
    "company": "Room In The Inn",
    "position": "Veterans Case Manager",
    "location": "Nashville, TN",
    "startDate": "May 2015",
    "endDate": "November 2015",
    "summary": "Provided case management to homeless veterans in the Veterans Per Diem program.",
    "responsibilities": "Responsibilities included: assisting with daily functions, tracking and reporting demographic information for grant purposes, creating and distributing a bi-weekly chore chart, and managing TN-WITS billing for the Guest House Recovery Program."
}

//Job 3
const caseManager = {
    "company": "Room In The Inn",
    "position": "Case Manager",
    "location": "Nashville, TN",
    "startDate": "August 2013",
    "endDate": "May 2015",
    "summary": "Provided case management to homeless individuals and families.",
    "responsibilities": "Responsibilities included: managing a caseload of over 300 homeless individuals, helping individuals acquire the necessary documents to obtain housing, maintaining our database to ensure information is properly tracked, and supporting the day-to-day operations of the activity center."
}

//Job 4
const jvOdyssey = {
    "company": "Room In The Inn",
    "position": "Jesuit Volunteer/Odyssey Assitant",
    "location": "Nashville, TN",
    "startDate": "August 2012",
    "endDate": "August 2013",
    "summary": "Helped with running a post-treatment recovery program for chronically homeless men.",
    "responsibilities": "Responsibilities included: managing volunteers, conducting daily community meetings, planning recreational activities, and leading a weekly mediation class."
}

//Job 5
const progamSupervisor = {
    "company": "Re-Member",
    "position": "Program Supervisor",
    "location": "Pine Ridge, SD",
    "startDate": "June 2012",
    "endDate": "July 2012",
    "summary": "Carried out various tasks to ensure the weekly volunteer program ran smoothly.",
    "responsibilities": "Responsibilities included: assisting the Construction Coordinators, preparing lunches, cleaning the facility and answering questions from volunteers."
}

//Array of jobs
let jobList = [];

jobList.push(devSpecialist, vetCaseManager, caseManager, jvOdyssey, progamSupervisor);

//stringify to store
const jobListString = JSON.stringify(jobList);
localStorage.setItem("jobList", jobListString);

