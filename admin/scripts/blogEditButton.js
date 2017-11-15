// When the user clicks the edit link, then it will display that blog with a save button. when the blog is displayed, the contenteditable will be changed to true and 

const editBlog = (event) => {

    const idBlogEdit = parseInt(
        Array.from(event.target.classList)
            .find(editClass => {
                if(editClass.startsWith("edit_")) return editClass
            })
            .split("_")[1]
    ) //gets the class of 

    console.log(idBlogEdit)
}

// module.exports = editBlog