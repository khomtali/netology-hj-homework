'use strict';

const page = document.querySelector('body');
let movedLogo = null;
let minY, minX, maxX, maxY,
    shiftX = 0,
    shiftY = 0;

const dragStart = event => { // function for mousedown event
  if (event.target.classList.contains('logo')) {
    movedLogo = event.target;
    // put cursor in the middle of logo
    movedLogo.style.left = event.pageX - movedLogo.offsetWidth / 2 + 'px';
    movedLogo.style.top = event.pageY - movedLogo.offsetHeight / 2 + 'px';
    // calculate the bounds for logo
    minX = page.offsetLeft;
    minY = page.offsetTop;
    maxX = page.offsetLeft + window.innerWidth - movedLogo.offsetWidth;
    maxY = page.offsetTop + window.innerHeight - movedLogo.offsetHeight;
    shiftX = event.pageX - movedLogo.getBoundingClientRect().left - window.pageXOffset;
    shiftY = event.pageY - movedLogo.getBoundingClientRect().top - window.pageYOffset;
  }
};
const drag = throttle((x, y) => { // function for mousemove event with throttle
  if (movedLogo) {
    x = x - shiftX;
    y = y - shiftY;
    x = Math.min(x, maxX);
    y = Math.min(y, maxY);
    x = Math.max(x, minX);
    y = Math.max(y, minY);
    movedLogo.style.left = x + 'px';
    movedLogo.style.top = y + 'px';
    movedLogo.classList.add('moving');
  }
});
const drop = event => { // function for mouseup event
  if (movedLogo) {
    movedLogo.style.visibility = 'hidden';
    const bin = document.elementFromPoint(event.clientX, event.clientY).closest('#trash_bin');
    movedLogo.style.visibility = 'visible';
    if (bin) {
      movedLogo.style.display = 'none';
    } else {
      movedLogo.style.left = event.pageX - movedLogo.offsetWidth / 2 + 'px';
      movedLogo.style.top = event.pageY - movedLogo.offsetHeight / 2 + 'px';
    }
    movedLogo.classList.remove('moving');
    movedLogo = null;
  }
};
// events
document.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', event => drag(event.pageX, event.pageY));
document.addEventListener('mouseup', drop);

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
