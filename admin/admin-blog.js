//generator function to create a unique id for the celebration/challenge created by user. starts at 2 since the first input is already on the page
const idGen = function* () {
    let id = 2
    
    while (true) {
        yield id
        id += 1
    }
}
const celebrationIdFactory = idGen()
const challengeIdFactory = idGen()

//get add celebration/challenge button
const celebrationButton = document.getElementById("add-celebration")
const challengeButton = document.getElementById("add-challenge")

//get celebration/challenge elements
const celebrationEl = document.getElementById("form_celebrations")
const challengeEl = document.getElementById("form_challenges")

//functionality to add celebration button
const addCelebration = function(){
    const celebrationId = celebrationIdFactory.next().value
    celebrationEl.innerHTML += `
        <section id="form_celebration_${celebrationId}">
            <input type="text" name="celebration">
            <button id="remove_celebration_${celebrationId}">Remove</button>
        </section>
        `
}

//functionality to add challenge button
const addChallenge = function(){
    const challengeId = challengeIdFactory.next().value
    challengeEl.innerHTML += `
        <section id="form_challenge_${challengeId}">
            <input type="text" name="challenge">
            <button id="remove_challenge_${challengeId}">Remove</button>
        </section>
    `
}

//functionality to delete button
celebrationEl.addEventListener("click", function(event) { //target celebration element
    const idOfButtonClicked = event.target.id
    if(idOfButtonClicked.startsWith("remove_celebration_")) {
        const buttonIdNum = idOfButtonClicked.split("_")[2] //split string to get numb from id
        const inputSection = document.getElementById("form_celebration_" + buttonIdNum) //get input section with that num
        celebrationEl.removeChild(inputSection) //remove input section

    }
})

celebrationButton.addEventListener("click", addCelebration)
challengeButton.addEventListener("click", addChallenge)