// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Update the clock every second
    updateClock();
    setInterval(updateClock, 1000);

    // Toggle theme based on the user's preference stored in local storage
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const bodyClassList = document.body.classList;
            bodyClassList.toggle('dark-theme');
            localStorage.setItem('theme', bodyClassList.contains('dark-theme') ? 'dark' : 'light');
        });
    }

    // Apply the theme preference from local storage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Toggle weather animations
    const rainToggle = document.getElementById('rain-toggle');
    const sunToggle = document.getElementById('sun-toggle');
    const rainAnimation = document.getElementById('rain-animation');
    const sunAnimation = document.getElementById('sun-animation');

    if (rainToggle && rainAnimation) {
        rainToggle.addEventListener('click', function() {
            rainAnimation.classList.toggle('active');
            document.body.classList.toggle('rainfall'); // Optional: For additional full-page rain effect
            if (sunAnimation.classList.contains('active')) {
                sunAnimation.classList.remove('active');
            }
        });
    }

    if (sunToggle && sunAnimation) {
        sunToggle.addEventListener('click', function() {
            sunAnimation.classList.toggle('active');
            if (rainAnimation.classList.contains('active')) {
                rainAnimation.classList.remove('active');
                document.body.classList.remove('rainfall'); // Stop the full-page rain effect if active
            }
        });
    }

    // Example data - in a real scenario, this should be fetched from your server
    const exampleData = {
        uvIndex: 5, // Example UV index
        humidityPercent: 70 // Example humidity percentage
    };

    // Set the color status based on values
    setUVStatus(exampleData.uvIndex);
    setHumidityStatus(exampleData.humidityPercent);
});

function updateClock() {
    const now = new Date();
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = now.toLocaleTimeString();
    }
}

function setUVStatus(uvIndex) {
    const uvStatus = document.getElementById('uv-status');
    if (!uvStatus) return;

    uvStatus.className = 'status-indicator'; // Reset class
    if (uvIndex <= 2) uvStatus.classList.add('uv-low');
    else if (uvIndex <= 5) uvStatus.classList.add('uv-moderate');
    else if (uvIndex <= 7) uvStatus.classList.add('uv-high');
    else if (uvIndex <= 10) uvStatus.classList.add('uv-very-high');
    else uvStatus.classList.add('uv-extreme');
}

function setHumidityStatus(humidity) {
    const humidityStatus = document.getElementById('humidity-status');
    if (!humidityStatus) return;

    humidityStatus.className = 'status-indicator'; // Reset class
    if (humidity < 30) humidityStatus.classList.add('humidity-dry');
    else if (humidity < 60) humidityStatus.classList.add('humidity-mild');
    else if (humidity < 90) humidityStatus.classList.add('humidity-high');
    else humidityStatus.classList.add('humidity-very-high');
}

// This simulates data fetching; replace it with actual AJAX calls to retrieve fresh data
function fetchData() {
    // Simulate data update by reloading the page or fetching new data
    console.log("Fetching new data...");
    // In a real-world scenario, you would make an AJAX call here
    // For demo purposes, we'll refresh the UV and humidity status indicators with random values
    setUVStatus(Math.floor(Math.random() * 11)); // UV index from 0 to 10
    setHumidityStatus(Math.floor(Math.random() * 100)); // Humidity percentage from 0 to 100
}

// Refresh data every 5 minutes (300000 milliseconds)
setInterval(fetchData, 300000);