const timerDisplay = document.querySelector('.timer');
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');
const lapButton = document.querySelector('.lap');
const lapTimesList = document.querySelector('.lap-times');

let startTime; 
let pausedTime = 0; 
let timerInterval; 

function startStopwatch() {
    const now = Date.now();
    if (startTime) {
        startTime = now - pausedTime;
    } else {
        startTime = now;
    }
    timerInterval = setInterval(updateTimer, 10); 
}
function pauseStopwatch() {
    clearInterval(timerInterval);
    const now = Date.now();
    pausedTime = now - startTime;
}


function resetStopwatch() {
    clearInterval(timerInterval);
    startTime = null; 
    pausedTime = 0;
    updateTimer(); 
    lapTimesList.innerHTML = ''; 
    timerDisplay.textContent = '00:00:00.000'; 
}

function recordLapTime() {
    if (startTime) {
        const lapTime = calculateElapsedTime();
        const lapItem = document.createElement('li');
        lapItem.textContent = formatTime(lapTime);
        lapTimesList.appendChild(lapItem);
    }
}

function updateTimer() {
    const elapsedTime = calculateElapsedTime();
    timerDisplay.textContent = formatTime(elapsedTime);
}


function calculateElapsedTime() {
    const now = Date.now();
    const elapsedTime = now - startTime;
    return elapsedTime;
}

 //HH:MM:SS.MMM format
function formatTime(time) {
    const totalMilliseconds = time;
    const milliseconds = Math.floor(totalMilliseconds % 1000);
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
}

function pad(number) {
    return (number < 10) ? '0' + number : number;
}

function padMilliseconds(milliseconds) {
    if (milliseconds < 10) {
        return "00" + milliseconds;
    } else if (milliseconds < 100) {
        return "0" + milliseconds;
    } else {
        return milliseconds;
    }
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLapTime);
