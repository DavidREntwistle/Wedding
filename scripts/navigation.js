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
