// statusIndicator.js

// Calculate the position of the indicator within the bar
function calculatePosition(value, min, max, offset) {
    const position = ((value - min) / (max - min)) * 100;
    return Math.min(Math.max(position, offset), 100 - offset); // Clamp position to prevent overflow
}

// Update the UV index indicator position
function setUVStatus(uvIndex) {
    const uvPointer = document.getElementById('uvIndexIndicator');
    if (!uvPointer) return;
    const uvPosition = calculatePosition(uvIndex, 1, 11, 0); // Assuming UV index range from 1 to 11
    uvPointer.style.left = `${uvPosition}%`;
}

// Update the humidity indicator position
function setHumidityStatus(humidity) {
    const humidityPointer = document.getElementById('humidityIndicator');
    if (!humidityPointer) return;
    const humidityPosition = calculatePosition(humidity, 0, 100, 0); // Assuming humidity range from 0% to 100%
    humidityPointer.style.left = `${humidityPosition}%`;
}

// Update the temperature indicator position
function setTemperatureStatus(temperature) {
    const temperaturePointer = document.getElementById('temperatureIndicator');
    if (!temperaturePointer) return;
    const temperaturePosition = calculatePosition(temperature, -20, 50, 0); // Assuming temperature range from -20°C to 50°C
    temperaturePointer.style.left = `${temperaturePosition}%`;
}

// Update the pressure indicator position
function setPressureStatus(pressure) {
    const pressurePointer = document.getElementById('pressureIndicator');
    if (!pressurePointer) return;
    const pressurePosition = calculatePosition(pressure, 950, 1050, 0); // Assuming pressure range from 950hPa to 1050hPa
    pressurePointer.style.left = `${pressurePosition}%`;
}

// Update the light lux indicator position
function setLightLuxStatus(lightLux) {
    const lightLuxPointer = document.getElementById('lightLuxIndicator');
    if (!lightLuxPointer) return;
    const lightLuxPosition = calculatePosition(lightLux, 0, 100000, 0); // Assuming light lux range from 0 to 100,000 Lux
    lightLuxPointer.style.left = `${lightLuxPosition}%`;
}

// Update the air quality indicator position
function setAirQualityStatus(airQuality) {
    const airQualityPointer = document.getElementById('airQualityIndicator');
    if (!airQualityPointer) return;
    const airQualityPosition = calculatePosition(airQuality, 0, 500, 0); // Placeholder range for air quality
    airQualityPointer.style.left = `${airQualityPosition}%`;
}

// Update the sound level indicator position
function setSoundLevelStatus(soundLevel) {
    const soundLevelPointer = document.getElementById('soundLevelIndicator');
    if (!soundLevelPointer) return;
    const soundLevelPosition = calculatePosition(soundLevel, 0, 120, 0); // Assuming sound level range from 0dB to 120dB
    soundLevelPointer.style.left = `${soundLevelPosition}%`;
}

// Update the PM2.5 indicator position
function setPM25Status(PM25) {
    const pm25Pointer = document.getElementById('pm25Indicator');
    if (!pm25Pointer) return;
    const pm25Position = calculatePosition(PM25, 0, 500, 0); // Placeholder range for PM2.5
    pm25Pointer.style.left = `${pm25Position}%`;
}

// Update the PM10 indicator position
function setPM10Status(PM10) {
    const pm10Pointer = document.getElementById('pm10Indicator');
    if (!pm10Pointer) return;
    const pm10Position = calculatePosition(PM10, 0, 500, 0); // Placeholder range for PM10
    pm10Pointer.style.left = `${pm10Position}%`;
}