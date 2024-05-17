// countdown.js
// Countdown timer for the header section
let headerTimer = setInterval(updateHeaderCountdown, 1000);
let navTimer = setInterval(updateNavCountdown, 1000);

function updateHeaderCountdown() {
    // Get the current date and time
    const now = new Date();

    // Set the wedding date and time in local timezone (Ireland)
    const weddingDate = new Date('March 7, 2025 13:00:00 GMT+0000');

    // Calculate the difference in milliseconds
    const diff = weddingDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Get the countdown timer element
    const timerHeaderElement = document.getElementById("header-timer");

    // Check the conditions to display appropriate message
    if (now >= weddingDate) {
        // Display "Just Married!" message
        clearInterval(headerTimer); // Stop the countdown
        timerHeaderElement.innerHTML = `<div class="message">Just Married!</div>`;
    } else if (days === 0 && hours < 24) {
        // Display "Today is the day!" message above the countdown
        timerHeaderElement.innerHTML = `<div class="message">Today is the day!</div>
        <div class="days">
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
    } else if (days > 0 || (days === 0 && hours >= 24)) {
        // Display countdown
        timerHeaderElement.innerHTML =
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
}

function updateNavCountdown() {
    // Get the current date and time
    const now = new Date();

    // Set the wedding date and time in local timezone (Ireland)
    const weddingDate = new Date('March 7, 2025 13:00:00 GMT+0000');

    // Calculate the difference in milliseconds
    const diff = weddingDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Get the countdown timer element
    const timerNavElement = document.getElementById("nav-timer");

    // Check the conditions to display appropriate message
    if (now >= weddingDate) {
        // Display "Just Married!" message
        clearInterval(navTimer); // Stop the countdown
        timerNavElement.innerHTML = `<div class="message">Just Married!</div>`;
    } else if (days === 0 && hours < 24) {
        // Display "Today is the day!" message above the countdown
        timerNavElement.innerHTML = `<div class="message">Today is the day!</div>
        <div class="days">
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
    } else if (days > 0 || (days === 0 && hours >= 24)) {
        // Display countdown
        timerNavElement.innerHTML =
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
}
