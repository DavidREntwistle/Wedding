// scripts.js
// Used to load in additional scripts, rather than adding each to the index.html
document.addEventListener("DOMContentLoaded", function() {
    // Load additional scripts
    // loadScript("scripts/password.js");
    loadScript("scripts/navigation.js");
    loadScript("scripts/countdown.js");
    loadScript("scripts/loadContent.js");
    loadScript("https://cdn.jsdelivr.net/npm/simplebar/dist/simplebar.min.js");

// Function to load script dynamically
function loadScript(url) {
    const script = document.createElement("script");
    script.src = url;
    script.defer = true;
    document.body.appendChild(script);
}
});
