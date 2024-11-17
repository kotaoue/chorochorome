document.addEventListener('DOMContentLoaded', () => {
  function updateView() {
    updateSystemInfo();
    updateTime();
  }

  function initialize() {
    updateBusinessDays();
    updateIP();
    updateSystemInfo();
    updateTime();

    setInterval(updateView, 1000);
  }

  initialize();
});
