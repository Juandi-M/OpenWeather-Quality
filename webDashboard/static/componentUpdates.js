// componentUpdates.js

// Cache DOM elements for performance
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const pressureElement = document.getElementById('pressure');
const lightLuxElement = document.getElementById('lightLux');
const uvaElement = document.getElementById('UVA');
const uvbElement = document.getElementById('UVB');
const uvIndexElement = document.getElementById('uvIndex');
const pm25Element = document.getElementById('PM25');
const pm10Element = document.getElementById('PM10');
const soundLevelLeftElement = document.getElementById('soundLevelLeft');
const soundLevelRightElement = document.getElementById('soundLevelRight');

// Helper function to update the text content and status bar
function updateIndicator(element, value, statusFunction) {
    if (element) {
        element.textContent = value;
        if (statusFunction) {
            statusFunction(parseFloat(value));
        }
    }
}

// Update functions for each indicator
function updateTemperature(tempC) {
    updateIndicator(temperatureElement, `${tempC} °C`, setTemperatureStatus);
}

function updateHumidity(humidity) {
    updateIndicator(humidityElement, `${humidity}%`, setHumidityStatus);
}

function updatePressure(pressure) {
    updateIndicator(pressureElement, `${pressure} hPa`, setPressureStatus);
}

function updateLightLux(lightLux) {
    updateIndicator(lightLuxElement, `${lightLux} Lux`, setLightLuxStatus);
}

function updateSoundLevel(left, right) {
    const averageSoundLevel = ((parseFloat(left) + parseFloat(right)) / 2).toFixed(1);
    updateIndicator(soundLevelLeftElement, `L: ${left} dB`);
    updateIndicator(soundLevelRightElement, `R: ${right} dB`);
    setSoundLevelStatus(averageSoundLevel);
}

function updateUVA(UVA) {
    updateIndicator(uvaElement, `${UVA} mW/m²`, setUVAStatus);
}

function updateUVB(UVB) {
    updateIndicator(uvbElement, `${UVB} mW/m²`, setUVBStatus);
}

function updateUVIndex(uvIndex) {
    updateIndicator(uvIndexElement, `Index: ${uvIndex}`, setUVStatus);
}

function updatePM25(PM25) {
    updateIndicator(pm25Element, `${PM25} µg/m³`, setPM25Status);
}

function updatePM10(PM10) {
    updateIndicator(pm10Element, `${PM10} µg/m³`, setPM10Status);
}

// Call this function to update all indicators with new data
function updateAllIndicators(data) {
    updateTemperature(data.temperature_C);
    updateHumidity(data.humidity_percent);
    updatePressure(data.pressure_hPa);
    updateLightLux(data.light_lux);
    updateSoundLevel(data.soundLevelLeft_dB, data.soundLevelRight_dB);
    updateUVA(data.UVA);
    updateUVB(data.UVB);
    updateUVIndex(data.UV_index);
    updatePM25(data.PM25_ug_m3);
    updatePM10(data.PM10_ug_m3);
}