'use strict';
const menu = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];
let input = '';

function menuVisibleness(event) {
  input += String.fromCharCode(event.keyCode);
  if (input.includes('YTNJKJUBZ')) {
    secret.classList.add('visible');
  }
}

function showSecret(event) {
  if (event.altKey && event.ctrlKey && event.keyCode === 84) {
    menu.classList.toggle('visible');
  }
}

document.addEventListener('keydown', menuVisibleness);
document.addEventListener('keydown', showSecret);
