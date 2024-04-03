// navigation.js

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'start'
            });

            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.remove('active');

            const overlay = document.querySelector('.nav-overlay');
            overlay.style.display = 'none';

            // Restore the burger menu
            const burgerIcon = document.querySelector('.burger-menu');
            const closeIcon = document.querySelector('.close-icon');
            burgerIcon.classList.remove('hide-close');
            closeIcon.classList.add('hide-close');
        }
    });
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

// Function to scroll to top of the page
function scrollToTop() {
    var simpleBarContainer = document.querySelector('#main-content .simplebar-content-wrapper');
    if (simpleBarContainer) {
        simpleBarContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Add event listener for scroll to top button
document.getElementById('scrollToTopBtn').addEventListener('click', scrollToTop);
