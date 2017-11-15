const editEl = document.getElementById("blog_editContent")
const blogDatabase = JSON.parse(localStorage.getItem("adminDatabase")).blog; //getting blog info

//if there are blogs in local storage, then display their title in the Edit Blog section with an edit button (sort by id). 

if(blogDatabase.length > 0) {
    const editBlog = document.createElement("h1")
    const blogHeader = document.createTextNode("Edit an Existing Blog")

    editBlog.appendChild(blogHeader)
    editEl.appendChild(editBlog)
    editEl.classList.add("hideContent")

    let blogString = ""

    const displayBlogList = blogDatabase.sort(
        (a, b) => {
            return b.id - a.id
        }
    ).forEach( blog => {
        blogString += `
            <li>${blog.title} <a id="edit_${blog.id}"href="#">Edit</a></li>

        `
    })

    editEl.innerHTML += blogString
}