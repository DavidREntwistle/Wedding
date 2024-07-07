// rsvp.js
// This script handles form submission and redirects to success/error pages
// Check if form has been submitted
if (!window.formSubmitted) {
    window.formSubmitted = false;

    // Function to handle form submission
    function submitForm(event) {
        // Prevent multiple form submissions
        if (window.formSubmitted) {
            event.preventDefault();
            return;
        }
        window.formSubmitted = true;

        //console.log('Form submit button pressed');
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const form = document.getElementById('rsvp-form');
        const formData = new FormData(form);

        // Change submit button text to "Submitting..."
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.textContent = 'Submitting...';

        //console.log('Sending request...');
        // Send form data to Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbxq3p_MdHOcKWq0pbJ_Z4M548gptL8h4CgFp2YyzbmcvyYeXuQ_XWasSv0M5pPeTvP8/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            //console.log('Response received.');
            return response.json();
        })
        .then(data => {
            //console.log('Data received:', data);
            // Redirect to success/error page based on response
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
            window.formSubmitted = false;
        });
    }

    // Add event listener to form submission
    document.getElementById('rsvp-form').addEventListener('submit', submitForm);
}

