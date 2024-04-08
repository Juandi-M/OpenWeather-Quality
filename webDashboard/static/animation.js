// Manages weather animations like rain and sun
document.addEventListener('DOMContentLoaded', function() {
    const rainToggle = document.getElementById('rain-toggle');
    const sunToggle = document.getElementById('sun-toggle');

    rainToggle?.addEventListener('click', toggleRainAnimation);
    sunToggle?.addEventListener('click', toggleSunAnimation);
});

function toggleRainAnimation() {
    document.getElementById('rain-animation').classList.toggle('active');
    document.body.classList.toggle('rainfall');
}

function toggleSunAnimation() {
    document.getElementById('sun-animation').classList.toggle('active');
}
