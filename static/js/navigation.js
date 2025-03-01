// navigation.js
// Replace the navbar placeholder with the navigation bar
document.querySelector('#navbar-placeholder').outerHTML = `
    <nav class="overlay" id="overlay">
        <ul class="nav-links" id="overlay-links">
            <li><a href="/">Home</a></li>
            <li><a href="details">The Details</a></li>
            <li><a href="travel">Travel</a></li>
            <li><a href="accommodation">Accommodation</a></li>
            <li><a href="ceremony">Ceremony</a></li>
            <li><a href="reception">Reception</a></li>
            <li><a href="guestbook">Guestbook</a></li>
            <li><a href="things-to-do">Things to do</a></li>
            <li><a href="rsvp">RSVP</a></li>
        </ul>
    </nav>
    <nav class="nav-bar" id="nav-bar">
        <div class="nav-container">
            <ul class="nav-links" id="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="details">The Details</a></li>
                    <li><a href="travel">Travel</a></li>
                    <li><a href="accommodation">Accommodation</a></li>
                    <li><a href="ceremony">Ceremony</a></li>
                    <li><a href="reception">Reception</a></li>
                    <li><a href="guestbook">Guestbook</a></li>
                    <li><a href="things-to-do">Things to do</a></li>
                    <li><a href="rsvp">RSVP</a></li>
            </ul>
            <div class="nav-title">
                <a href="/">
                    <h1>Shaina & David</h1>
                    <h5>Friday 7<sup>TH</sup> March 2025</h5>
                </a>
            </div>
            <div id="nav-timer"></div>
            <div class="burger-menu" onclick="toggleNav()">
                <div class="burger-icon"></div>
                <div class="burger-icon"></div>
                <div class="burger-icon"></div>
            </div>
        </div>
    </nav>
`;

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
