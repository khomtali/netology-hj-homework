'use strict';

const canvas = document.querySelector('#starfield');
const sky = canvas.getContext('2d');
canvas.addEventListener('click', generateSky);
function generateSky() {
  const colors = ['#ffffff', '#d4fbff', '#ffe9c4'];
  const amount = getIntRandom(200, 400);
  sky.beginPath();
  sky.rect(0, 0, 800, 400);
  sky.fill();
  sky.save();
  for (let i = 0; i < amount; i++) {
    sky.beginPath();
    sky.fillStyle = colors[getIntRandom(0, 2)];
    sky.globalAlpha = getDblRandom(0.8, 1);
    sky.arc(getIntRandom(0, 800), getIntRandom(0, 400), getDblRandom(0, 1.1), 0, 2 * Math.PI);
    sky.fill();
  }
  sky.restore();
}

function getIntRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function getDblRandom(min, max) {
  return (Math.random() * (max - min) + min);
}
