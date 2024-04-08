// Calculate the position of the indicator within the bar
function calculatePosition(value, min, max) {
    if (min === max || isNaN(value)) return 0; // Avoid division by zero and ensure value is a number
    const position = ((value - min) / (max - min)) * 100;
    return Math.min(Math.max(position, 0), 100); // Clamp position between 0% and 100%
}

// Set the position of an indicator
function setIndicatorPosition(indicatorId, value, min, max) {
    const indicator = document.getElementById(indicatorId);
    if (!indicator) {
        console.error(`${indicatorId} element not found`);
        return;
    }
    const position = calculatePosition(value, min, max);
    console.log(`${indicatorId} - Value: ${value}, Position: ${position}%`); // Debugging
    indicator.style.left = `${position}%`;
}

// Update the UV Index indicator position
function setUVStatus(uvIndex) {
    setIndicatorPosition('uvIndexIndicator', uvIndex, 0, 11);
}

// Update the UVA indicator position
function setUVAStatus(UVA) {
    setIndicatorPosition('uvaIndicator', UVA, 0, 900);
}

// Update the UVB indicator position
function setUVBStatus(UVB) {
    setIndicatorPosition('uvbIndicator', UVB, 0, 450);
}

// Update the Humidity indicator position
function setHumidityStatus(humidity) {
    setIndicatorPosition('humidityIndicator', humidity, 0, 100);
}

// Update the Temperature indicator position
function setTemperatureStatus(temperature) {
    setIndicatorPosition('temperatureIndicator', temperature, -50, 50);
}

// Update the Pressure indicator position
function setPressureStatus(pressure) {
    setIndicatorPosition('pressureIndicator', pressure, 950, 1050);
}

// Update the Light Lux indicator position
function setLightLuxStatus(lightLux) {
    setIndicatorPosition('lightLuxIndicator', lightLux, 0, 120000);
}

// Update the Sound Level indicator position
function setSoundLevelStatus(averageSoundLevel) {
    setIndicatorPosition('soundLevelIndicator', averageSoundLevel, 0, 130);
}

// Update the PM2.5 indicator position
function setPM25Status(PM25) {
    setIndicatorPosition('pm25Indicator', PM25, 0, 500);
}

// Update the PM10 indicator position
function setPM10Status(PM10) {
    setIndicatorPosition('pm10Indicator', PM10, 0, 500);
}

// Determine the color class based on UV value
function getUVColorClass(UVValue, type) {
    const thresholds = type === 'uva' ? { low: 300, moderate: 600, high: 900 }
                                       : { low: 150, moderate: 300, high: 450 };
    if (UVValue < thresholds.low) return 'uv-low';
    if (UVValue < thresholds.moderate) return 'uv-moderate';
    if (UVValue < thresholds.high) return 'uv-high';
    return 'uv-very-high';
}