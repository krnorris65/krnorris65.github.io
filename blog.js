const week1 = {
    "title": "Week 1", 
    "date of publication": "2017-10-06", 
    "tags": "celebrations, inspirations, challenges, hang-ups", 
    "author": "Kristen",
    "content": ""
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