//this javascript file gives functionlity to the buttons within the Create Blog Form
const adminLogin = {
    "username": "Kristen",
    "password": "nssblog"
}

const loginButton = document.getElementById("blog_login_submit")
const usernameEl = document.getElementById("blog_username")
const passwordEl = document.getElementById("blog_password")

const submitLogin = () => {
    if(usernameEl.value === adminLogin.username && passwordEl.value === adminLogin.password) {
        const blogFormEl = document.getElementById("blog_form")
        const loginEl = document.getElementById("blog_login")
        loginEl.style.visibility = "hidden"
        blogFormEl.style.visibility = "visible"
    } else {
        usernameEl.value = ""
        passwordEl.value = ""
        alert("Login Not Valid")
    }
}

loginButton.addEventListener("click", submitLogin)

//generator function to create a unique id for the celebration/challenge created by user. starts at 2 since the first input is already on the page
const inputIdGen = function* () {
    let id = 2
    
    while (true) {
        yield id
        id += 1
    }
}
//instances of generator function
const celebrationIdFactory = inputIdGen()
const challengeIdFactory = inputIdGen()

//get add celebration/challenge button
const celebrationButton = document.getElementById("add-celebration")
const challengeButton = document.getElementById("add-challenge")

//get celebration/challenge elements
const celebrationEl = document.getElementById("form_celebrations")
const challengeEl = document.getElementById("form_challenges")

//celebration DOM string
const celebrationInput = function() {
    const celebrationId = celebrationIdFactory.next().value //next value of generator function
    
    const newCelSection = document.createElement("section") //create new celebration input section
    newCelSection.id= `form_celebration_${celebrationId}` //add id to section
    
    const newCelInput = document.createElement("input") //create input
    newCelInput.type = "text" //add type to input
    newCelInput.name = "celebration" //add name to input
    
    
    const newCelRemoveButton = document.createElement("button") //create remove button
    newCelRemoveButton.id = `remove_celebration_${celebrationId}` //add id to button
    newCelRemoveButton.appendChild(document.createTextNode("Remove")) //add text to button

    newCelSection.appendChild(newCelInput) //append input to section

    newCelSection.appendChild(newCelRemoveButton) //append button to section
    
    celebrationEl.appendChild(newCelSection)//append section to element
}


//challenges DOM string
const challengeInput = function() {
    const challengeId = challengeIdFactory.next().value //next value of generator function
    
    const newChalSection = document.createElement("section") //create challenge input new section
    newChalSection.id= `form_challenge_${challengeId}` //add id to section
    
    const newChalInput = document.createElement("input") //create input
    newChalInput.type = "text" //add type to input
    newChalInput.name = "challenge" //add name to input
    
    
    const newChalRemoveButton = document.createElement("button") //create remove button
    newChalRemoveButton.id = `remove_challenge_${challengeId}` //add id to button
    newChalRemoveButton.appendChild(document.createTextNode("Remove")) //add text to button

    newChalSection.appendChild(newChalInput) //append input to section

    newChalSection.appendChild(newChalRemoveButton) //append button to section
    
    challengeEl.appendChild(newChalSection)//append section to element
}


// //functionality to add celebration/challenge button. it is known that the id will start with 'add-'
const addButton = function(event) {
    const idOfAddButtonClicked = event.target.id //gets id of button clicked
    const addButtonType = idOfAddButtonClicked.split("-")[1] //get type 'celebration' or 'challenge'. the beginning of both buttons is "add-"
        if(addButtonType === "celebration") { //if type is celebration insert
            celebrationInput()
        } if(addButtonType === "challenge") {
            challengeInput()
        }
}

//functionality to remove button
const removeButton = function(event) {
    const idOfRemoveButtonClicked = event.target.id
    if(idOfRemoveButtonClicked.startsWith("remove_")) {
        const buttonType = idOfRemoveButtonClicked.split("_")[1] //get type 'celebration' or 'challenge'
        const buttonIdNum = idOfRemoveButtonClicked.split("_")[2] //split string to get number from id
        if(buttonType === "celebration") { //if type 'celebration' 
            const celebrationSection = document.getElementById("form_celebration_" + buttonIdNum) //get that celebration input section
            celebrationEl.removeChild(celebrationSection) //remove that celebration input section
        } if(buttonType === "challenge") { //if type 'challenge'
            const challengeSection = document.getElementById("form_challenge_" + buttonIdNum) //get that challenge input section
            challengeEl.removeChild(challengeSection) //remove that challenge input section
        }
    }
}

//add eventListener to both celebration and challenge buttons
celebrationButton.addEventListener("click", addButton)
challengeButton.addEventListener("click", addButton)

//add eventListener to both celebration and challenge elements for remove button
celebrationEl.addEventListener("click", removeButton)
challengeEl.addEventListener("click", removeButton)

