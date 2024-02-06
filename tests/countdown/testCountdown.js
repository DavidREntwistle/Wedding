// testCountdown.js
// Rather than run the test script in browser against the true function, we use a non-html version of the same function
// Function to check if the console output contains the expected message
function checkConsoleOutput(expectedMessage, capturedOutput) {
    const messageDisplayed = capturedOutput.includes(expectedMessage);
    console.log(`Expected message: ${expectedMessage}`);
    console.log(`Message displayed: ${capturedOutput}`);
    if (messageDisplayed) {
        console.log("Test Result: Passed");
    } else {
        console.log("Test Result: Failed");
    }
}

// Function to capture console output
function captureConsoleOutput(callback) {
    const log = console.log;
    let output = '';
    console.log = (message) => {
        output += message + '\n';
    };
    // Run the callback function here
    callback();
    console.log = log; // Restore original console.log
    return output.trim();
}

// Define the updateCountdown function
function updateCountdown(now) {
    // Set the wedding date and time in local timezone (Ireland)
    const weddingDate = new Date('March 7, 2025 12:00:00 GMT+0000');

    // Calculate the difference in milliseconds
    const diff = weddingDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Check the conditions to return appropriate message
    if (now >= weddingDate) {
        // Return "Just Married!" message
        return "Just Married!";
    } else if (days === 0 && hours < 24) {
        // Return "Today is the day!" message
        return `Today is the day! Countdown displayed: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    } else if (days > 0 || (days === 0 && hours >= 24)) {
        // Return countdown message
        return `Countdown displayed: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }
}

// Test cases for the countdown conditions
console.log("Countdown Displayed:");
console.log("\nExactly 1 year before the wedding.");
const testDate1 = new Date('March 7, 2024 12:00:00 GMT+0000');
const output1 = captureConsoleOutput(() => {
    console.log(updateCountdown(testDate1));
});
checkConsoleOutput("Countdown displayed", output1);

console.log("\nExactly 1 week before the wedding.");
const testDate2 = new Date('February 28, 2025 12:00:00 GMT+0000');
const output2 = captureConsoleOutput(() => {
    console.log(updateCountdown(testDate2));
});
checkConsoleOutput("Countdown displayed", output2);

console.log("\nExactly 1 day before the wedding.");
const testDate3 = new Date('March 6, 2025 12:00:00 GMT+0000');
const output3 = captureConsoleOutput(() => {
    console.log(updateCountdown(testDate3));
});
checkConsoleOutput("Countdown displayed", output3);

console.log("\nToday is the day! Countdown Displayed:");
console.log("\nExactly 23 hours, 59 minutes, and 59 seconds before the wedding.");
const testDate4 = new Date('March 6, 2025 12:00:01 GMT+0000');
const output4 = captureConsoleOutput(() => {
    console.log(updateCountdown(testDate4));
});
checkConsoleOutput("Today is the day! Countdown displayed", output4);

console.log("\nExactly 1 hour before the wedding.");
const testDate5 = new Date('March 7, 2025 11:00:00 GMT+0000');
const output5 = captureConsoleOutput(() => {
    console.log(updateCountdown(testDate5));
});
checkConsoleOutput("Today is the day! Countdown displayed", output5);

console.log("\nExactly 1 minute before the wedding.");
const testDate6 = new Date('March 7, 2025 11:59:00 GMT+0000');
const output6 = captureConsoleOutput(() => {
    console.log(updateCountdown(testDate6));
});
checkConsoleOutput("Today is the day! Countdown displayed", output6);

console.log("\nJust Married!:");
console.log("\nExactly at the wedding time.");
const testDate7 = new Date('March 7, 2025 12:00:00 GMT+0000');
const output7 = captureConsoleOutput(() => {
    console.log(updateCountdown(testDate7));
});
checkConsoleOutput("Just Married!", output7);

console.log("\nExactly 1 minute after the wedding.");
const testDate8 = new Date('March 7, 2025 12:00:01 GMT+0000');
const output8 = captureConsoleOutput(() => {
    console.log(updateCountdown(testDate8));
});
checkConsoleOutput("Just Married!", output8);

console.log("\nOne day after the wedding.");
const testDate9 = new Date('March 8, 2025 12:00:00 GMT+0000');
const output9 = captureConsoleOutput(() => {
    console.log(updateCountdown(testDate9));
});
checkConsoleOutput("Just Married!", output9);

console.log("\nTwo days after the wedding.");
const testDate10 = new Date('March 9, 2025 12:00:00 GMT+0000');
const output10 = captureConsoleOutput(() => {
    console.log(updateCountdown(testDate10));
});
checkConsoleOutput("Just Married!", output10);

console.log("\nCountdown Displayed - Different Time Zones:");
console.log("\nWedding date in Texas time zone, countdown displayed.");
const testDate11 = new Date('March 6, 2025 06:00:00 GMT-0600');
const output11 = captureConsoleOutput(() => {
    console.log(updateCountdown(testDate11));
});
checkConsoleOutput("Countdown displayed", output11);

console.log("\nWedding date in Vancouver time zone, countdown displayed.");
const testDate12 = new Date('March 6, 2025 02:00:00 GMT-0800');
const output12 = captureConsoleOutput(() => {
    console.log(updateCountdown(testDate12));
});
checkConsoleOutput("Countdown displayed", output12);

console.log("\nWedding date in Texas time zone, one hour before, countdown displayed.");
const testDate13 = new Date('March 6, 2025 11:00:00 GMT-0600');
const output13 = captureConsoleOutput(() => {
    console.log(updateCountdown(testDate13));
});
checkConsoleOutput("Today is the day! Countdown displayed", output13);

console.log("\nWedding date in Vancouver time zone, one hour before, countdown displayed.");
const testDate14 = new Date('March 6, 2025 11:00:00 GMT-0800');
const output14 = captureConsoleOutput(() => {
    console.log(updateCountdown(testDate14));
});
checkConsoleOutput("Today is the day! Countdown displayed", output14);
