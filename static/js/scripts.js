// scripts.js
// This script dynamically loads additional scripts and HTML elements
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
                script.src = `${scriptUrl}?v=${new Date().getTime()}`; // Cache busting
                script.async = true; // Load asynchronously
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load script: ${scriptUrl}`));
                document.body.appendChild(script);
            });
        });
    }, Promise.resolve());
}

/**
 * Fetches HTML, loads into element. If element found, sets innerHTML. Logs error if not.
 * @param {string} url - HTML source URL.
 * @param {string} elementId - ID of element to load HTML into.
 * @returns {Promise} Promise that resolves when HTML is loaded.
 */
function loadHTML(url, elementId) {
    // Fetch the HTML file from the specified URL
    return fetch(url)
        .then(response => {
            // If the response is not ok, throw an error
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            // Return the response text
            return response.text();
        })
        .then(data => {
            // Find the element with the specified ID
            const element = document.getElementById(elementId);
            // If the element is found, set its innerHTML to the fetched data
            if (element) {
                element.innerHTML = data;
                //console.log(`Loaded HTML into element with ID: ${elementId}`);
                // Load scripts only after HTML is loaded to ensure placeholder elements are available
                if (elementId === "navbar-placeholder") {
                    // Load the navigation.js and countdown.js scripts
                    loadScriptsSequentially(["static/js/navigation.js", "static/js/countdown.js"]);
                }
            } else {
                // Log an error message if the element is not found
                console.error(`Element with ID ${elementId} not found`);
            }
        })
        .catch(error => {
            // Log an error message if there was a problem with the fetch operation
            console.error(`There was a problem with the fetch operation for ${url}:`, error);
        });
}

// Called when the initial HTML document is fully loaded.
document.addEventListener("DOMContentLoaded", () => {
    // Get the current page URL
    const currentPage = document.location.pathname; // Example: "/index.html"

    // Initialize the script sources and HTML sources arrays
    const scriptSources = ["static/js/navigation.js", "static/js/countdown.js"];
    const htmlSources = [["static/utilities/navbar.html", "navbar-placeholder"]];
    
    // Load HTML first
    htmlSources.forEach(([url, elementId]) => loadHTML(url, elementId));

    if (['/rsvp', '/rsvp.html'].includes(currentPage)) {
        scriptSources.push("static/js/rsvp.js");
    }
    
    if (['/accommodation', '/accommodation.html'].includes(currentPage)) {
        scriptSources.push("static/js/table.js");
    }

    if (['', '/', '/index.html'].includes(currentPage)) {
        scriptSources.push("static/js/slideshow.js");
    }

    if (['/rsvp-submitted', '/rsvp-error'].includes(currentPage)) {
        // Ensure scripts related to form submission are not reloaded
        const index = scriptSources.indexOf("static/js/rsvp.js");
        if (index !== -1) {
            scriptSources.splice(index, 1);
        }
    }

    // Load scripts sequentially
    loadScriptsSequentially(scriptSources)
        .catch(error => {
            console.error("Error loading scripts:", error);
        });
});
