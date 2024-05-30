// navigation.js
// Function to handle navigation link click
function handleNavLinkClick(e) {
    e.preventDefault();
    const path = this.getAttribute('href');
    
    // Close the burger menu
    closeBurgerMenu();

    // Open the new page
    window.location.href = path;
}

// Add an event listener to all anchor links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', handleNavLinkClick);
});

// Function to close the burger menu
function closeBurgerMenu() {
    document.getElementById("overlay").classList.remove('active');
    document.querySelector('.burger-menu').classList.remove('active');
}

// Function to toggle the navigation menu
function toggleNav() {
    var overlay = document.getElementById("overlay");
    overlay.classList.toggle("active");
    var burgerMenu = document.querySelector(".burger-menu");
    burgerMenu.classList.toggle("active");
}

// Add event listener to the close button if it exists
var closeButton = document.querySelector('.closebtn');
if (closeButton) {
    closeButton.addEventListener('click', function() {
        closeBurgerMenu();
    });
}
