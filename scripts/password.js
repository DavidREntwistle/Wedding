// password.js
// Global variables
const password = "test";
const passwordInput = document.getElementById('password');
const passwordLabel = document.getElementById('password-label');
const navigation = document.getElementById('nav-bar');
const overlay = document.getElementById('overlay');
const errorMessage = document.getElementById('error-message');

// Function to check the password
function checkPassword() {
    const passwordSection = document.getElementById('password-section'); // Define passwordSection here
    const enteredPassword = passwordInput.value;

    if (enteredPassword === password) {
        // Password correct, hide the password input, overlay, and error message
        passwordSection.style.display = 'none';
        overlay.style.display = 'none';
        document.body.classList.remove('locked-scroll'); // Allow scrolling
        document.body.classList.add('password-entered');
        navigation.style.display = 'flex'; // Display the navigation bar
    } else {
        // Incorrect password, display error message, show the overlay, and lock the scroll
        errorMessage.innerText = "Incorrect invite code. Please try again.";
        passwordInput.value = ''; // Clear the input for retry
        overlay.style.display = 'block';
        document.body.classList.add('locked-scroll'); // Lock the scroll
        document.body.classList.remove('password-entered');
    }
}

// Event listeners
passwordInput.addEventListener('keydown', function(e) {
    if (e.keyCode == 13) {
        checkPassword();
    }
});

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
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

// Lock the scroll by default before entering
document.body.classList.add('locked-scroll');
