// countdown.js
// Countdown timer for the header section

(function() {
    const headerTimerId = "header-timer";
    const navTimerId = "nav-timer";
    const weddingDate = new Date('March 7, 2025 13:00:00 GMT+0100');

    function updateCountdown(elementId, weddingDate) {
        const now = Date.now();
        const diff = weddingDate - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const timerElement = document.getElementById(elementId);

        const createCountdownElement = (name, value) => `
            <div class="${name}">
                <div class="numbers">${value}</div>${name.charAt(0).toUpperCase() + name.slice(1)}
            </div>
        `;

        if (now >= weddingDate) {
            timerElement.innerHTML = `<div class="message" id="married-message">Just Married!</div>`;
        } else if (days === 0 && hours < 24) {
            timerElement.innerHTML = `
            ${createCountdownElement('days', days)}
            ${createCountdownElement('hours', hours)}
            ${createCountdownElement('minutes', minutes)}
            ${createCountdownElement('seconds', seconds)}
            <div class="message" id="today-message">Today is the day!</div>`;
        } else {
            timerElement.innerHTML = `
            ${createCountdownElement('days', days)}
            ${createCountdownElement('hours', hours)}
            ${createCountdownElement('minutes', minutes)}
            ${createCountdownElement('seconds', seconds)}`;
        }
    }

    window.onload = function() {
        updateCountdown(headerTimerId, weddingDate);
        updateCountdown(navTimerId, weddingDate);
        const headerTimer = setInterval(function() { updateCountdown(headerTimerId, weddingDate); }, 1000);
        const navTimer = setInterval(function() { updateCountdown(navTimerId, weddingDate); }, 1000);
        return () => {
            clearInterval(headerTimer);
            clearInterval(navTimer);
        };
    }
})();
