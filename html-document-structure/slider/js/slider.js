'use strict';
const gallery = document.querySelector('.slides'),
      buttons = document.getElementsByTagName('a'),
      prevBtn = buttons[0],
      nextBtn = buttons[1],
      firstBtn = buttons[2],
      lastBtn = buttons[3];
gallery.firstElementChild.classList.add('slide-current');
let activePhoto = document.querySelector('.slide-current');
updateBtns();

Array.from(buttons).forEach(button => button.addEventListener('click', changePhoto));

function changePhoto(event) {
  activePhoto.classList.remove('slide-current');
  switch(event.target.dataset.action) {
    case 'next':
      activePhoto = activePhoto.nextElementSibling;
      break;
    case 'prev':
      activePhoto = activePhoto.previousElementSibling;
      break;
    case 'first':
      console.log('pressed');
      activePhoto = activePhoto.parentElement.firstElementChild;
      break;
    case 'last':
      console.log('pressed');
      activePhoto = activePhoto.parentElement.lastElementChild;
      break;
  }
  activePhoto.classList.add('slide-current');
  updateBtns();
  console.log(activePhoto.prevElementSibling);
  console.log(prevBtn.style.pointerEvents);
}

function updateBtns() {
  if (!activePhoto.nextElementSibling) {
    nextBtn.style.pointerEvents = 'none';
    nextBtn.classList.add('disabled');
  } else {
    nextBtn.style.pointerEvents = '';
    nextBtn.classList.remove('disabled');
  }
  if (!activePhoto.previousElementSibling) {
    prevBtn.style.pointerEvents = 'none';
    prevBtn.classList.add('disabled');
  } else {
    prevBtn.style.pointerEvents = '';
    prevBtn.classList.remove('disabled');
  }
  if (activePhoto === activePhoto.parentElement.firstElementChild) {
    firstBtn.style.pointerEvents = 'none';
    firstBtn.classList.add('disabled');
  } else {
    firstBtn.style.pointerEvents = '';
    firstBtn.classList.remove('disabled');
  }
  if (activePhoto === activePhoto.parentElement.lastElementChild) {
    lastBtn.style.pointerEvents = 'none';
    lastBtn.classList.add('disabled');
  } else {
    lastBtn.style.pointerEvents = '';
    lastBtn.classList.remove('disabled');
  }
}
