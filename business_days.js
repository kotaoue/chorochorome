const CACHE_KEY = "holidaysCache";
const CACHE_TIMESTAMP_KEY = "holidaysCacheTimestamp";

function updateBusinessDays() {
  const ul = document.getElementById('business-days');
  if (!ul) {
    return;
  }
  ul.innerHTML = '';

  getHolidays().then(holidays => {
    const daysArray = [5, 10, 30, 50, 100];
    const today = new Date();

    daysArray.forEach(days => {
      const businessDay = calculateBusinessDays(today, days, holidays);
      appendListItem(ul, `${days}営業日後`, formatDateToJapaneseWithWeekday(businessDay));
    });
  }).catch(err => {
    console.error("Error during business day calculation:", err);
  });
}

function updateHolidays() {
  const ul = document.getElementById('holidays');
  if (!ul) {
    return;
  }
  ul.innerHTML = '';

  getHolidays().then(holidays => {
    holidays.forEach(holiday => {
      appendListItem(ul, holiday.localName, formatDateToJapaneseWithWeekday(new Date(holiday.date)));
    });
  }).catch(err => {
    console.error("Error during business day calculation:", err);
  });
}

function getHolidays() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([CACHE_KEY, CACHE_TIMESTAMP_KEY], (result) => {
      const cachedHolidays = result[CACHE_KEY];
      const cacheTimestamp = result[CACHE_TIMESTAMP_KEY];

      const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours
      if (cachedHolidays && Date.now() - cacheTimestamp < cacheDuration) {
        console.log("Loaded holiday data from cache.");
        resolve(cachedHolidays);
      } else {
        console.log("Fetching holiday data from API...");
        // FIXME: Avoid hardcoding the year
        fetchFromAPI("https://date.nager.at/api/v3/PublicHolidays/2024/JP")
          .then(data => {
            chrome.storage.local.set({
              [CACHE_KEY]: data,
              [CACHE_TIMESTAMP_KEY]: Date.now()
            }, () => {
              console.log("Holiday data cached successfully.");
              resolve(data);
            });
          })
          .catch(reject);
      }
    });
  });
}

function fetchFromAPI(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      return response.json();
    })
    .catch(err => {
      console.error("Error fetching data from API:", err);
      throw err;
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
