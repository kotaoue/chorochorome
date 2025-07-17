function updateTime() {
  const ul = document.getElementById('times');
  if (!ul) {
    return;
  }

  const newItems = [
    { label: 'JST', value: getFormattedTime('Asia/Tokyo') },
    { label: 'UTC', value: getFormattedTime('UTC') },
    { label: 'UTC+6hr', value: getFormattedTime('UTC', 6) },
    { label: 'UTC-6hr', value: getFormattedTime('UTC', -6) }
  ];

  updateListIfChanged(ul, newItems);
}

function updateJstTimes() {
  const ul = document.getElementById('jst-times');
  if (!ul) {
    return;
  }

  const newItems = [
    { label: 'JST', value: getFormattedTime('Asia/Tokyo') },
    { label: 'JST+4hr', value: getFormattedTime('Asia/Tokyo', 4) },
    { label: 'JST+6hr', value: getFormattedTime('Asia/Tokyo', 6) },
    { label: 'JST+8hr', value: getFormattedTime('Asia/Tokyo', 8) },
    { label: 'JST+12hr', value: getFormattedTime('Asia/Tokyo', 12) },
    { label: 'JST-4hr', value: getFormattedTime('Asia/Tokyo', -4) },
    { label: 'JST-6hr', value: getFormattedTime('Asia/Tokyo', -6) },
    { label: 'JST-8hr', value: getFormattedTime('Asia/Tokyo', -8) },
    { label: 'JST-12hr', value: getFormattedTime('Asia/Tokyo', -12) }
  ];

  updateListIfChanged(ul, newItems);
}

function updateUtcTimes() {
  const ul = document.getElementById('utc-times');
  if (!ul) {
    return;
  }

  const newItems = [
    { label: 'UTC', value: getFormattedTime('UTC') },
    { label: 'UTC+4hr', value: getFormattedTime('UTC', 4) },
    { label: 'UTC+6hr', value: getFormattedTime('UTC', 6) },
    { label: 'UTC+8hr', value: getFormattedTime('UTC', 8) },
    { label: 'UTC+12hr', value: getFormattedTime('UTC', 12) },
    { label: 'UTC-4hr', value: getFormattedTime('UTC', -4) },
    { label: 'UTC-6hr', value: getFormattedTime('UTC', -6) },
    { label: 'UTC-8hr', value: getFormattedTime('UTC', -8) },
    { label: 'UTC-12hr', value: getFormattedTime('UTC', -12) }
  ];

  updateListIfChanged(ul, newItems);
}

function getFormattedTime(timeZone, offsetHours = 0) {
  const now = new Date();

  const targetDate = new Date(now.getTime() + offsetHours * 60 * 60 * 1000);

  return new Intl.DateTimeFormat('ja-JP', {
    timeZone: timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(targetDate);
}
