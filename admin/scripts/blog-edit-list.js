// const editContent = require("./blog-edit-button")
const editEl = document.getElementById("blog_editContent")
const blogDatabase = JSON.parse(localStorage.getItem("adminDatabase")).blog; //getting blog info

//if there are blogs in local storage, then display their title in the Edit Blog section with an edit button (sort by id). 

if(blogDatabase.length > 0) {
    const eHeaderEl = document.createElement("h1")
    const eHeaderTxt = document.createTextNode("Edit an Existing Blog")

    eHeaderEl.appendChild(eHeaderTxt)
    editEl.appendChild(eHeaderEl)
    editEl.classList.add("hideContent")

    let blogString = ""

    const displayBlogList = blogDatabase.sort(
        (a, b) => {
            return b.id - a.id
        }
    ).forEach( blog => {
        
        
        const blogList = document.createElement("li")
        blogList.appendChild(document.createTextNode(`${blog.title} `))

        const editButton = document.createElement("button")
        editButton.appendChild(document.createTextNode("Edit"))
        editButton.id = "edit_" + `${blog.id}`

        blogList.appendChild(editButton)
        editEl.appendChild(blogList)



    })

    editEl.innerHTML += blogString
}