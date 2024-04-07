// componentUpdates.js

// Cache DOM elements for performance
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const pressureElement = document.getElementById('pressure');
const lightLuxElement = document.getElementById('lightLux');
const uvaElement = document.getElementById('UVA');
const uvbElement = document.getElementById('UVB');
const pm25Element = document.getElementById('PM25');
const pm10Element = document.getElementById('PM10');
const soundLevelLeftElement = document.getElementById('soundLevelLeft');
const soundLevelRightElement = document.getElementById('soundLevelRight');

function updateTemperature(tempC) {
    if (temperatureElement) temperatureElement.textContent = `${tempC} °C`;
    setTemperatureStatus(tempC); // Update the temperature bar
}

function updateHumidity(humidity) {
    if (humidityElement) humidityElement.textContent = `${humidity}%`;
    setHumidityStatus(humidity); // Update the humidity bar
}

function updatePressure(pressure) {
    if (pressureElement) pressureElement.textContent = `${pressure} hPa`;
    setPressureStatus(pressure); // Update the pressure bar
}

function updateLightLux(lightLux) {
    if (lightLuxElement) lightLuxElement.textContent = `${lightLux} Lux`;
    setLightLuxStatus(lightLux); // Update the light lux bar
}

function updateSoundLevel(left, right) {
    if (soundLevelLeftElement) soundLevelLeftElement.textContent = `L: ${left} dB`;
    if (soundLevelRightElement) soundLevelRightElement.textContent = `R: ${right} dB`;
}

function updateUVA(UVA) {
    if (uvaElement) uvaElement.textContent = `UVA: ${UVA}`;
}

function updateUVB(UVB) {
    if (uvbElement) uvbElement.textContent = `UVB: ${UVB}`;
}

function updatePM25(PM25) {
    if (pm25Element) pm25Element.textContent = `${PM25} µg/m³`;
    setPM25Status(PM25); // Update the PM2.5 bar
}

function updatePM10(PM10) {
    if (pm10Element) pm10Element.textContent = `${PM10} µg/m³`;
    setPM10Status(PM10); // Update the PM10 bar
}

// Add more update functions as needed for other indicators