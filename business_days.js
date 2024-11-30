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
  const cacheKey = "holidaysCache1";
  const cacheTimestampKey = "holidaysCacheTimestamp";

  return new Promise((resolve, reject) => {
    checkCache(cacheKey, cacheTimestampKey, 24 * 60 * 60 * 1000) // 24 hours
      .then(cachedData => {
        if (cachedData) {
          resolve(cachedData);
          return;
        }

        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        const apiUrls = [
          `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/JP`,
          `https://date.nager.at/api/v3/PublicHolidays/${nextYear}/JP`
        ];

        Promise.all(apiUrls.map(fetchFromAPI))
          .then(dataArrays => {
            const combinedData = dataArrays.flat();
            console.log("Fetched holiday data:", combinedData);
            saveToCache(cacheKey, combinedData, cacheTimestampKey);
            resolve(combinedData);
          })
          .catch(err => {
            console.error("Error fetching holiday data:", err);
            reject(err);
          });
      })
      .catch(error => {
        console.error("Error checking cache:", error);
        reject(error);
      });
  });
}

function checkCache(key, timestampKey, duration) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key, timestampKey], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }

      const cachedData = result[key];
      const cacheTimestamp = result[timestampKey];

      if (cachedData && Date.now() - cacheTimestamp < duration) {
        resolve(cachedData);
      } else {
        resolve(null);
      }
    });
  });
}

function saveToCache(key, data, timestampKey) {
  chrome.storage.local.set({
    [key]: data,
    [timestampKey]: Date.now()
  }, () => {
    console.log("Data cached successfully.");
  });
}

function fetchFromAPI(url) {
  console.log("Fetching holiday data from API:", url);

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
