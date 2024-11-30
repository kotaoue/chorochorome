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
    updateHolidays();

    setInterval(updateView, 1000);
  }

  initialize();
});
