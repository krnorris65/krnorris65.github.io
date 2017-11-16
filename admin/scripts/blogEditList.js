// const editContent = require("./blogEditButton")
const editEl = document.getElementById("blog_editContent")
const blogDatabase = JSON.parse(localStorage.getItem("adminDatabase")).blog; //getting blog info

//if there are blogs in local storage, then display their title in the Edit Blog section with an edit button (sort by id). 


const editContent = (event) => {
    
        const idBlogEdit = parseInt(
            Array.from(event.target.classList)
                .find(editClass => {
                    if(editClass.startsWith("edit_")) return editClass
                })
                .split("_")[1]
        ) //gets the class of 
    
        const editThis = blogDatabase.filter( cblog => idBlogEdit === cblog.id)[0]
        console.log(editThis)

        const blogListEl = document.getElementById("blogList")
        
        blogListEl.innerHTML = ""

        const displayEditBlog = eBlog => { 
            let editBlogString = ""
            
            editBlogString += `
                <!-- Beginning of Blog Post ${eBlog.title} -->
                <article id="blog-${eBlog.id}" class="blog" contenteditable="true">
                <header>
                <h2 class="weekNum">${eBlog.title}</h2>
                <p class="weekDate">${eBlog.week_dates}</p>
                </header>
                
                <section>
                <h3>Celebrations & Inspirations</h3>
                <ul>`
        
            //iterates over celebration array
            eBlog.celebrations.forEach(celebration => {
                editBlogString += `<li>${celebration}</li>`;
            })
            
            editBlogString += `
                </ul>
                </section>
                
                <section>
                <h3>Challenges & Hang-Ups</h3>
                <ul>`
            
            //iterates over challenges array
            eBlog.challenges.forEach(challenge => {
                editBlogString += `<li>${challenge}</li>`;
            })
            
            editBlogString += `
                </ul>
                </section>
                
                <footer>
                <span>Posted by ${eBlog.author} on ${eBlog.published}</time></span>
                </footer>
                <!-- End of Blog Post ${eBlog.week_num} -->
                `
            //update DOM
            blogListEl.innerHTML += editBlogString;
        }

        displayEditBlog(editThis)


}


if(blogDatabase.length > 0) {
    // adds header text to edit blog section
    const eHeaderEl = document.createElement("h1")
    const eHeaderTxt = document.createTextNode("Edit an Existing Blog")
    eHeaderEl.appendChild(eHeaderTxt)
    editEl.appendChild(eHeaderEl)
    editEl.classList.add("hideContent") //remove class that hides element

    //creates an unordered list for the list of blogs
    const blogListEl = document.createElement("ul")
    blogListEl.id = "blogList"
    editEl.appendChild(blogListEl)
    
    //iterates through existing blogs and adds them to the the blog list with an edit button
    const displayBlogList = blogDatabase
        .sort((a, b) => b.id - a.id) //have most recent blog on top
        .forEach( blog => {
        
        const blogItem = document.createElement("li")
        blogItem.appendChild(document.createTextNode(`${blog.title} `))

        const editButton = document.createElement("button")
        editButton.appendChild(document.createTextNode("Edit"))
        editButton.className = "edit_" + `${blog.id}`
        editButton.addEventListener("click", editContent)

        blogItem.appendChild(editButton)
        blogListEl.appendChild(blogItem)

    })

}