//generator function to create a unique id for the celebration/challenge created by user. starts at 2 since the first input is already on the page
const idGen = function* () {
    let id = 2
    
    while (true) {
        yield id
        id += 1
    }
}
//instances of generator function
const celebrationIdFactory = idGen()
const challengeIdFactory = idGen()

//get add celebration/challenge button
const celebrationButton = document.getElementById("add-celebration")
const challengeButton = document.getElementById("add-challenge")

//get celebration/challenge elements
const celebrationEl = document.getElementById("form_celebrations")
const challengeEl = document.getElementById("form_challenges")

//celebration DOM string
const celebrationInput = function () {
    const celebrationId = celebrationIdFactory.next().value //next value of generator function
    celebrationEl.innerHTML += `
    <section id="form_celebration_${celebrationId}">
    <input type="text" name="celebration">
    <button id="remove_celebration_${celebrationId}">Remove</button>
    </section>
    ` //adds a section with an input field and remove button
}

//challenges DOM string
const challengeInput = function() {
    const challengeId = challengeIdFactory.next().value //next value of generator function
    challengeEl.innerHTML += `
    <section id="form_challenge_${challengeId}">
        <input type="text" name="challenge">
        <button id="remove_challenge_${challengeId}">Remove</button>
    </section>
    ` //adds a section with an input field and remove button
}

// //functionality to add celebration/challenge button
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
