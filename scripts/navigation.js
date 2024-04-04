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
            block: 'start',
            inline: 'start'
        });

        // Hide the navigation overlay
        const overlay = document.querySelector('.nav-overlay');
        overlay.style.display = 'none';

        // Restore the burger menu
        const burgerIcon = document.querySelector('.burger-menu');
        const closeIcon = document.querySelector('.close-icon');
        burgerIcon.classList.remove('hide-close');
        closeIcon.classList.add('hide-close');
        
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

// Add event listener for burger menu
document.querySelector('.burger-menu').addEventListener('click', function () {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');

    const overlay = document.querySelector('.nav-overlay');
    overlay.style.display = navLinks.classList.contains('active') ? 'block' : 'none';

    // Toggle between burger icon and close icon
    const burgerIcon = document.querySelector('.burger-menu');
    const closeIcon = document.querySelector('.close-icon');
    burgerIcon.classList.toggle('hide-close');
    closeIcon.classList.toggle('hide-close');
});

// Add event listener for close icon
document.querySelector('.close-icon').addEventListener('click', function () {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.remove('active');

    const overlay = document.querySelector('.nav-overlay');
    overlay.style.display = 'none';

    // Restore the burger menu
    const burgerIcon = document.querySelector('.burger-menu');
    const closeIcon = document.querySelector('.close-icon');
    burgerIcon.classList.remove('hide-close');
    closeIcon.classList.add('hide-close');
});

// Function to handle sticky navigation bar adjusted for SimpleBar
function stickyNavBar() {
    const navBar = document.getElementById("nav-bar");
    const header = document.getElementById("home");

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

// Function to scroll to top of the page
function scrollToTop() {
    var simpleBarContainer = document.querySelector('#main-content .simplebar-content-wrapper');
    if (simpleBarContainer) {
        simpleBarContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Add event listener for scroll to top button
document.getElementById('scrollToTopBtn').addEventListener('click', scrollToTop);
