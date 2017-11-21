const domEl = require("./domElements")

//filterPage function takes two parameters: the database in which you want to filter through and the function you want executed on the database
const filterPage = (dbArray, func) => {
    const outputEl = domEl()
    let pageLoad = ""
    
    if (dbArray.length > 0) {
        //create search input
        outputEl.filter.append("<p>Search: <input type=\"text\" name=\"pageFilter\" placeholder=\"search all\"></p>")
        
        //targets input to add an eventListener
        const pageSearch = $("input[name='pageFilter']")[0]
            
        pageLoad = func(dbArray) //initial page load of items
        
        pageSearch.addEventListener(
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
                
                    //output.content.html(pageLoad) repopulates the content area when user types in search bar
                    if(pageFilter.length === 0) {
                        pageLoad = "<h3>Search Results Not Found</h3>"
                        outputEl.content.html(pageLoad) 
                    } else {
                        pageLoad = func(pageFilter) //displays filtered items
                        outputEl.content.html(pageLoad)
                    }
                } else {
                    pageLoad= func(dbArray) //displays initial page load if selector has less than three characters
                    outputEl.content.html(pageLoad)
                }
            }
        )
        
    }
    return pageLoad
}

module.exports =  filterPage