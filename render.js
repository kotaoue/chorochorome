document.addEventListener('DOMContentLoaded', () => {
  let lastUpdateSecond = -1;

  function updateView() {
    const now = new Date();
    const currentSecond = now.getSeconds();

    if (currentSecond !== lastUpdateSecond) {
      updateSystemInfo();
      updateTime();
      updateJstTimes();
      updateUtcTimes();
      lastUpdateSecond = currentSecond;
    }
  }

  function initialize() {
    updateBusinessDays();
    updateIP();
    updateSystemInfo();
    updateTime();
    updateJstTimes();
    updateUtcTimes();
    updateHolidays();

    // Set an interval to update the view every second
    setInterval(updateView, 100);
  }

  initialize();
});
