const TIMER_INTERVAL = 1000;

// State
let hours = 0;
let minutes = 0;
let seconds = 0;
let savedMinutes = 0; // waktu dari input user
let timer = null;
let isRunning = false;

// DOM Elements
const hourDisplay = document.getElementById('jam');
const minuteDisplay = document.getElementById('menit');
const secondDisplay = document.getElementById('detik');

const startButton = document.getElementById('mulai');
const stopButton = document.getElementById('berhenti');
const resetButton = document.getElementById('reset');
const saveButton = document.getElementById('simpan');
const inputMinutes = document.getElementById('input-menit');

// Display waktu
function updateDisplay() {
    hourDisplay.textContent = formatTime(hours);
    minuteDisplay.textContent = formatTime(minutes);
    secondDisplay.textContent = formatTime(seconds);
}

// Format angka ke dua digit
function formatTime(unit) {
    return String(unit).padStart(2, '0');
}

// Simpan input dari pengguna
function saveInputTime() {
    const input = parseInt(inputMinutes.value, 10);

    if (isNaN(input) || input <= 0 || input > 180) {
        alert("Masukkan waktu (menit) antara 1 - 180.");
        return;
    }

    savedMinutes = input;
    resetTimer(); // reset timer ke nilai baru
}

// Mulai timer
function startTimer() {
    if (isRunning || (hours === 0 && minutes === 0 && seconds === 0)) {
        if (savedMinutes === 0) {
            alert("Masukkan dan simpan waktu Pomodoro terlebih dahulu.");
            return;
        }

        minutes = savedMinutes;
        seconds = 0;
        hours = 0;
        updateDisplay();
    }

    isRunning = true;
    timer = setInterval(runTimer, TIMER_INTERVAL);
}

// Jalankan per detik
function runTimer() {
    if (hours === 0 && minutes === 0 && seconds === 0) {
        stopTimer();
        alert("Waktu habis!");
        return;
    }

    if (seconds === 0) {
        if (minutes === 0) {
            hours--;
            minutes = 59;
        } else {
            minutes--;
        }
        seconds = 59;
    } else {
        seconds--;
    }

    updateDisplay();
}

// Stop timer
function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

// Reset ke nilai tersimpan
function resetTimer() {
    stopTimer();
    hours = 0;
    minutes = savedMinutes;
    seconds = 0;
    updateDisplay();
}

// Event listeners
saveButton.addEventListener('click', saveInputTime);
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Inisialisasi awal
updateDisplay();
