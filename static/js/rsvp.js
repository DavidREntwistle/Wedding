// rsvp.js
function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById('rsvp-form');
    const formData = new FormData(form);

    // Change submit button text to "Submitting..."
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.textContent = 'Submitting...';

    fetch('https://script.google.com/macros/s/AKfycbxq3p_MdHOcKWq0pbJ_Z4M548gptL8h4CgFp2YyzbmcvyYeXuQ_XWasSv0M5pPeTvP8/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            window.location.href = 'rsvp-submitted'; // Redirect to success page
        } else {
            window.location.href = 'rsvp-error'; // Redirect to error page
        }
    })
    .catch(error => {
        console.error('Error:', error);
        window.location.href = 'rsvp-error'; // Redirect to error page on fetch error
    })
    .finally(() => {
        // Reset submit button text after submission is completed
        submitButton.textContent = 'Submitted!';
    });
}

document.getElementById('rsvp-form').addEventListener('submit', submitForm);
