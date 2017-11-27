const displayPage = require("../displayPage")
const blogForm = require("./blogForm")

const displayAdmin = () => {


    const adminHeader = "<h1>Create a Blog Post</h1>"
    displayPage(adminHeader, blogForm)

}
module.exports = displayAdmin