const celebrationButton = document.getElementById("add-celebration")
const challengeButton = document.getElementById("add-challenge")


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

const addCelebration = function(){
    const celebrationId = celebrationIdFactory.next().value
    const celebrationEl = document.getElementById("form_celebrations")
    celebrationEl.innerHTML += `
    <input type="text" name="celebration" id="form_celebration_${celebrationId}">
    `
}
const addChallenge = function(){
    const challengeId = challengeIdFactory.next().value
    const challengeEl = document.getElementById("form_challenges")
    challengeEl.innerHTML += `
        <input type="text" name="challenge" id="form_challenge_${challengeId}">
    `
}

celebrationButton.addEventListener("click", addCelebration)
challengeButton.addEventListener("click", addChallenge)