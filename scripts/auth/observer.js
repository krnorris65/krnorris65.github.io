const firebase = require("firebase")


const observer = Object.create(null, {
    "init": {
        value: function (authUser){
            firebase
                .auth()
                .onAuthStateChanged(function(user) {
                    if (user) {
                        authUser.activeUser = user
                        alert("logged in!")
                    } else {
                        authUser.activeUser = null
                    }
                });
        }
    }

})

module.exports = observer