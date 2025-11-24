let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let running = false;
const timeDisplay = document.getElementById('time');

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  // Calcul minute, secunde, sutimi (centiseconds = 1/100 sec)
  let minutes = Math.floor((difference / 1000 / 60) % 60);
  let seconds = Math.floor((difference / 1000) % 60);
  let centiseconds = Math.floor((difference % 1000) / 10);

  // Format cu 2 cifre
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  centiseconds = centiseconds < 10 ? "0" + centiseconds : centiseconds;

  timeDisplay.innerText = `${minutes}:${seconds}.${centiseconds}`;
}

document.getElementById('start').onclick = () => {
  if (!running) {
    running = true;
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(updateTime, 10); // Actualizare la 10 ms
  }
};

document.getElementById('stop').onclick = () => {
  running = false;
  clearInterval(timerInterval);
};

document.getElementById('reset').onclick = () => {
  running = false;
  clearInterval(timerInterval);
  difference = 0;
  timeDisplay.innerText = "00:00.00";
};
