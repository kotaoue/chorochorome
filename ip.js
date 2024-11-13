function updateIP() {
  const ul = document.getElementById('ip');
  ul.innerHTML = '';

  fetchIPAddress().then(ip => {
    appendTimeListItem(ul, 'IPアドレス', ip);
  });
}

function fetchIPAddress() {
  return fetch('https://ifconfig.me/ip')
    .then(response => {
      if (!response.ok) {
        return response.statusText;
      }
      return response.text();
    })
    .then(ip => {
      return ip.trim();
    })
    .catch(error => {
      return 'Failed to fetch IP';
    });
}

function appendIPListItem(ul, label, time) {
  const li = document.createElement('li');

  const labelSpan = document.createElement('span');
  labelSpan.textContent = label;
  labelSpan.className = 'label';

  const dateSpan = document.createElement('span');
  dateSpan.textContent = time;
  dateSpan.className = 'value';

  li.appendChild(labelSpan);
  li.appendChild(dateSpan);
  ul.appendChild(li);
}

updateIP();