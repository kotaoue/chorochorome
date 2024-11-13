function appendListItem(ul, label, time) {
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