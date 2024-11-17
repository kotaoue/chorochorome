function updateIP() {
  const ul = document.getElementById('ip');
  ul.innerHTML = '';

  fetchIPAddress().then(ip => {
    appendListItem(ul, 'IPアドレス', ip);
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