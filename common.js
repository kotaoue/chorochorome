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

// This function updates the list if the new items differ from the current items
function updateListIfChanged(ul, newItems) {
  if (!ul) return;

  const currentItems = Array.from(ul.children).map(li => {
    const label = li.querySelector('.label')?.textContent || '';
    const value = li.querySelector('.value')?.textContent || '';
    return { label, value };
  });

  const hasChanged = currentItems.length !== newItems.length ||
    currentItems.some((item, index) =>
      !newItems[index] ||
      item.label !== newItems[index].label ||
      item.value !== newItems[index].value
    );

  if (hasChanged) {
    ul.innerHTML = '';
    newItems.forEach(item => {
      appendListItem(ul, item.label, item.value);
    });
  }
}
