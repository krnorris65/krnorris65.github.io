const domEl = require("./domElements")

const paginate = (items, func) => {
    const outputEl = domEl()
    const totalItems = items.length
    const itemsPerPage = 5
    const numberOfPages = Math.ceil(totalItems / itemsPerPage)
    const paginationEl = outputEl.footer

    // Build the DOM string for the pagination links in the footer
    let paginationString = "<ul>";
    paginationString += "<a id='previous' href='#'>&lt;</a>"; //generates previous button
    for (let i = 0; i < numberOfPages; i++) {
        paginationString += ` <li><a class="page page-${i+1}" href="#">${i+1}</a></li>` //generates the correct number of blog page buttons and gives them a class of blogPage and page-#
    }
    paginationString += " <a id='next' class='page-2' href='#'>&gt;</a>"; //generates next button, default class is page-2
    paginationString += "</ul>";

    paginationEl.html(paginationString); //add to DOM

    // references to the next and previous arrows
    const previousEl = document.getElementById("previous"); 
    const nextEl = document.getElementById("next");

    //function to invoke when user clicks pagination link at bottom of page
    function produceItems(event) {
        outputEl.innerHTML = "" //clear inner html for blog section

        //what did the user click
        const currentPage = parseInt ( //parse since the array will return a string
            Array.from(event.target.classList) //target classes on the clicked pagination link
                .find(pageClass => { 
                    if (pageClass.startsWith("page-")) return pageClass //if class starts with "page-" then return that class
                })
                .split("-")[1] //split class using the "-" as the delimiter, [0]=page [1]=#, currentPage = #
        );
        
        //change class of previous arrow
        if ((currentPage - 1) === 0 ) { //if the current page -1 is 0 
            previousEl.style.visibility = "hidden"; //then don't display previous arrow
        } else {
            previousEl.style.visibility = "visible"; //if greater than 0 then display arrow 
            previousEl.className = `page-${currentPage - 1}` //and add the class of the previous page
        }
        //change class of next arrow
        if ((currentPage + 1) > numberOfPages ) { //if the current page +1 is more than the total pages 
            nextEl.style.visibility = "hidden"; //then don't display next arrow
        } else {
            nextEl.style.visibility = "visible"; //if less than total pages then display arrow 
            nextEl.className = `page-${currentPage + 1}` //and add the class of the next page
        }

        //determine blogs to display by slicing array
        const begin = (currentPage-1) * itemsPerPage; //current page minus one, then multiply by items per page
        const end = currentPage * itemsPerPage; //current page multiplied by items per page
        const itemsToDisplay = items.slice(begin, end);

        //iterate through itemsToDisplay and inserts them into DOM
        func(itemsToDisplay) //make sure that function is called updateDOM  on the page-controller
    
    }//end of produceItems

    // Get the array of pagination anchor tags we added to the DOM
    const pageLinks = document.getElementsByClassName("page");
    
    // Add event listeners to each <a> element in the pagination
    pageLinks.forEach( link => {
        link.addEventListener("click", produceItems, false) //when pagination link is clicked, run produceItems function 
    })
    
    //default so that first page loads
    produceItems({
        "target": {
            "classList": ["page-1"]
        }
    });
    
    //event listeners for previous and next elements
    previousEl.addEventListener("click", produceItems, false);
    nextEl.addEventListener("click", produceItems, false);

}//end of paginate