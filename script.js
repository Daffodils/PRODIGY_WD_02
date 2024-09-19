let startTime, updatedTime, difference, tInterval;  
let running = false;  
let laps = [];  

const display = document.getElementById('display');  
const lapsContainer = document.getElementById('laps');
const toggleModeBtn = document.getElementById('toggleMode');  
const audioStart = new Audio('start.mp3'); // Add your start sound file  
const audioLap = new Audio('lap.mp3'); // Add your lap sound file  
const audioPause = new Audio('pause.mp3'); // Add your pause sound file    

function startTimer() {  
    if (!running) {  
        startTime = new Date().getTime() - (difference || 0);  
        tInterval = setInterval(updateTime, 1);  
        running = true;  
        audioStart.play();
    }  
}  

function updateTime() {  
    updatedTime = new Date().getTime();  
    difference = updatedTime - startTime;  

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));  
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));  
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);  
    const milliseconds = Math.floor((difference % 1000));  

    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;  
}  

function pad(num, size = 2) {  
    let s = "0" + num;  
    return s.substr(s.length - size);  
}  

function pauseTimer() {  
    clearInterval(tInterval);  
    running = false;  
    audioPause.play();
}  

// Toggle Dark Mode  
toggleModeBtn.addEventListener('click', () => {  
    document.body.classList.toggle('dark-mode');  
    document.querySelector('.stopwatch').classList.toggle('dark-mode');  
});  

// Record Lap with Sound  
function recordLap() {  
    if (running) {  
        laps.push(display.innerHTML);  
        renderLaps();  
        audioLap.play();  
    }  
}  

function resetTimer() {  
    clearInterval(tInterval);  
    running = false;  
    difference = 0;  
    display.innerHTML = "00:00:00.000";  
    lapsContainer.innerHTML = "";  
    laps = [];  
}  

function recordLap() {  
    if (running) {  
        laps.push(display.innerHTML);  
        renderLaps();  
    }  
}  

function renderLaps() {  
    lapsContainer.innerHTML = laps.map((lap, index) => `<div class="lap">Lap ${index + 1}: ${lap}</div>`).join('');  
}  

// Event Listeners  
document.getElementById('startBtn').addEventListener('click', startTimer);  
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);  
document.getElementById('resetBtn').addEventListener('click', resetTimer);  
document.getElementById('lapBtn').addEventListener('click', recordLap);