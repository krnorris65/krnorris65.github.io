//pulls current info from local storage
const adminDatabase = JSON.parse(localStorage.getItem("adminDatabase")) || {}

//add key of blog if doesnt exist create an empty array
adminDatabase.blog = adminDatabase.blog || []


//id generator
const blogIdGenerator = function* (num) {
    let id = 1
    while (true) {
        yield num + id
        id++
    }
}
//get the id of the last blog object, if there is no last blog object set the id to 0
const lastId = adminDatabase.blog[0] || { id: 0 }
const blogIdFactory = blogIdGenerator(lastId.id) //takes the value of the last blog id and runs it through the generator function


//object to create a new blog object
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

const resetValues = function() {
    const titleValReset = document.getElementById("form_title").value=""
    const publishedValReset = document.getElementById("form_published").value=""
    const weekValReset = document.getElementById("form_week").value=""
    const celebrationsValReset = document.querySelectorAll("input[name='celebration']").forEach( input => {
        input.value=""
    }) 
    const challengesValReset = document.querySelectorAll("input[name='challenge']").forEach( input => {
        input.value=""
    })
    const tagsValReset = document.getElementById("form_tags").value=""
}

//gets submit button
const submitButton = document.getElementById("button_submit-blog");
const clearButton = document.getElementById("button_clear-blog");

//when even button is clicked, capture the information the user entered, create a blog object, add it to the beginning of the blog array(unshift), stringify and save to local storage
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
    const tagsVal = document.getElementById("form_tags").value
    
    const createBlog = newBlogObject(titleVal, publishedVal, weekVal, authorVal, celebrationsArray, challengesArray, tagsVal.split(",")) //takes the values of the form elements and puts them into the newBlogObjectFunction
    
    adminDatabase.blog.unshift(createBlog)

    localStorage.setItem("adminDatabase", JSON.stringify(adminDatabase));
    
    //clears form
    resetValues()

})

clearButton.addEventListener("click", resetValues)

