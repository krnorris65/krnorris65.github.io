//controls how the content is written to the dom for blog page
const blogFilter = require("../pageFilter")
const blogContent = require("./blogContent")

const blogDOM = () => {
    return $.ajax({
        "url": "./data/database.json",
        "method": "GET"
    }).then(
        blogDb => {
            return blogFilter(blogDb.blog, blogContent)
        }
    )

}

module.exports = blogDOM

// "https://personal-site-cf1b8.firebaseio.com/blog.json"