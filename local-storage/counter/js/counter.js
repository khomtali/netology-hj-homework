'use strict';

const counter = window.counter;
document.querySelector('.wrap-btns').addEventListener('click', changeValue);
if (localStorage.value) {
  counter.innerHTML = localStorage.value;
} else {
  localStorage.value = 0;
  counter.innerHTML = 0;
}

function changeValue(event) {
  if (event.target == window.increment) {
    localStorage.value++;
  } else if (event.target == window.decrement && localStorage.value > 0) {
    localStorage.value--;
  } else if (event.target == window.reset) {
    localStorage.value = 0;
  }
  counter.innerHTML = localStorage.value;
}
