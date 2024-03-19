// loadContent.js

// Function to fetch and process JSON data
async function loadContent() {
    const sections = ['home', 'schedule', 'travel', 'accommodation', 'ceremony', 'venue', 'thingstodo', 'faqs', 'rsvp'];

    // Iterate over each section
    for (const section of sections) {
        try {
            const response = await fetch(`assets/content/${section}.json`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${section} content`);
            }
            const data = await response.json();
            populateSection(data, section);
        } catch (error) {
            console.error(`Error loading ${section} content:`, error);
        }
    }
}

// Function to populate section content
function populateSection(data, section) {
    const titleElement = document.getElementById(`${section}-title`);
    const contentElement = document.getElementById(`${section}-content`);
    const imageElement = document.getElementById(`${section}-image`);

    if (titleElement && contentElement && data) {
        titleElement.textContent = data.title || '';
        contentElement.innerHTML = data.content ? data.content.map(line => `<p>${line}</p>`).join('') : '';
        if (imageElement) {
            imageElement.src = data.image || '';
            imageElement.alt = data.title || '';
        }
    }
}

// Call the function to load content
loadContent();
