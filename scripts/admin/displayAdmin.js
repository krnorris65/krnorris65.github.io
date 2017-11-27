// const admin = require("firebase-admin")
// const serviceAccount = require("../admin/personal-site-firebaseAdmin.json")

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://personal-site-cf1b8.firebaseio.com"
// });

const displayPage = require("../displayPage")
const blogForm = require("./blogForm")

const displayAdmin = () => {


    const adminHeader = "<h1>Create a Blog Post</h1>"
    displayPage(adminHeader, blogForm)

}
module.exports = displayAdmin