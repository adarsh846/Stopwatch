let startTime;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let running = false;
let laps = [];

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        timerInterval = requestAnimationFrame(updateTimer);
        running = true;
        toggleButtons(true);
    }
}

function pauseTimer() {
    if (running) {
        cancelAnimationFrame(timerInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        toggleButtons(false);
    }
}

function resetTimer() {
    cancelAnimationFrame(timerInterval);
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    running = false;
    timeDisplay.innerHTML = '00:00:00:00';
    laps = [];
    lapsContainer.innerHTML = '';
    toggleButtons(false);
}

function updateTimer() {
    updatedTime = new Date().getTime() - startTime;
    timeDisplay.innerHTML = formatTime(updatedTime);
    if (running) {
        timerInterval = requestAnimationFrame(updateTimer);
    }
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 2)}`;
}

function pad(unit, length = 2) {
    return unit.toString().padStart(length, '0');
}

function recordLap() {
    if (running) {
        const lapTime = formatTime(updatedTime);
        laps.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.setAttribute('data-lap-number', laps.length);
        lapElement.innerHTML = `<span class="lap-time">${lapTime}</span>`;
        lapsContainer.appendChild(lapElement);

        lapElement.style.animation = 'none';
        setTimeout(() => lapElement.style.animation = 'slideIn 0.5s forwards', 100);
    }
}

function toggleButtons(isRunning) {
    startBtn.disabled = isRunning;
    pauseBtn.disabled = !isRunning;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);