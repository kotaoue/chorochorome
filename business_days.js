const HOLIDAYS_API_URL = "https://date.nager.at/api/v3/PublicHolidays/2024/JP";
const CACHE_KEY = "holidaysCache";
const CACHE_TIMESTAMP_KEY = "holidaysCacheTimestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function fetchHolidays() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([CACHE_KEY, CACHE_TIMESTAMP_KEY], (result) => {
      const cachedHolidays = result[CACHE_KEY];
      const cacheTimestamp = result[CACHE_TIMESTAMP_KEY];

      if (cachedHolidays && Date.now() - cacheTimestamp < CACHE_DURATION) {
        console.log("Loaded holiday data from cache.");
        resolve(cachedHolidays);
      } else {
        console.log("Fetching holiday data from API...");
        fetch(HOLIDAYS_API_URL)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
            return response.json();
          })
          .then(data => {
            chrome.storage.local.set({
              [CACHE_KEY]: data,
              [CACHE_TIMESTAMP_KEY]: Date.now()
            }, () => {
              console.log("Holiday data cached successfully.");
              resolve(data);
            });
          })
          .catch(err => {
            console.error("Failed to fetch holiday data from API:", err);
            reject(err);
          });
      }
    });
  });
}

function calculateBusinessDays(startDate, days, holidays) {
  let count = 0;
  let currentDate = new Date(startDate);

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

  return `${year}-${month}-${day} (${weekday})`;
}

function displayBusinessDays() {
  fetchHolidays().then(holidays => {
    const ul = document.getElementById('business-days');
    const daysArray = [5, 10, 30, 50, 100];
    const today = new Date();

    daysArray.forEach((days) => {
      const businessDay = calculateBusinessDays(today, days, holidays);
      const listItem = document.createElement('li');
      listItem.textContent = `${days}営業日後: ${formatDateToJapaneseWithWeekday(businessDay)}`;
      ul.appendChild(listItem);
    });
  }).catch(err => {
    console.error("Error during business day calculation:", err);
  });
}

document.addEventListener('DOMContentLoaded', displayBusinessDays);
