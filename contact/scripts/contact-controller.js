//parse
const storedSocialList = JSON.parse(localStorage.getItem("socialList"));
const socialElement = document.getElementById("social-media");

//loop through social media pages and insert into contact.html
for (let i = 0; i < storedSocialList.length; i++) {
    let currentSocial = storedSocialList[i];

    socialElement.innerHTML += `
    <li class="social"><a href="${currentSocial.url}">${currentSocial.service}</a></li>    
    `
} //testing uglify