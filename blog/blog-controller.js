//parse to read
let storedBlogPosts = JSON.parse(localStorage.getItem("blogPosts"));
let blogElement = document.getElementById("blog-posts");

//loop through blog array and insert blog posts into html
for (let i = 0; i < storedBlogPosts.length; i++) {
    let currentBlog = storedBlogPosts[i];
    
    blogElement.innerHTML += `
    <!-- Beginning of Blog Post ${currentBlog.week_num} -->
    <article id="week-${currentBlog.week_num}" class="blog">
    <header>
    <h2 class="weekNum">${currentBlog.title}</h2>
    <p class="weekDate">${currentBlog.week_dates}</p>
    </header>
    
    <section>
    <h3>Celebrations & Inspirations</h3>
    <li>${currentBlog.content.celebrations.celebration_1}</li>
    <li>${currentBlog.content.celebrations.celebration_2}</li>
    <li>${currentBlog.content.celebrations.celebration_3}</li>
    </section>
    
    <section>
    <h3>Challenges & Hang-Ups</h3>
    <li>${currentBlog.content.challenges.challenge_1}</li>
    <li>${currentBlog.content.challenges.challenge_2}</li>
    <li>${currentBlog.content.challenges.challenge_3}</li>
    </section>
    
    <footer>
    <span>Posted by ${currentBlog.author} on ${currentBlog.date_of_publication}</time></span>
    </footer>
    <!-- End of Blog Post ${currentBlog.week_num} -->
    `
}