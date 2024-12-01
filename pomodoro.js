let timerInterval;
let remainingTime = 25 * 60; // 25 minutes in seconds

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updatePomodoroDisplay() {
  const timeDisplay = document.getElementById('pomodoro-display');
  timeDisplay.textContent = formatTime(remainingTime);
}

function startTimer() {
  if (timerInterval) {
    return;
  }

  timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updatePomodoroDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("ポモドーロタイム終了！休憩してください。");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingTime = 25 * 60;
  updatePomodoroDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
  updatePomodoroDisplay();

  const startButton = document.getElementById('start-timer');
  const resetButton = document.getElementById('reset-timer');

  startButton.addEventListener('click', startTimer);
  resetButton.addEventListener('click', resetTimer);
});
