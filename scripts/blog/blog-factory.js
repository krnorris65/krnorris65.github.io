// generator to create unique ids for each blog
const blogIdGenerator = function* () {
    let uniqueId = 1

    while (true) {
        yield uniqueId
        uniqueId += 1
    }
}

// instance of generator
const blogIdFactory = blogIdGenerator()

// Factory function that returns a blog article object
const newBlogObject = function (title, published, week_dates, author, celebrations, challenges, ...tags) {
    return Object.create(null, {
        "id": { value: blogIdFactory.next().value, enumerable: true },
        "title": { value: title, enumerable: true },
        "published": { value: published, enumerable: true },
        "week_dates": { value: week_dates, enumerable: true }, 
        "author": { value: author, enumerable: true },
        "celebrations": { value: celebrations, enumerable: true },
        "challenges": { value: challenges, enumerable: true },
        "tags": { value: tags, enumerable: true }
    })
}

// using the factory function to produce weekly blog articles
const week1 = newBlogObject("Week 1", "10-06-2017", "October 2 - 6, 2017", "Kristen Norris",
    [
        "Got to see Cohort 21 present their Front-End Capstone projects", 
        "Successfully set-up the framework for my personal site and connected it to GitHub",
        "Was able to figure out the Overly Excited JavaScript exercise without feeling completely overwhelmed"
    ], [
        "Remembering all of the commands for the terminal",
        "Figuring out the best way to organize code",
        "Not sure where to start with the Cash-to-Coin JavaScript exercise"
    ], 
     "personal site", "javascript"
);

const week2 = newBlogObject("Week 2", "10-13-2017", "October 9 - 13, 2017", "Kristen Norris", 
    [
        "Finally figured out how to get the Cash-to-Coin exercise to work", 
        "Created a dynamic navigation bar for group project",
        "Successfully created a group website using GitHub"
    ], [
        "Figuring out how to include embedded Google Maps into the Contact Page of our group project",
        "Managed to accidently pull someone else’s branch into my feature branch",
        "Dealing with pushing and pulling branches in GitHub"
    ], 
     "github", "javascript" 
);

const week3 = newBlogObject("Week 3", "10-20-2017", "October 16 - 20, 2017", "Kristen Norris",
    [
        "Watched NSS grad, Aimee Knight’s talk about <a href='https://www.youtube.com/watch?v=B22o_yeDE_s' target='_blank'>“Getting Comfortable with being Uncomfortable”</a>",
        "Learning how to effectively work in a group to complete a challenge (pagination) that was given the day before the project was due",
        "Getting better at commenting my code so I know what I did when I look back at it later on"
    ], [
        "Understanding how to create pagination",
        "Breaking my code by forgetting a parenthesis in the Colored-Reindeer exercise",
        "Remembering everything"
    ], 
     "pagination", "NSS grad"
)

//array of weekly blogs
let blogPosts = [];

//adding blogs to the array
blogPosts.push(week1);
blogPosts.unshift(week2);
blogPosts.unshift(week3);

//stringify for storage
let blogPostsString = JSON.stringify(blogPosts);
localStorage.setItem("blogPosts", blogPostsString);



