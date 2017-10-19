const totalItems = storedBlogPosts.length;
const blogsPerPage = 5;
const numberOfPages = Math.ceil(totalItems / blogsPerPage);
const paginationEl = document.getElementById("blog-paginator"); //add id to html
//const blogEl = document.getElementById("blog-posts") //add id to html

// Build the DOM string for the pagination links in the footer
let paginationString = "<ul>";
paginationString += "<a id='previous' href='#'>&lt;</a>"; //generates previous button
for (var i = 0; i < numberOfPages; i++) {
    paginationString += ` <li><a class="blogPage page-${i+1}" href="#">${i+1}</a></li>` //generates each blog page button
};
paginationString += " <a id='next' class='page-2' href='#'>&gt;</a>"; //generates next button
paginationString += "</ul>";

paginationEl.innerHTML = paginationString; //add to DOM

// references to the next and previous arrows
const previousEl = document.getElementById("previous");
const nextEl = document.getElementById("next");