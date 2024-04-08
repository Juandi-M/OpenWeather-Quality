// dataFetch.js
document.addEventListener('DOMContentLoaded', function() {
    function updateTextContentById(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = value; // Use innerHTML for correct rendering, especially for the sound levels
        } else {
            console.error(`${id} element not found`);
        }
    }

    function calculateAndSetPosition(indicatorId, value, min, max) {
        const indicator = document.getElementById(indicatorId);
        if (!indicator) {
            console.error(`${indicatorId} element not found`);
            return;
        }

        // Calculate the position based on the value relative to its range
        let range = max - min;
        if (range === 0) range = 1; // Avoid division by zero
        let relativeValue = value - min;
        let percentPosition = (relativeValue / range) * 100;
        percentPosition = Math.max(0, Math.min(100, percentPosition)); // Clamping between 0% and 100%

        // Adjust position by size of the indicator dot
        let adjustedPosition = `calc(${percentPosition}% - 10px)`;
        indicator.style.left = adjustedPosition;
    }

    function updateAllIndicators(data) {
        console.log("Received data for all indicators:", data);

        // Updating text content for each indicator
        updateTextContentById("temperature", `${data.temperature_C} °C`);
        updateTextContentById("humidity", `${data.humidity_percent} %`);
        updateTextContentById("pressure", `${data.pressure_hPa} hPa`);
        updateTextContentById("lightLux", `${data.light_lux} lux`);
        updateTextContentById("UVA", `${data.UVA} mW/m²`);
        updateTextContentById("UVB", `${data.UVB} mW/m²`);
        updateTextContentById("uvIndex", `Index: ${data.UV_index}`);
        updateTextContentById("PM25", `${data.PM25_ug_m3} µg/m³`);
        updateTextContentById("PM10", `${data.PM10_ug_m3} µg/m³`);
        updateTextContentById("soundLevelLeft", `<span class="label">L:</span> ${data.soundLevelLeft_dB} dB`);
        updateTextContentById("soundLevelRight", `<span class="label">R:</span> ${data.soundLevelRight_dB} dB`);

        // Update positions for indicators
        calculateAndSetPosition('temperatureIndicator', data.temperature_C, -50, 50);
        calculateAndSetPosition('humidityIndicator', data.humidity_percent, 0, 100);
        calculateAndSetPosition('pressureIndicator', data.pressure_hPa, 980, 1050);
        calculateAndSetPosition('uvIndexIndicator', data.UV_index, 0, 11);
        calculateAndSetPosition('lightLuxIndicator', data.light_lux, 0, 120000);
        calculateAndSetPosition('uvaIndicator', data.UVA, 0, 500); // Assuming the range for UVA
        calculateAndSetPosition('uvbIndicator', data.UVB, 0, 500); // Assuming the range for UVB
        calculateAndSetPosition('pm25Indicator', data.PM25_ug_m3, 0, 500); // Assuming the range for PM2.5
        calculateAndSetPosition('pm10Indicator', data.PM10_ug_m3, 0, 500); // Assuming the range for PM10
        // Calculate average sound level (or choose one side if preferred)
        let averageSoundLevel = (data.soundLevelLeft_dB + data.soundLevelRight_dB) / 2;
        calculateAndSetPosition('soundLevelIndicator', averageSoundLevel, 0, 120);


    }

    fetch('/data')
        .then(response => response.json())
        .then(data => {
            updateAllIndicators(data); // Validate and process data before updating indicators
        })
        .catch(error => console.error("Failed to fetch data:", error));
});