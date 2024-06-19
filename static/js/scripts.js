// scripts.js
// Used to load in additional scripts, rather than adding each to the index.html
document.addEventListener("DOMContentLoaded", function() {
    // Load additional scripts
    // loadScript("scripts/password.js");
    loadScript("static/js/navigation.js");
    loadScript("static/js/countdown.js");
    if (window.location.pathname.endsWith("/accommodation") || window.location.pathname.endsWith("/accommodation.html")) {
        loadScript("static/js/table.js");
    }
    if (window.location.pathname.endsWith("/rsvp") || window.location.pathname.endsWith("/rsvp.html")) {
        loadScript("static/js/rsvp.js");
    }

// Function to load script dynamically
function loadScript(url) {
    const script = document.createElement("script");
    script.src = url;
    script.defer = true;
    document.body.appendChild(script);
}
});
