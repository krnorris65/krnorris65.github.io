//generates content for contact page
const contactContent = () => {
    $.ajax({
        "url": "data/database.json",
        "method": "GET"
    }).then(
        contactInfo => {
            const contactDb = contactInfo.contact;

            let contactString = "";

            //builds contact by email section
            contactString += `
                <section>
                    <h4 class="contact">Send an email:</h4>
                    <ul id="send-email"> 
                        <li class="email"><a href="mailto:${contactDb.email}">${contactDb.email}</a></li>
                    </ul>
                </section>
            `
            //builds contact through social section
            contactString += `
                <section>
                    <h4 class="contact">Connect on social media:</h4>
                    <ul id="social-media">
            `
            
            //iterates through each social site
            contactDb.social.forEach (site => {
                contactString += `
                    <li class="social"><a href="${site.url}">${site.service}</a></li>
                `
            })

            //closing tags for unordered list and contact section
            contactString += `
                </ul>
                </section>
            `
            return contactString
        }
    )
}

module.exports = contactContent