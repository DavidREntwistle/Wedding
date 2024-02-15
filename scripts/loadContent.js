// loadContent.js
// Load text content from a file and display it in the specified section

async function loadContent(sectionId, filePath) {
    try {
        const response = await fetch(filePath);
        const text = await response.text();
        document.getElementById(sectionId).innerText = text;
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

loadContent('home-content', 'assets/content/home.txt');
loadContent('couple-content', 'assets/content/couple.txt');
loadContent('where-content', 'assets/content/where.txt');
loadContent('when-content', 'assets/content/when.txt');
loadContent('rsvp-content', 'assets/content/rsvp.txt');
