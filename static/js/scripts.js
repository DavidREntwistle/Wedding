// scripts.js
// This script dynamically loads additional scripts and HTML

/**
 * Load scripts sequentially.
 * @param {Array} scriptUrls - An array of script URLs to load.
 * @returns {Promise} A promise that resolves when all scripts have loaded.
 */
function loadScriptsSequentially(scriptUrls) {
    return scriptUrls.reduce((promise, scriptUrl) => {
        return promise.then(() => {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = scriptUrl;
                script.defer = true;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load script: ${scriptUrl}`));
                document.body.appendChild(script);
            });
        });
    }, Promise.resolve());
}

/**
 * Load an HTML file into a specified element.
 * @param {string} url - The URL to fetch the HTML from.
 * @param {string} elementId - The ID of the element to load the HTML into.
 * @returns {Promise} A promise that resolves when the HTML has been loaded.
 */
function loadHTML(url, elementId) {
    return fetch(url)
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
                    loadScriptsSequentially(["static/js/navigation.js", "static/js/countdown.js"]);
                }
            } else {
                console.error(`Element with ID ${elementId} not found`);
            }
        })
        .catch(error => {
            console.error(`There was a problem with the fetch operation for ${url}:`, error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = document.location.pathname.split('/').slice(1).pop() || document.location.pathname;

    const scriptSources = ["static/js/navigation.js", "static/js/countdown.js"];
    const htmlSources = [["static/utilities/navbar.html", "navbar-placeholder"]];

    if (currentPage === 'rsvp' || currentPage === 'rsvp.html') {
        scriptSources.push("static/js/rsvp.js");
    }
    
    if (currentPage === 'accommodation' || currentPage === 'accommodation.html') {
        scriptSources.push("static/js/table.js");
    }

    // Load HTML first
    htmlSources.forEach(([url, elementId]) => loadHTML(url, elementId));

    // Check if we're on the rsvp-submitted or rsvp-error page
    if (currentPage === 'rsvp-submitted' || currentPage === 'rsvp-error') {
        // Ensure scripts related to form submission are not reloaded
        const index = scriptSources.indexOf("static/js/rsvp.js");
        if (index !== -1) {
            scriptSources.splice(index, 1);
        }
    }

    // Load scripts sequentially
    loadScriptsSequentially(scriptSources);
});
