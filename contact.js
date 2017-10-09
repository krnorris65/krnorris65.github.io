const facebook = {
    "service": "Facebook", 
    "handle": "Kristen Norris", 
    "URL": "https://www.facebook.com/kris10norris",
}

const instagram = {
    "service": "Instagram", 
    "handle": "Kris10Rose65", 
    "URL": "https://www.instagram.com/kris10rose65/",
}

const linkedin = {
    "service": "LinkedIn", 
    "handle": "Kristen Norris", 
    "URL": "https://www.linkedin.com/in/kris10norris/",
}

//array
let socialList = [];

socialList.push(facebook, instagram, linkedin);

//stringify
const socialListString = JSON.stringify(socialList);
localStorage.setItem("socialList", socialListString);

//parse
const storedSocialList = JSON.parse(localStorage.getItem("socialList"));
