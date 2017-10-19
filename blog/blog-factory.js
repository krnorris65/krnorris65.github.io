const week1 = {
    "title": "Week 1", 
    "date_of_publication": "10-06-2017",
    "week_num": "1",
    "week_dates": "October 2 - 6, 2017", 
    "tags": "celebrations, inspirations, challenges, hang-ups", 
    "author": "Kristen",
    "content": {
        "celebrations": [
            "Got to see Cohort 21 present their Front-End Capstone projects", 
            "Successfully set-up the framework for my personal site and connected it to GitHub",
            "Was able to figure out the Overly Excited JavaScript exercise without feeling completely overwhelmed"
        ],
        "challenges": [
            "Remembering all of the commands for the terminal",
            "Figuring out the best way to organize code",
            "Not sure where to start with the Cash-to-Coin JavaScript exercise"
        ]
    }
}

const week2 = {
    "title": "Week 2", 
    "date_of_publication": "10-13-2017",
    "week_num": "2",
    "week_dates": "October 9 - 13, 2017", 
    "tags": "celebrations, inspirations, challenges, hang-ups", 
    "author": "Kristen",
    "content": {
        "celebrations": [
            "Finally figured out how to get the Cash-to-Coin exercise to work", 
            "Created a dynamic navigation bar for group project",
            "Successfully created a group website using GitHub"
        ],
        "challenges": [
            "Figuring out how to include embedded Google Maps into the Contact Page of our group project",
            "Managed to accidently pull someone else’s branch into my feature branch",
            "All that is GitHub"
        ]
    }
}

//array of weekly blogs
let blogPosts = [];

blogPosts.push(week1);
blogPosts.unshift(week2);

//stringify for storage
let blogPostsString = JSON.stringify(blogPosts);
localStorage.setItem("blogPosts", blogPostsString);

