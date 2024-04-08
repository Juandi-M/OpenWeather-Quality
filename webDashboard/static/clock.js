// Define the updateClock function
function updateClock() {
    const now = new Date();
    // Format the 'now' Date object into a readable string format, e.g., "10:46:56 PM"
    const readableTime = now.toLocaleTimeString('en-US'); // Example for US time format
    const clockElement = document.getElementById('clock');
    if(clockElement) {
        clockElement.textContent = readableTime;
    } else {
        console.error("Clock element not found.");
    }
}

// Wait for the DOM to fully load before running the updateClock function
document.addEventListener('DOMContentLoaded', (event) => {
    updateClock(); // Initialize the clock immediately on load
    setInterval(updateClock, 1000); // Update the clock every second
});