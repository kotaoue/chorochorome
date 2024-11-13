function updateTime() {
  const ul = document.getElementById('times');
  ul.innerHTML = '';

  appendListItem(ul, 'JST', getJSTTime());

  appendListItem(ul, 'UTC', getUTCTime());
  appendListItem(ul, 'UTC+4hr', getUTCTime(4));
  appendListItem(ul, 'UTC+8hr', getUTCTime(8));
  appendListItem(ul, 'UTC+12hr', getUTCTime(12));
  appendListItem(ul, 'UTC-4hr', getUTCTime(-4));
  appendListItem(ul, 'UTC-8hr', getUTCTime(-8));
  appendListItem(ul, 'UTC-12hr', getUTCTime(-12));
}

function getJSTTime() {
  const now = new Date();
  return formatDateToCustomString(new Date(now.getTime() + 9 * 60 * 60 * 1000));
}

function getUTCTime(offsetHours = 0) {
  const now = new Date();
  return formatDateToCustomString(new Date(now.getTime() + offsetHours * 60 * 60 * 1000));
}

function formatDateToCustomString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

setInterval(updateTime, 1000 * 60);
updateTime();