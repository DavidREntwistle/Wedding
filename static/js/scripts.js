// scripts.js
// This script dynamically loads additional scripts and HTML elements
/**
 * Load scripts sequentially.
 * @param {Array} scriptUrls - An array of script URLs to load.
 * @returns {Promise} A promise that resolves when all scripts have loaded.
 */
function loadScriptsSequentially(scriptUrls) {
    // Use reduce to create a promise chain.
    return scriptUrls.reduce((promise, scriptUrl) => {
        // For each script URL in the array, create a new promise.
        return promise.then(() => {
            return new Promise((resolve, reject) => {
                //console.log(`Loading script: ${scriptUrl}`);
                // Create a new script element.
                const script = document.createElement("script");
                // Set the script source to the current URL.
                script.src = scriptUrl;
                // Set the script to defer loading, so it doesn't block rendering.
                script.defer = true;
                // When the script has loaded, resolve the promise.
                script.onload = () => {
                    //console.log(`Successfully loaded script: ${scriptUrl}`);
                    resolve();
                };
                // If there is an error loading the script, reject the promise with an error.
                script.onerror = () => {
                    console.error(`Failed to load script: ${scriptUrl}`);
                    reject(new Error(`Failed to load script: ${scriptUrl}`));
                };
                // Append the script to the document body.
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
    //console.log("DOM fully loaded and parsed");
    // Get the current page URL
    const currentPage = document.location.pathname.split('/').slice(1).pop() || document.location.pathname;

    // Initialize the script sources and HTML sources arrays
    const scriptSources = ["static/js/navigation.js", "static/js/countdown.js"];
    const htmlSources = [["static/utilities/navbar.html", "navbar-placeholder"]];

    // Check if the current page is the RSVP page or the RSVP page with .html extension
    if (currentPage === 'rsvp' || currentPage === 'rsvp.html') {
        // If it is, add the RSVP script source to the array
        scriptSources.push("static/js/rsvp.js");
    }
    
    // Check if the current page is the Accommodation page or the Accommodation page with .html extension
    if (currentPage === 'accommodation' || currentPage === 'accommodation.html') {
        // If it is, add the table script source to the array
        scriptSources.push("static/js/table.js");
    }

    // Check if the current page is the home page
    if (currentPage === '/' || currentPage === 'index.html') {
        // If it is, add the slideshow script source to the array
        //console.log("Current page is home, loading slideshow.js");
        scriptSources.push("static/js/slideshow.js");
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
    loadScriptsSequentially(scriptSources)
        .then(() => {
            //console.log("All scripts loaded successfully");
        })
        .catch(error => {
            console.error("Error loading scripts:", error);
        });
});
