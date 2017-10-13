const week1 = {
    "title": "Week 1", 
    "date_of_publication": "10-06-2017",
    "week_num": "1",
    "week_dates": "October 2 - 6, 2017", 
    "tags": "celebrations, inspirations, challenges, hang-ups", 
    "author": "Kristen",
    "content": {
        "celebrations": {
            "celebration_1": "Got to see Cohort 21 present their Front-End Capstone projects", 
            "celebration_2": "Successfully set-up the framework for my personal site and connected it to GitHub",
            "celebration_3": "Was able to figure out the Overly Excited JavaScript exercise without feeling completely overwhelmed"
        },
        "challenges": {
            "challenge_1": "Remembering all of the commands for the terminal",
            "challenge_2": "Figuring out the best way to organize code",
            "challenge_3": "Not sure where to start with the Cash-to-Coin JavaScript exercise"
        }
    }
}

//array of weekly blogs
let blogPosts = [];

blogPosts.push(week1);

//stringify for storage
let blogPostsString = JSON.stringify(blogPosts);
localStorage.setItem("blogPosts", blogPostsString);

