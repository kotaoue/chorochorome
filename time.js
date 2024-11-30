function updateTime() {
  const ul = document.getElementById('times');
  if (!ul) {
    return;
  }
  ul.innerHTML = '';

  appendListItem(ul, 'JST', getFormattedTime('Asia/Tokyo'));
  appendListItem(ul, 'UTC', getFormattedTime('UTC'));
  appendListItem(ul, 'UTC+6hr', getFormattedTime('UTC', 6));
  appendListItem(ul, 'UTC-6hr', getFormattedTime('UTC', -6));
}

function updateJstTimes() {
  const ul = document.getElementById('jst-times');
  if (!ul) {
    return;
  }
  ul.innerHTML = '';

  appendListItem(ul, 'JST', getFormattedTime('Asia/Tokyo'));
  appendListItem(ul, 'JST+4hr', getFormattedTime('Asia/Tokyo', 4));
  appendListItem(ul, 'JST+6hr', getFormattedTime('Asia/Tokyo', 6));
  appendListItem(ul, 'JST+8hr', getFormattedTime('Asia/Tokyo', 8));
  appendListItem(ul, 'JST+12hr', getFormattedTime('Asia/Tokyo', 12));
  appendListItem(ul, 'JST-4hr', getFormattedTime('Asia/Tokyo', -4));
  appendListItem(ul, 'JST-6hr', getFormattedTime('Asia/Tokyo', -6));
  appendListItem(ul, 'JST-8hr', getFormattedTime('Asia/Tokyo', -8));
  appendListItem(ul, 'JST-12hr', getFormattedTime('Asia/Tokyo', -12));
}

function updateUtcTimes() {
  const ul = document.getElementById('utc-times');
  if (!ul) {
    return;
  }
  ul.innerHTML = '';

  appendListItem(ul, 'UTC', getFormattedTime('UTC'));
  appendListItem(ul, 'UTC+4hr', getFormattedTime('UTC', 4));
  appendListItem(ul, 'UTC+6hr', getFormattedTime('UTC', 6));
  appendListItem(ul, 'UTC+8hr', getFormattedTime('UTC', 8));
  appendListItem(ul, 'UTC+12hr', getFormattedTime('UTC', 12));
  appendListItem(ul, 'UTC-4hr', getFormattedTime('UTC', -4));
  appendListItem(ul, 'UTC-6hr', getFormattedTime('UTC', -6));
  appendListItem(ul, 'UTC-8hr', getFormattedTime('UTC', -8));
  appendListItem(ul, 'UTC-12hr', getFormattedTime('UTC', -12));
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
