// dataFetch.js
function fetchDataAndUpdateUI() {
    fetch('/data') // Make sure this endpoint is correctly set up in your Flask app to serve the JSON data
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Call the update functions defined in componentUpdates.js
            updateTemperature(data.temperature_C);
            updateHumidity(data.humidity_percent); // Renamed key without special characters
            updatePressure(data.pressure_hPa);
            updateLightLux(data.light_lux);
            updateUVA(data.UVA);
            updateUVB(data.UVB);
            setUVStatus(data.UV_index);
            updatePM25(data.PM25_ug_m3); // Renamed key without special characters
            updatePM10(data.PM10_ug_m3); // Renamed key without special characters
            updateSoundLevel(data.soundLevelLeft_dB, data.soundLevelRight_dB);
            // Add any additional updates here
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle the error (e.g., show an error message to the user)
        });
}

// Call fetchDataAndUpdateUI on page load
document.addEventListener('DOMContentLoaded', fetchDataAndUpdateUI);