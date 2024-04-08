// dataFetch.js

// Function to fetch data and update the UI
function fetchDataAndUpdateUI() {
    fetch('/data') // Make sure this endpoint is correctly set up in your Flask app to serve the JSON data
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(updateAllIndicators) // Pass the data to the function that updates all indicators
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle the error (e.g., show an error message to the user)
        });
}

// Call fetchDataAndUpdateUI on page load
document.addEventListener('DOMContentLoaded', fetchDataAndUpdateUI);