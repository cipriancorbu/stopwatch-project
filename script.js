// ---------- STOPWATCH ----------

let stopwatchInterval = null;
let stopwatchElapsedMs = 0;

const stopwatchDisplay = document.getElementById("stopwatch-display");
const btnStart = document.getElementById("start");
const btnStop = document.getElementById("stop");
const btnReset = document.getElementById("reset");

function formatStopwatch(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((ms % 1000) / 10); // sutimi

  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  const cc = String(centiseconds).padStart(2, "0");

  return `${mm}:${ss}.${cc}`;
}

function updateStopwatchDisplay() {
  stopwatchDisplay.textContent = formatStopwatch(stopwatchElapsedMs);
}

btnStart.addEventListener("click", () => {
  if (stopwatchInterval !== null) return; // deja rulează

  const startTime = Date.now() - stopwatchElapsedMs;

  stopwatchInterval = setInterval(() => {
    stopwatchElapsedMs = Date.now() - startTime;
    updateStopwatchDisplay();
  }, 10); // la 10ms pentru sutimi
});

btnStop.addEventListener("click", () => {
  if (stopwatchInterval !== null) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  }
});

btnReset.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchElapsedMs = 0;
  updateStopwatchDisplay();
});

// inițial
updateStopwatchDisplay();

// ---------- TIMER ----------

let timerInterval = null;
let timerRemainingMs = 0;

const timerMinutesInput = document.getElementById("timer-minutes");
const timerSecondsInput = document.getElementById("timer-seconds");
const timerDisplay = document.getElementById("timer-display");

const timerStartBtn = document.getElementById("timer-start");
const timerStopBtn = document.getElementById("timer-stop");
const timerResetBtn = document.getElementById("timer-reset");

function formatTimer(ms) {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return `${mm}:${ss}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTimer(timerRemainingMs);
}

timerStartBtn.addEventListener("click", () => {
  // dacă nu avem timp setat încă, îl luăm din input-uri
  if (timerRemainingMs === 0) {
    const mins = Number(timerMinutesInput.value) || 0;
    let secs = Number(timerSecondsInput.value) || 0;

    if (secs > 59) secs = 59;

    timerRemainingMs = (mins * 60 + secs) * 1000;
  }

  if (timerRemainingMs <= 0 || timerInterval !== null) return;

  const endTime = Date.now() + timerRemainingMs;

  timerInterval = setInterval(() => {
    timerRemainingMs = endTime - Date.now();

    if (timerRemainingMs <= 0) {
      timerRemainingMs = 0;
      updateTimerDisplay();
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Time's up!");
    } else {
      updateTimerDisplay();
    }
  }, 100); // actualizăm la 0.1 secunde
});

timerStopBtn.addEventListener("click", () => {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
});

timerResetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRemainingMs = 0;
  updateTimerDisplay();
});

// inițial
updateTimerDisplay();

// ---------- SWITCH ÎNTRE MODE ----------

const modeStopwatchBtn = document.getElementById("mode-stopwatch");
const modeTimerBtn = document.getElementById("mode-timer");
const stopwatchMode = document.getElementById("stopwatch-mode");
const timerMode = document.getElementById("timer-mode");

modeStopwatchBtn.addEventListener("click", () => {
  modeStopwatchBtn.classList.add("active");
  modeTimerBtn.classList.remove("active");

  stopwatchMode.classList.remove("hidden");
  timerMode.classList.add("hidden");
});

modeTimerBtn.addEventListener("click", () => {
  modeTimerBtn.classList.add("active");
  modeStopwatchBtn.classList.remove("active");

  timerMode.classList.remove("hidden");
  stopwatchMode.classList.add("hidden");
});
