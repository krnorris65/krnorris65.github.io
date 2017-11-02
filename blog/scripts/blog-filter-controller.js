const blogDatabase = JSON.parse(localStorage.getItem("adminDatabase")).blog; //getting blog info
const blogItems = blogDatabase.length; //number of blog posts
const blogEl = document.getElementById("blog-posts") //write blogs to DOM

//update DOM with blog posts
const updateDOM = (itemArray) => {
    itemArray.forEach (
        function(currentBlog) { 
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
}

//if there are blog posts, then put them on the blog page
if(blogItems > 0) {
    
    paginate(
        blogDatabase,
        "blog-paginator",
        "blog-posts"
    )

    //filter blog pages, will filter all blogs no matter what page you are on
    document.querySelector("input[name='blogFilter']").addEventListener(
        "keyup",
        event => {
            if(event.target.value.length >= 3) {
                //what is being filtered, convert to lowercase 
                const userFilterString = event.target.value.toLowerCase()

                const blogsFilter = blogDatabase.filter(
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

                    //clear DOM
                    blogEl.innerHTML = ""
                    updateDOM(blogsFilter) //add filtered blogs to DOM
            } else {
                paginate(
                    blogDatabase,
                    "blog-paginator",
                    "blog-posts"
                )
            }
        }
    )//end of blog filter

   

}//end of "if blogs exist"