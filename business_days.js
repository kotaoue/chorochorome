function calculateBusinessDays(startDate, days) {
    let count = 0;
    let currentDate = new Date(startDate);
    const holidays = ["2024-11-23", "2024-12-25"]; // 祝日をここに追加
  
    while (count < days) {
      currentDate.setDate(currentDate.getDate() + 1);
      const day = currentDate.getDay();
      const formattedDate = currentDate.toISOString().split('T')[0];
  
      // 土日と祝日を除外
      if (day !== 0 && day !== 6 && !holidays.includes(formattedDate)) {
        count++;
      }
    }
    return currentDate;
  }
  
  function formatDateToJapaneseWithWeekday(date) {
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekday = weekdays[date.getDay()];
  
    return `${year}-${month}-${day}(${weekday})`;
  }
  
  function displayBusinessDays() {
    const ul = document.getElementById('business-days');
    const daysArray = [5, 10, 30, 50, 100];
    const today = new Date();
  
    daysArray.forEach(days => {
      const businessDay = calculateBusinessDays(today, days);
      const listItem = document.createElement('li');
      listItem.textContent = `${days}営業日後: ${formatDateToJapaneseWithWeekday(businessDay)}`;
      ul.appendChild(listItem);
    });
  }
  
  document.addEventListener('DOMContentLoaded', displayBusinessDays);
  