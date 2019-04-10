'use strict';

function toggleMenu(event) {
  const dropdownList = event.currentTarget;
  if (dropdownList.classList.contains('show')) {
      dropdownList.classList.remove('show');
      dropdownList.classList.add('hide');
    } else {
      dropdownList.classList.add('show');
      dropdownList.classList.remove('hide');
  }
}
function openLink(event) {
  event.preventDefault();
  event.stopPropagation();
  console.log(event.currentTarget.textContent);
}
function init(node) {
  node.addEventListener('click', toggleMenu);
}
function initLink(node) {
  if (node.dataset.toggle) {
    return;
  }
  node.addEventListener('click', openLink);
}

Array
  .from(document.querySelectorAll('.dropdown'))
  .forEach(init);
Array
  .from(document.querySelectorAll('a'))
  .forEach(initLink);
