// rsvp.js
// Function to validate the form
function validateForm() {
    var firstName = document.getElementById("first-name").value.trim();
    var lastName = document.getElementById("last-name").value.trim();
    var emailAddress = document.getElementById("email-address").value.trim();
    var contactNumber = document.getElementById("contact-number").value.trim();
    var attendYes = document.getElementById("attend-yes").checked;
    var attendNo = document.getElementById("attend-no").checked;

    if (firstName === "") {
        alert("Please enter your First Name.");
        return false;
    }

    if (lastName === "") {
        alert("Please enter your Last Name.");
        return false;
    }

    if (emailAddress === "") {
        alert("Please enter your Email Address.");
        return false;
    }

    if (contactNumber === "") {
        alert("Please enter your Contact Number.");
        return false;
    }

    if (!attendYes && !attendNo) {
        alert("Please select if you can attend.");
        return false;
    }

    return true; // Form is valid and can be submitted
}

function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById('rsvp-form');
    const formData = new FormData(form);

    // Change submit button text to "Submitting..."
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.textContent = 'Sending...';

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
        submitButton.textContent = 'Submit';
    });
}

document.getElementById('rsvp-form').addEventListener('submit', submitForm);
