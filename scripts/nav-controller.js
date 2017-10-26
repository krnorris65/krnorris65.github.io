//get from local storage
const navBarDatabase = JSON.parse(localStorage.getItem("navBar"));
const navElement = document.getElementById("nav-items");

//loop through nav array and write each nav element to the Nav Bar
for (let i = 0; i < navBarDatabase.length; i++) {
    let currentNav = navBarDatabase[i];
    
    navElement.innerHTML += `
    <li id="nav-${currentNav.page}"><a href="${currentNav.link}">${currentNav.page}</a></li>
    `
}


