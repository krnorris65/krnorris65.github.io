const firebase = require("firebase")


const observer = Object.create(null, {
    "init": {
        value: function (authUser){
            firebase
                .auth()
                .onAuthStateChanged(function(user) {
                    if (user) {
                        authUser.activeUser = user
                        $("#auth-login").append("<span>logged in!</span>")
                    } else {
                        authUser.activeUser = null
                    }
                });
        }
    }

})

module.exports = observer