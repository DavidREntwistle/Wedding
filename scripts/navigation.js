// navigation.js

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
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

// Function to toggle translucent navigation bar
function toggleTranslucent() {
    const navigation = document.getElementById('nav-bar');
    navigation.classList.toggle('translucent', window.scrollY > 0);
}

// Function to restore navigation bar appearance
function restoreAppearance() {
    const navigation = document.getElementById('nav-bar');
    navigation.classList.remove('translucent');
}

// Add event listeners for scroll and mouse hover
window.addEventListener('scroll', toggleTranslucent);
document.getElementById('nav-bar').addEventListener('mouseenter', restoreAppearance);
document.getElementById('nav-bar').addEventListener('mouseleave', toggleTranslucent);

// Function to handle sticky navigation bar
function stickyNavBar() {
    const navBar = document.getElementById("nav-bar");
    const header = document.getElementById("header");
    const headerBottom = header.offsetTop + header.offsetHeight;

    navBar.classList.toggle("sticky", window.pageYOffset > headerBottom);
}

// Add event listener for scroll
window.addEventListener('scroll', stickyNavBar);

// Function to scroll to top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add event listener for scroll to top button
document.getElementById('scrollToTopBtn').addEventListener('click', scrollToTop);
