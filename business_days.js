async function fetchHolidaysFromAPI() {
    const url = 'https://date.nager.at/api/v3/PublicHolidays/2024/JP';
    const response = await fetch(url);
    const data = await response.json();
  
    return data.map(holiday => holiday.date); // YYYY-MM-DD形式
  }
  
  async function calculateBusinessDays(startDate, days) {
    let count = 0;
    let currentDate = new Date(startDate);
    const holidays = await fetchHolidaysFromAPI();
  
    while (count < days) {
      currentDate.setDate(currentDate.getDate() + 1);
      const day = currentDate.getDay();
      const formattedDate = currentDate.toISOString().split('T')[0];
  
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
  
  async function displayBusinessDays() {
    const ul = document.getElementById('business-days');
    const daysArray = [5, 10, 30, 50, 100];
    const today = new Date();
  
    // Promise.allで並列に営業日を計算
    const businessDays = await Promise.all(
      daysArray.map(days => calculateBusinessDays(today, days))
    );
  
    // 結果をリストに追加
    businessDays.forEach((businessDay, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${daysArray[index]}営業日後: ${formatDateToJapaneseWithWeekday(businessDay)}`;
      ul.appendChild(listItem);
    });
  }
  
  document.addEventListener('DOMContentLoaded', displayBusinessDays);
  