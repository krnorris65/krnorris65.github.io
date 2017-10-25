const newBlogObject = function (title, published, week_dates, author, celebrations, challenges) {
    return Object.create(null, {
        // "id": { value: blogIdFactory.next().value, enumerable: true },
        "title": { value: title, enumerable: true },
        "published": { value: published, enumerable: true },
        "week_dates": { value: week_dates, enumerable: true }, 
        "author": { value: author, enumerable: true },
        "celebrations": { value: celebrations, enumerable: true },
        "challenges": { value: challenges, enumerable: true },
        // "tags": { value: tags, enumerable: true }

    })
}

const newBlogEl = document.getElementById("form_new-blog");
const submitButton = document.getElementById("button_submit-blog");

const adminDatabase = JSON.parse(localStorage.getItem("adminBlogPosts")) || {}
let adminBlogArray = []

submitButton.addEventListener("click", function() {
    //values of form elements
    const titleVal = document.getElementById("form_title").value
    const publishedVal = document.getElementById("form_published").value
    const weekVal = document.getElementById("form_week").value
    const authorVal = document.getElementById("form_author").value
    const celebrationsArray = []
    const celebrationsVal = document.querySelectorAll("input[name='celebration']").forEach( input => {
        celebrationsArray.push(input.value)
    })  //gets all celebrations and puts them into an array
    const challengesArray = []
    const challengesVal = document.querySelectorAll("input[name='challenge']").forEach( input => {
        challengesArray.push(input.value)
    }) //gets all challenges and puts them into an array
    
    const createBlog = newBlogObject(titleVal, publishedVal, weekVal, authorVal, celebrationsArray, challengesArray) //takes the values of the form elements and puts them into the newBlogObjectFunction
    
    adminBlogArray.unshift(createBlog)

    let adminBlogPostsString = JSON.stringify(adminBlogArray);
    localStorage.setItem("adminBlogPosts", adminBlogPostsString);

    console.log(JSON.parse(localStorage.getItem("adminBlogPosts")))
})

