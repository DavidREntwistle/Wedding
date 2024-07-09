// calendar.js
document.getElementById('addToCalendar').addEventListener('click', function() {
    // Define the event details
    var event = {
      name: "Shaina & David's Wedding",
      location: "Holy Cross Church, Summerhill, Tramore, Co. Waterford, Ireland",
      dateStart: '20250307T123000Z',
      dateEnd: '20250308T013000Z',
      description: "Ceremony at Holy Cross Church, 12:30pm - https://maps.app.goo.gl/aV97s9SRs9iHYNnc7\nReception at Faithlegg House Hotel, 3:00pm - https://maps.app.goo.gl/JyhrPo79qtytHxfF8",
      url: "https://shaina-david.com/details"
    };
  
    // Generate the calendar file
    var calendarFile = generateCalendarFile(event);
  
    // Trigger download
    downloadCalendarFile(calendarFile);
});
  
// Function to generate calendar file content (ICS format)
function generateCalendarFile(event) {
    var calendarContent =
        'BEGIN:VCALENDAR\n' +
        'VERSION:2.0\n' +
        'PRODID:-//Shaina & David\'s Wedding//Personal Webpage//EN\n' +
        'BEGIN:VEVENT\n' +
        'UID:' + generateUID() + '\n' +
        'DTSTAMP:' + getFormattedDate(new Date()) + '\n' +
        'SUMMARY:' + escapeICSString(event.name) + '\n' +
        'LOCATION:' + escapeICSString(event.location) + '\n' +
        'DESCRIPTION:' + escapeICSString(event.description) + '\n' +
        'URL;VALUE=URI:' + escapeICSString(event.url) + '\n' +
        'DTSTART:' + event.dateStart + '\n' +
        'DTEND:' + event.dateEnd + '\n' +
        'END:VEVENT\n' +
        'END:VCALENDAR';

    return calendarContent;
}

// Function to generate a unique identifier for the event
function generateUID() {
    return 'uid-' + Date.now() + '@shaina-david.com';
}

// Function to get the current date in the required format (YYYYMMDDTHHmmssZ)
function getFormattedDate(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

// Function to escape special characters in ICS file fields
function escapeICSString(string) {
    return string.replace(/([\,;])/g, '\\$1').replace(/\n/g, '\\n');
}

// Function to trigger download of calendar file
function downloadCalendarFile(calendarContent) {
    var calendarBlob = new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' });
    var calendarUrl = URL.createObjectURL(calendarBlob);

    var a = document.createElement('a');
    a.href = calendarUrl;
    a.target = '_blank';
    a.download = 'event.ics';
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(calendarUrl);
}
