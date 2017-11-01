const storedAdminDatabase = JSON.parse(localStorage.getItem("adminDatabase")); //getting blog info
const totalItems = storedAdminDatabase.blog.length; //number of blog posts
const blogsPerPage = 5; //number of blogs per page
const numberOfPages = Math.ceil(totalItems / blogsPerPage); //how many pages needed, Math.ceil rounds up
const paginationEl = document.getElementById("blog-paginator"); //write pagination to DOM
const blogEl = document.getElementById("blog-posts") //write blogs to DOM


/*Beginning of Pagination */
// Build the DOM string for the pagination links in the footer
let paginationString = "<ul>";
paginationString += "<a id='previous' href='#'>&lt;</a>"; //generates previous button
for (let i = 0; i < numberOfPages; i++) {
    paginationString += ` <li><a class="blogPage page-${i+1}" href="#">${i+1}</a></li>` //generates the correct number of blog page buttons and gives them a class of blogPage and page-#
};
paginationString += " <a id='next' class='page-2' href='#'>&gt;</a>"; //generates next button, default class is page-2
paginationString += "</ul>";

paginationEl.innerHTML = paginationString; //add to DOM

// references to the next and previous arrows
const previousEl = document.getElementById("previous"); 
const nextEl = document.getElementById("next");

//function to invoke when user clicks pagination link at bottom of page
function produceBlog(event) {
    blogEl.innerHTML = ""; //clear inner html for blog section


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
    const begin = (currentPage-1) * blogsPerPage; //current page minus one, then multiply by blogs per page
    const end = currentPage * blogsPerPage; //current page multiplied by blogs per page
    const blogsToDisplay = storedAdminDatabase.blog.slice(begin, end);

    //iterate through blogsToDisplay and inserts blog entry into DOM
    blogsToDisplay.forEach(function(currentBlog) { 
        let finalBlogString = ""
        
        finalBlogString += `
            <!-- Beginning of Blog Post ${currentBlog.title} -->
            <article id="blog-${currentBlog.id}" class="blog">
            <header>
            <h2 class="weekNum">${currentBlog.title}</h2>
            <p class="weekDate">${currentBlog.week_dates}</p>
            </header>
            
            <section>
            <h3>Celebrations & Inspirations</h3>
            <ul>`
    
        //iterates over celebration array
        currentBlog.celebrations.forEach(function(celebration) {
            finalBlogString += `<li>${celebration}</li>`;
        })
        
        finalBlogString += `
            </ul>
            </section>
            
            <section>
            <h3>Challenges & Hang-Ups</h3>
            <ul>`
        
        //iterates over challenges array
        currentBlog.challenges.forEach(function(challenge) {
            finalBlogString += `<li>${challenge}</li>`;
        })
        
        finalBlogString += `
            </ul>
            </section>
            
            <footer>
            <span>Posted by ${currentBlog.author} on ${currentBlog.published}</time></span>
            </footer>
            <!-- End of Blog Post ${currentBlog.week_num} -->
            `
        //update DOM
        blogEl.innerHTML += finalBlogString;
    })



}//end of produce blog function

// Get the array of pagination anchor tags we added to the DOM
const blogLinks = document.getElementsByClassName("blogPage");

// Add event listeners to each <a> element in the pagination
for (let l = 0; l < blogLinks.length; l++) {
    let thisBlogLink = blogLinks[l];
    thisBlogLink.addEventListener("click", produceBlog, false) //when pagination link is clicked, run produceBlog function 
}

//default so that first page loads
produceBlog({
    "target": {
        "classList": ["page-1"]
    }
});

//event listeners for previous and next elements
previousEl.addEventListener("click", produceBlog, false);
nextEl.addEventListener("click", produceBlog, false);
/*End of Pagination */

    //filter blog pages
    document.querySelector("input[name='blogFilter']").addEventListener(
        "keyup",
        event => {
            if(event.target.value.length >= 3) {
                //Filter 
                const userFilterString = event.target.value.toLowerCase()

                const blogsFilter = storedAdminDatabase.blog.filter(
                    filteredBlog => {
                        return filteredBlog.title.toLowerCase().includes(userFilterString) || //look through titles
                            filteredBlog.celebrations.filter( //iterate over the celebrations array
                                filterCelebration => {
                                    return filterCelebration.toLowerCase().includes(userFilterString)
                                }).length || //if the length is 0 then it returns false
                            filteredBlog.challenges.filter( //iterate over the challenges array
                                filterChallenge => {
                                    return filterChallenge.toLowerCase().includes(userFilterString)
                                }).length ||
                                filteredBlog.week_dates.toLowerCase().includes(userFilterString)
                            
                    }
                )

                blogEl.innerHTML = ""

                blogsFilter.forEach( returnedBlog => {
                    blogEl.innerHTML = `<h1>Blog Exists</h1>`
                })
           
            } else {
                produceBlog({
                    "target": {
                        "classList": ["page-1"]
                    }
                })
            }
        }
    )//end of blog filter

/*
clear innerHTML

filteredArticles.forEach(
    insert into DOM
)
 if less than three characters then clear innerHTML and show all articles

*/