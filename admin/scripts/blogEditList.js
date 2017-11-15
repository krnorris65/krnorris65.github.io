// const editContent = require("./blog-edit-button")
const editEl = document.getElementById("blog_editContent")
const blogDatabase = JSON.parse(localStorage.getItem("adminDatabase")).blog; //getting blog info

//if there are blogs in local storage, then display their title in the Edit Blog section with an edit button (sort by id). 

if(blogDatabase.length > 0) {
    // adds header text to edit blog section
    const eHeaderEl = document.createElement("h1")
    const eHeaderTxt = document.createTextNode("Edit an Existing Blog")
    eHeaderEl.appendChild(eHeaderTxt)
    editEl.appendChild(eHeaderEl)
    editEl.classList.add("hideContent") //remove class that hides element

    //creates an unordered list for the list of blogs
    const blogListEl = document.createElement("ul")
    editEl.appendChild(blogListEl)
    
    //iterates through existing blogs and adds them to the the blog list with an edit button
    const displayBlogList = blogDatabase
        .sort((a, b) => b.id - a.id) //have most recent blog on top
        .forEach( blog => {
        
        const blogItem = document.createElement("li")
        blogItem.appendChild(document.createTextNode(`${blog.title} `))

        const editButton = document.createElement("button")
        editButton.appendChild(document.createTextNode("Edit"))
        editButton.id = "edit_" + `${blog.id}`

        blogItem.appendChild(editButton)
        blogListEl.appendChild(blogItem)

    })

}