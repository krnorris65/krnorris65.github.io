const celebrationButton = document.getElementById("add-celebration")
const celebrationEl = document.getElementById("form_celebrations")


addCelebration = function(){
    celebrationEl.innerHTML += `
    <input type="text" name="celebration1">`
}

celebrationButton.addEventListener("click", addCelebration)