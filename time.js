function updateTime() {
  const ul = document.getElementById('times');
  ul.innerHTML = '';

  appendTimeListItem(ul, '現在時刻(JST)', getJSTTime());

  appendTimeListItem(ul, '現在時刻(UTC)', getUTCTime());
  appendTimeListItem(ul, '現在時刻(UTC)+4hr', getUTCTime(4));
  appendTimeListItem(ul, '現在時刻(UTC)+8hr', getUTCTime(8));
  appendTimeListItem(ul, '現在時刻(UTC)+12hr', getUTCTime(12));
  appendTimeListItem(ul, '現在時刻(UTC)-4hr', getUTCTime(-4));
  appendTimeListItem(ul, '現在時刻(UTC)-8hr', getUTCTime(-8));
  appendTimeListItem(ul, '現在時刻(UTC)-12hr', getUTCTime(-12));
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
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function appendTimeListItem(ul, label, time) {
  const li = document.createElement('li');

  const labelSpan = document.createElement('span');
  labelSpan.textContent = label;
  labelSpan.className = 'label';

  const dateSpan = document.createElement('span');
  dateSpan.textContent = time;
  dateSpan.className = 'date';

  li.appendChild(labelSpan);
  li.appendChild(dateSpan);
  ul.appendChild(li);
}


// Update the time every second
setInterval(updateTime, 1000);
updateTime();