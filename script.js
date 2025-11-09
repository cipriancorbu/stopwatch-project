// Minimal stopwatch logic to verify files are linked
let running = false;
let startTime = 0;
let elapsed = 0;
let raf;

function format(ms) {
  const totalSec = Math.floor(ms / 1000);
  const mins = String(Math.floor(totalSec / 60)).padStart(2, "0");
  const secs = String(totalSec % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function render() {
  const now = performance.now();
  const ms = running ? elapsed + (now - startTime) : elapsed;
  document.getElementById("time").textContent = format(ms);
  if (running) raf = requestAnimationFrame(render);
}

document.getElementById("start").addEventListener("click", () => {
  if (running) return;
  running = true;
  startTime = performance.now();
  raf = requestAnimationFrame(render);
});

document.getElementById("stop").addEventListener("click", () => {
  if (!running) return;
  running = false;
  elapsed += performance.now() - startTime;
  cancelAnimationFrame(raf);
  render();
});

document.getElementById("reset").addEventListener("click", () => {
  running = false;
  elapsed = 0;
  cancelAnimationFrame(raf);
  render();
});

// initial paint
render();
console.log("JS loaded OK");
