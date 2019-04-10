'use strict';
const imgs = ['-jump', '-on-foot', '-playground', '-top-view', ''];
slider.src = `https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax${imgs[0]}.png`;
let i = 1;
setInterval(() => {
  slider.src = `https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax${imgs[i]}.png`;
  if (i === imgs.length - 1) {
    i = 0;
  } else i++;
}, 5000);
