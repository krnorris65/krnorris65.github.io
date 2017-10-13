const week1 = {
    "title": "Week 1", 
    "date of publication": "2017-10-06", 
    "tags": "celebrations, inspirations, challenges, hang-ups", 
    "author": "Kristen",
    "content": {
        "celebrations": {
            "celebration_1": "Got to see Cohort 21 present their Front-End Capstone projects", 
            "celebration_2": "Successfully set-up the framework for my personal site and connected it to GitHub",
            "celebration_3": "Was able to figure out the Overly Excited JavaScript exercise without feeling completely overwhelmed"
        },
        "challenges": {
            "challenges_1": "Remembering all of the commands for the terminal",
            "challenges_2": "Figuring out the best way to organize code",
            "challenges_3": "Not sure where to start with the Cash-to-Coin JavaScript exercise"
        }
    }
}

//array of weekly blogs
let blogPosts = [];

blogPosts.push(week1);

//stringify for storage
let blogPostsString = JSON.stringify(blogPosts);
localStorage.setItem("blogPosts", blogPostsString);

//parse to read
let storedBlogPosts = JSON.parse(localStorage.getItem("blogPosts"));

console.log(storedBlogPosts); 