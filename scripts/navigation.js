// navigation.js

// Function to handle navigation link click
function handleNavLinkClick(e) {
    e.preventDefault();
    const path = this.getAttribute('href');
    const target = document.querySelector(path);
    
    if (target) {
        // Scroll to the target section
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Close the burger menu
        closeBurgerMenu();

        // Update the URL without page reload
        // if (path !== '#home') {
        //     const url = window.location.origin + path; // Construct the full URL
        //     window.history.pushState({ path: url }, '', url);
        // } else {
        //     window.history.pushState({ path: window.location.origin }, '', window.location.origin);
        // }
        // Need to improve this are so it doesn't display as e.g. /#rsvp 
    }
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

// Function to handle sticky navigation bar adjusted for SimpleBar
function stickyNavBar() {
    const navBar = document.getElementById("nav-bar");
    const header = document.getElementById("header");

    // Assuming SimpleBar is applied on an element with the ID 'main-content'
    var simpleBarContainer = document.querySelector('#main-content .simplebar-content-wrapper');
    if (simpleBarContainer) {
        const headerBottom = header.offsetTop + header.offsetHeight;
        const scrollTop = simpleBarContainer.scrollTop; // Get the scroll position of the SimpleBar container

        // Toggle sticky class
        navBar.classList.toggle("sticky", scrollTop > headerBottom);

        // Toggle translucent class if the navigation bar is sticky
        if (scrollTop > headerBottom) {
            navBar.classList.add("translucent");
        } else {
            navBar.classList.remove("translucent");
        }
    }
}

// Function to attach scroll event listener to SimpleBar container
function attachScrollListener() {
    try {
        const simpleBarContainer = document.querySelector('#main-content .simplebar-content-wrapper');
        if (simpleBarContainer) {
            simpleBarContainer.addEventListener('scroll', stickyNavBar);
        } else {
            console.error('SimpleBar container not found.');
        }
    } catch (error) {
        console.error('Error attaching scroll listener:', error);
    }
}

// Call the function after the content is loaded
window.addEventListener('load', attachScrollListener);

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

// Function to scroll to top of the page
function scrollToTop() {
    var simpleBarContainer = document.querySelector('#main-content .simplebar-content-wrapper');
    if (simpleBarContainer) {
        simpleBarContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Add event listener for scroll to top button
document.getElementById('scrollToTopBtn').addEventListener('click', scrollToTop);
