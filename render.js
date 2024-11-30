document.addEventListener('DOMContentLoaded', () => {
  function updateView() {
    updateSystemInfo();
    updateTime();
    updateJstTimes();
    updateUtcTimes();
  }

  function initialize() {
    updateBusinessDays();
    updateIP();
    updateSystemInfo();
    updateTime();
    updateJstTimes();
    updateUtcTimes();
    updateHolidays();

    setInterval(updateView, 1000);
  }

  initialize();
});
