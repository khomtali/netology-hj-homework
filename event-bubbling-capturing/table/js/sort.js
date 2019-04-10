'use strict';

function handleTableClick(event) {
  const header = event.target;
  if (header.hasAttribute('data-dir')) {
    header.dataset.dir = -1 * +(header.dataset.dir);
  } else {
    header.setAttribute('data-dir', 1);
  }
  event.currentTarget.setAttribute('data-sort-by', header.dataset.propName);
  sortTable(event.currentTarget.dataset.sortBy, header.dataset.dir);
}
