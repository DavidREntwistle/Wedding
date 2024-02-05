// Updated script.js

// Global variables
const sections = document.querySelectorAll('.section');
const password = "test";

// Function to check the password
let passwordEntered = false;

// Function to check the password
function checkPassword() {
    const passwordSection = document.getElementById('password-section');
    const overlay = document.getElementById('overlay');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    const enteredPassword = passwordInput.value;

    if (enteredPassword === password) {
        // Password correct, hide the password input, overlay, and error message
        passwordSection.style.display = 'none';
        overlay.style.display = 'none';
        passwordEntered = true;
        document.body.classList.remove('locked-scroll'); // Allow scrolling
        document.body.classList.add('password-entered');

    } else {
        // Incorrect password, display error message, show the overlay, and lock the scroll
        errorMessage.innerText = "Incorrect password. Please try again.";
        passwordInput.value = ''; // Clear the input for retry
        overlay.style.display = 'block';
        document.body.classList.add('locked-scroll'); // Lock the scroll
        document.body.classList.remove('password-entered');
    }
}

// Handle password placeholder behavior
const passwordInput = document.getElementById('password');
const passwordLabel = document.getElementById('password-label');

passwordInput.addEventListener('focus', () => {
    passwordLabel.style.display = 'none';
});

passwordInput.addEventListener('blur', () => {
    if (passwordInput.value === '') {
        passwordLabel.style.display = 'block';
    }
});

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

const year = new Date().getFullYear();
const weddingDate = new Date(2025, 2, 7).getTime(); // Jan starts from 0

// Countdown timer
let timer = setInterval(updateCountdown, 1000);

function updateCountdown() {
    // Get today's date
    const today = new Date().getTime();

    // Calculate the difference
    const diff = weddingDate - today;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Display the countdown
    document.getElementById("timer").innerHTML =
        `<div class="days">
            <div class="numbers">${days}</div>days
        </div>
        <div class="hours">
            <div class="numbers">${hours}</div>hours
        </div>
        <div class="minutes">
            <div class="numbers">${minutes}</div>minutes
        </div>
        <div class="seconds">
            <div class="numbers">${seconds}</div>seconds
        </div>`;
}

// Uncomment the next line if you want to stop the countdown after the wedding date
// clearInterval(timer);

