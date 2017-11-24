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
const celebrationButton = $("#add-celebration")
const challengeButton = $("#add-challenge")