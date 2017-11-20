const domEl = require("./domElements")

const filterPage = (dbArray, func, selector) => {
    const outputEl = domEl()
    let pageLoad = ""
    
    if (dbArray.length > 0) {
        
        pageLoad = func(dbArray) //initial page load
        
        selector.addEventListener(
            "keyup",
            event => {
                if(event.target.value.length >= 3) {
                //convert what is being filtered to lowercase
                    const userFilterString = event.target.value.toLowerCase()

                    const pageFilter = dbArray.filter(filteredItem => {
                        return filteredItem.name.toLowerCase().includes(userFilterString) ||
                        filteredItem.description.toLowerCase().includes(userFilterString)
                    }
                    )

                    debugger

                    if(pageFilter.length === 0) {
                        pageLoad = "<h3>Search Results Not Found</h3>"
                    } else {
                        pageLoad = func(pageFilter) //displays filtered items
                    }
                } else {
                    // outputEl.content.html = " "
                    pageLoad= func(dbArray) //displays initial page load if selector has less than three characters
                }
            }
        )

    }
    return pageLoad
}

module.exports =  filterPage