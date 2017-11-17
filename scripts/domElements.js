//this module captures the dom elements that will be written to when each page is called

const domElements = () => {
        return Object.create(null, {
        "header": $("#page-header"),
        "content": $("#page-content")
        })
    }

    module.exports = domElements