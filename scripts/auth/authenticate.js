const firebase = require("firebase")
const observer = require("./observer")

let config = {
    apiKey: "AIzaSyAG02bCF_4PbwXP9Y7sse2MNoFk6lkeCtU",
    authDomain: "personal-site-cf1b8.firebaseapp.com",
    databaseURL: "https://personal-site-cf1b8.firebaseio.com",
    projectId: "personal-site-cf1b8",
    storageBucket: "personal-site-cf1b8.appspot.com",
    messagingSenderId: "179421668219"
};

const authUser = Object.create(null, {
    "activeUser": {
        value: null,
        writable: true
    },
    "init": {
        value: function () {
            firebase.initializeApp(config)

            //when login button clicked, pass the values of the email and password fields into the firebase validate function
            $("#auth-submit").on("click", event => {
                this.validate(
                    $("#auth-email").val(), //gets value of email input
                    $("#auth-pass").val() //gets value of password input
                )

                //clear form
                $("#auth-email").val("")
                $("#auth-pass").val("")
            })

            observer.init(this)
        }
            
    },
    "validate": { //from firebase documentation to validate the user login
        value: function(email, password){
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(function(error) {
                    const errorCode = error.code
                    const errorMessage = error.message

                    alert("Invalid email or password")

                });
        }
    },
    "signOut": { //from firebase documentation to logout the user
        value: function () {
            firebase
                .auth()
                .signOut()
                .then(function() {
                    // Sign-out successful.
                }).catch(function(error) {
                    // An error happened.
                });
        }
    }
})

module.exports = authUser

