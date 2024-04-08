// Define the functions before using them
function toggleRainAnimation() {
    const rainAnimation = document.getElementById('rain-animation');
    // Ensure element exists before attempting to toggle class
    if (rainAnimation) {
        rainAnimation.classList.toggle('active');
        document.body.classList.toggle('rainfall'); // Optional: Toggle additional body class for styling
    } else {
        console.error('Rain animation element not found.');
    }
}

function toggleSunAnimation() {
    const sunAnimation = document.getElementById('sun-animation');
    // Ensure element exists before attempting to toggle class
    if (sunAnimation) {
        sunAnimation.classList.toggle('active');
    } else {
        console.error('Sun animation element not found.');
    }
}

// Wait for the document to be fully loaded before setting up event listeners
document.addEventListener('DOMContentLoaded', function() {
    const rainToggle = document.getElementById('rain-toggle');
    const sunToggle = document.getElementById('sun-toggle');

    // Add event listeners that reference the toggling functions
    if (rainToggle) {
        rainToggle.addEventListener('click', toggleRainAnimation);
    } else {
        console.error('Rain toggle button not found.');
    }
    
    if (sunToggle) {
        sunToggle.addEventListener('click', toggleSunAnimation);
    } else {
        console.error('Sun toggle button not found.');
    }
});