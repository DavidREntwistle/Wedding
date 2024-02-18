// navigation.js
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add event listeners for scroll and mouse hover
window.addEventListener('scroll', toggleTranslucent);
navigation.addEventListener('mouseenter', restoreAppearance);
navigation.addEventListener('mouseleave', toggleTranslucent);

// Add event listener for burger menu
document.querySelector('.burger-menu').addEventListener('click', function () {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});

// Toggle burger menu visibility
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scroll for burger menu links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const sectionId = this.getAttribute('href');
        document.querySelector(sectionId).scrollIntoView({
            behavior: 'smooth'
        });

        // Hide the burger menu after clicking on a link
        navLinks.classList.remove('active');
    });
});

function toggleTranslucent() {
    navigation.classList.toggle('translucent', window.scrollY > 0);
}

function restoreAppearance() {
    navigation.classList.remove('translucent');
}

// Scroll to sections
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });

        // Hide the menu after clicking on a section
        const menuItems = document.getElementById('menuItems');
        menuItems.classList.remove('active');
    }
}

// Scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
}

window.onscroll = function() {stickyNavBar()};

var navBar = document.getElementById("nav-bar");
var header = document.getElementById("header");
var headerBottom = header.offsetTop + header.offsetHeight;

function stickyNavBar() {
  if (window.pageYOffset > headerBottom) {
    navBar.classList.add("sticky");
  } else {
    navBar.classList.remove("sticky");
  }
}
