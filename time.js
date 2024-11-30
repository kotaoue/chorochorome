function updateTime() {
  const ul = document.getElementById('times');
  if (!ul) {
    return;
  }
  ul.innerHTML = '';

  appendListItem(ul, 'JST', getFormattedTime('Asia/Tokyo'));
  appendListItem(ul, 'UTC', getFormattedTime('UTC'));
  appendListItem(ul, 'UTC+4hr', getFormattedTime('UTC', 4));
  appendListItem(ul, 'UTC+8hr', getFormattedTime('UTC', 8));
  appendListItem(ul, 'UTC+12hr', getFormattedTime('UTC', 12));
  appendListItem(ul, 'UTC-4hr', getFormattedTime('UTC', -4));
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
