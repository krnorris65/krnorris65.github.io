
let formString = ""

formString += `
    <section id="blog_form">
        <section id="form_new-blog">
            <label for="form_title">Title</label>
                <input type="text" name="title" id="form_title" placeholder="title" class="form_field">

            <label for="form_published">Date Posted</label>
                <input type="date" name="published" id="form_published" class="form_field" required>

            <label for="form_week">Dates of Week</label>
                <input type="text" name="week_dates" id="form_week" placeholder="MONTH mon - fri, YEAR">

            <label for="form_author">Author</label>
                <input type="text" name="author" id="form_author" value="Kristen Norris">

            <label for="">Celebrations and Inspirations</label>
                <div id="form_celebrations">
                    <section id="form_celebration_1">
                        <input type="text" name="celebration">
                        <button id="remove_celebration_1">Remove</button>
                    </section>
                </div>
                <button id="add-celebration" class="add">Add Celebration</button>

            <label for="">Challenges and Hang-Ups</label>
                <div id="form_challenges">
                    <section id="form_challenge_1">
                        <input type="text" name="challenge">
                        <button id="remove_challenge_1">Remove</button>
                    </section>
                </div>
                <button id="add-challenge" class="add">Add Challenge</button>

            <label for="form_tags">Blog Tags</label>
                <input type="text" name="tags" id="form_tags" placeholder="separate tags with a comma">
        </section>
        <button id="button_submit-blog">Submit Blog</button>
        <button id="button_clear-blog">Clear</button>
    </section>
`

module.exports = formString