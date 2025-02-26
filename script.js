let timer;
let startTime;
let elapsedTime = 0;
let lapCount = 1;
const mainTimeDisplay = document.querySelector('.main-time');
const millisecondsDisplay = document.querySelector('.milliseconds');
const lapsList = document.querySelector('.laps');

function formatTime(milliseconds) {
  let totalSeconds = Math.floor(milliseconds / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  let ms = Math.floor((milliseconds % 1000) / 10);
  return {
    mainTime: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    milliseconds: ms.toString().padStart(2, '0')
  };
}

function displayTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  mainTimeDisplay.textContent = formattedTime.mainTime;
  millisecondsDisplay.textContent = `.${formattedTime.milliseconds}`;
  timer = requestAnimationFrame(displayTime);
}

function startTimer() {
  if (!timer) {
    startTime = Date.now() - elapsedTime;
    timer = requestAnimationFrame(displayTime);
  }
}

function stopTimer() {
  if (timer) {
    cancelAnimationFrame(timer);
    timer = null;
  }
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  lapCount = 1;
  const formattedTime = formatTime(elapsedTime);
  mainTimeDisplay.textContent = formattedTime.mainTime;
  millisecondsDisplay.textContent = `.${formattedTime.milliseconds}`;
  lapsList.innerHTML = '';
}

function recordLap() {
  const lapTime = document.createElement('li');
  const formattedTime = formatTime(elapsedTime);
  lapTime.textContent = `LAP ${lapCount}: ${formattedTime.mainTime}`;
  lapTime.classList.add('lap-time');
  lapsList.appendChild(lapTime);
  lapCount++;
}

document.querySelector('.start').addEventListener('click', startTimer);
document.querySelector('.stop').addEventListener('click', stopTimer);
document.querySelector('.reset').addEventListener('click', resetTimer);
document.querySelector('.lap').addEventListener('click', recordLap);

const initialFormattedTime = formatTime(elapsedTime);
mainTimeDisplay.textContent = initialFormattedTime.mainTime;
millisecondsDisplay.textContent = `.${initialFormattedTime.milliseconds}`;