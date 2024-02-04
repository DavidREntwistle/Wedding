// Updated script.js

// Global variables
const sections = document.querySelectorAll('.section');
const password = "Bear";

// Function to check the password
let passwordEntered = false;

// Function to check the password
function checkPassword() {
    const passwordSection = document.getElementById('password-section');
    const overlay = document.getElementById('overlay');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const sidebar = document.getElementById('sidebar'); // Add this line

    const enteredPassword = passwordInput.value;

    if (enteredPassword === password) {
        // Password correct, hide the password input, overlay, and error message
        passwordSection.style.display = 'none';
        overlay.style.display = 'none';
        document.body.classList.remove('locked-scroll'); // Allow scrolling
        passwordEntered = true;

        // Show the sidebar
        sidebar.style.display = 'flex';
    } else {
        // Incorrect password, display error message, show the overlay, and lock the scroll
        errorMessage.innerText = "Incorrect password. Please try again.";
        passwordInput.value = ''; // Clear the input for retry
        overlay.style.display = 'block';
        document.body.classList.add('locked-scroll'); // Lock the scroll

        // Hide the sidebar if the password is incorrect
        sidebar.style.display = 'none';
    }
}

// Function to toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// Lock the scroll by default before entering
document.body.classList.add('locked-scroll');

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Open the sidebar by default
document.getElementById('sidebar').classList.remove('closed');

// Toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleText = document.getElementById('toggleText');

    sidebar.classList.toggle('closed');
    const isClosed = sidebar.classList.contains('closed');

    toggleText.textContent = isClosed ? '>' : '<';
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
