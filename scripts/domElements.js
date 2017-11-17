//this module captures the dom elements that will be written to when each page is called

const domElements = () => {
    const domObject = Object.create(null, {
        "header": {
            value: $("#page-header")
        },
        "content": {
            value: $("#page-content")
        }
    })
    return domObject
}


module.exports = domElements