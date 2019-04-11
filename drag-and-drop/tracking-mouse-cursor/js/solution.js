'use strict';

const leftEyeArea = document.querySelector('.cat_position_for_left_eye');
const rightEyeArea = document.querySelector('.cat_position_for_right_eye');

function moveEye (eyeArea, x, y) { // function for each eye moving 
  const eye = eyeArea.querySelector('.cat_eye'),
        areaBounds = eyeArea.getBoundingClientRect();
  console.log(eyeArea.offsetWidth, eyeArea.offsetHeight);
  if (x > areaBounds.right) {
    eye.style.left = eyeArea.offsetWidth - eye.offsetWidth + 'px';
  } else if (x < areaBounds.left) {
    eye.style.left = 0 + 'px';
  } else {
    eye.style.left = x - areaBounds.left - eye.offsetWidth / 2 + 'px';
  }
  if (y > areaBounds.bottom) {
    eye.style.top = eyeArea.offsetHeight - eye.offsetHeight + 'px';
  } else if (y < areaBounds.top) {
    eye.style.top = 0 + 'px';
  } else {
    eye.style.top = y - areaBounds.top - eye.offsetHeight / 2 + 'px';
  }
}
// event
document.addEventListener('mousemove', event => {
  throttle(moveEye(leftEyeArea, event.pageX, event.pageY));
  throttle(moveEye(rightEyeArea, event.pageX, event.pageY));
});

function throttle(callback) { // defenition of throttle function
  let isWaiting = false;
  return function () {
    if (!isWaiting) {
      callback.apply(this, arguments);
      isWaiting = true;
      requestAnimationFrame(() => {
        isWaiting = false;
      });
    }
  };
}
