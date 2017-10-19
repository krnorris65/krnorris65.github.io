//parse to read
let storedBlogPosts = JSON.parse(localStorage.getItem("blogPosts"));
let blogElement = document.getElementById("blog-posts");


//iterate through blog array and insert blog posts into DOM
for (let i = 0; i < storedBlogPosts.length; i++) {
    let finalBlogString = ""
    let currentBlog = storedBlogPosts[i];
    
    finalBlogString += `
        <!-- Beginning of Blog Post ${currentBlog.week_num} -->
        <article id="week-${currentBlog.week_num}" class="blog">
        <header>
        <h2 class="weekNum">${currentBlog.title}</h2>
        <p class="weekDate">${currentBlog.week_dates}</p>
        </header>
        
        <section>
        <h3>Celebrations & Inspirations</h3>
        <ul>`

    //iterates over celebration array
    for (let j = 0; j < currentBlog.content.celebrations.length; j++) {
        finalBlogString += `<li>${currentBlog.content.celebrations[j]}</li>`;
    }
    
    finalBlogString += `
        </ul>
        </section>
        
        <section>
        <h3>Challenges & Hang-Ups</h3>
        <ul>`
    
    //iterates over challenges array
    for (let s = 0; s < currentBlog.content.challenges.length; s++) {
        finalBlogString += `<li>${currentBlog.content.challenges[s]}</li>`;
    };
   
    finalBlogString += `
        </ul>
        </section>
        
        <footer>
        <span>Posted by ${currentBlog.author} on ${currentBlog.date_of_publication}</time></span>
        </footer>
        <!-- End of Blog Post ${currentBlog.week_num} -->
        `
    //update DOM
    blogElement.innerHTML += finalBlogString;
} 