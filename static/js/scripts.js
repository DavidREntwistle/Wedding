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
    const currentPage = document.location.pathname.split('/').pop();
    
    // Check for 'rsvp' or 'rsvp.html' in the URL
    if (currentPage === 'rsvp' || currentPage === 'rsvp.html') {
        scriptSources.push("static/js/rsvp.js");
    }
    
    // Check for 'accommodation' or 'accommodation.html' in the URL
    if (currentPage === 'accommodation' || currentPage === 'accommodation.html') {
        scriptSources.push("static/js/table.js");
    }

    scriptSources.forEach(loadScript);
    htmlSources.forEach(([url, elementId]) => loadHTML(url, elementId));

    // console.log('DOM fully loaded and parsed');
});

/**
 * Dynamically load a script file.
 * @param {string} url - The URL to fetch the script from.
 */
function loadScript(url) {
    const script = document.createElement("script");
    script.src = url;
    script.defer = true;
    // script.onload = () => console.log(`Loaded script: ${url}`);
    script.onerror = () => console.error(`Failed to load script: ${url}`);
    document.body.appendChild(script);
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
                // console.log(`Loaded HTML into #${elementId}`);
            } else {
                console.error(`Element with ID ${elementId} not found`);
            }
        })
        .catch(error => {
            console.error(`There was a problem with the fetch operation for ${url}:`, error);
        });
}
