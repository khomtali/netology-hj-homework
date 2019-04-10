'use strict';
const previewBtns = document.getElementsByTagName('a');

function chooseItem(event) {
  event.preventDefault();
  for (const btn of previewBtns) {
    btn.classList.remove('gallery-current');
  }
  this.classList.add('gallery-current');
}

function showFull(event) {
  window.view.src = this.href;
}

for (const btn of previewBtns) {
  btn.addEventListener('click', chooseItem);
  btn.addEventListener('click', showFull);
}
