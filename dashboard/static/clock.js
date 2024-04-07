// Updates the clock every second
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
