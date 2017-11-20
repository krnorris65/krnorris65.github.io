
const filterPage = (dbArray, func, selector) => {
    if (dbArray.length > 0) {
        func(dbArray) //initial page load

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

                    if(pageFilter.length === 0) {
                        projectsEl.innerHTML = `
                        <h3>Search Results Not Found</h3>
                    `
                    } else {
                        func(pageFilter) //displays filtered items
                    }
                } else {
                    projectsEl.innerHTML = " "
                    func(dbArray) //displays initial page load if selector has less than three characters
                }
            }
        )
    }
}

module.exports =  filterPage