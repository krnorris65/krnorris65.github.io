const week1 = {
    "title": "Week 1", 
    "date_of_publication": "10-06-2017",
    "week_num": "1",
    "week_dates": "October 2 - 6, 2017", 
    "tags": "celebrations, inspirations, challenges, hang-ups, personal site, javascript", 
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
    "tags": "celebrations, inspirations, challenges, hang-ups, github, javascript", 
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
            "Dealing with pushing and pulling branches in GitHub"
        ]
    }
}
const week3 = {
    "title": "Week 3", 
    "date_of_publication": "10-20-2017",
    "week_num": "3",
    "week_dates": "October 16 - 20, 2017", 
    "tags": "celebrations, inspirations, challenges, hang-ups", 
    "author": "Kristen",
    "content": {
        "celebrations": [
            "Watched NSS grad, Aimee Knight’s talk about <a href='https://www.youtube.com/watch?v=B22o_yeDE_s' target='_blank'>“Getting Comfortable with being Uncomfortable”</a>",
            "Learning how to effectively work in a group to complete a challenge (pagination) that was given the day before the project was due",
            "Getting better at commenting my code so I know what I did when I look back at it later on"
        ],
        "challenges": [
            "Understanding how to create pagination",
            "Breaking my code by forgetting a parathesis in the Colored-Reindeer exercise",
            "Remembering everything"
        ]
    }
}

//array of weekly blogs
let blogPosts = [];

blogPosts.push(week1);
blogPosts.unshift(week2);
blogPosts.unshift(week3);

//stringify for storage
let blogPostsString = JSON.stringify(blogPosts);
localStorage.setItem("blogPosts", blogPostsString);

