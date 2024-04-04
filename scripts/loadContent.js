// loadContent.js

// Function to fetch and process JSON data
async function loadContent() {
    const sections = ['home', 'thedetails', 'travel', 'accommodation', 'ceremony', 'venue', 'thingstodo', 'faqs', 'rsvp'];

    // Iterate over each section
    for (const section of sections) {
        try {
            const response = await fetch(`assets/content/${section}.json`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${section} content`);
            }
            const data = await response.json();
            // console.log(`Fetched ${section} data:`, data); // Log the fetched data
            populateSection(data, section);
        } catch (error) {
            console.error(`Error loading ${section} content:`, error);
        }
    }
}

function populateSection(data, section) {
    const titleElement = document.getElementById(`${section}-title`);
    const contentContainer = document.getElementById(`${section}-content`);
    const imageElement = document.getElementById(`${section}-image`);

    if (data && data.content && contentContainer) {
        // Set the title if available
        if (titleElement) {
            titleElement.textContent = data.title || '';
        }

        // Clear existing content
        contentContainer.innerHTML = '';

        // Populate content paragraphs
        data.content.forEach((line, index) => {
            const paragraph = document.createElement('p');
            paragraph.textContent = line.trim(); // Trim any leading/trailing whitespace
            paragraph.id = `${section}-content-${index + 1}`; // Unique ID for each paragraph
            contentContainer.appendChild(paragraph); // Append paragraph to content container
        });

        // Update image element if image URL is provided
        if (imageElement && data.image) {
            imageElement.src = data.image;
            imageElement.alt = data.title || '';
        }
    }
}

// Call the function to load content
loadContent();
