
const filterPage = (dbArray, action, selector) => {
if (dbArray.length > 0) {
    action(dbArray) //loads all projects on page load

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
                    action(pageFilter)
                }
            } else {
                projectsEl.innerHTML = " "
                action(dbArray)
            }
        }
    )
}
}