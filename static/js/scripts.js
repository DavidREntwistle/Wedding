// scripts.js
// This script dynamically loads additional scripts and HTML

const scriptSources = [
    "static/js/navigation.js",
    "static/js/countdown.js"
];
const htmlSources = [
    ["static/utilities/navbar.html", "navbar-placeholder"]
];

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = document.location.pathname.split('/').slice(1).pop() || document.location.pathname;

    if (currentPage === 'rsvp' || currentPage === 'rsvp.html') {
        scriptSources.push("static/js/rsvp.js");
    }
    
    if (currentPage === 'accommodation' || currentPage === 'accommodation.html') {
        scriptSources.push("static/js/table.js");
    }

    // Load HTML first
    htmlSources.forEach(([url, elementId]) => loadHTML(url, elementId));

    // Load scripts sequentially
    loadScriptsSequentially(scriptSources);
});

/**
 * Dynamically load a script file and return a promise.
 * @param {string} url - The URL to fetch the script from.
 * @returns {Promise} - A promise that resolves when the script is loaded.
 */
function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.defer = true;
        script.onload = () => resolve(`Loaded script: ${url}`);
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
        document.body.appendChild(script);
    });
}

/**
 * Load scripts sequentially.
 * @param {Array} scriptUrls - An array of script URLs to load.
 */
function loadScriptsSequentially(scriptUrls) {
    scriptUrls.reduce((promise, scriptUrl) => {
        return promise.then(() => loadScript(scriptUrl));
    }, Promise.resolve())
    .catch(error => {
        console.error(error.message);
    });
}

/**
 * Load an HTML file into a specified element.
 * @param {string} url - The URL to fetch the HTML from.
 * @param {string} elementId - The ID of the element to load the HTML into.
 */
function loadHTML(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
                // Load scripts only after HTML is loaded to ensure placeholder elements are available
                if (elementId === "navbar-placeholder") {
                    loadScriptsSequentially(scriptSources);
                }
            } else {
                console.error(`Element with ID ${elementId} not found`);
            }
        })
        .catch(error => {
            console.error(`There was a problem with the fetch operation for ${url}:`, error);
        });
}
