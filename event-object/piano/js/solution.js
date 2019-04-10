'use strict';
const ordinals = ['first', 'second', 'third', 'fourth', 'fifth'];
const piano = document.getElementsByTagName('ul')[0];
const pianoKeys = document.getElementsByTagName('li');

function setMiddle() {
  piano.classList.remove('higher');
  piano.classList.remove('lower');
  piano.classList.add('middle');
}

function setTone(event) {
  if (event.altKey) {
    piano.classList.remove('middle');
    piano.classList.add('higher');
  } else if (event.shiftKey) {
    piano.classList.remove('middle');
    piano.classList.add('lower');
  }
}

function keySound() {
  const tone = piano.classList[1];
  for (let i = 0; i < pianoKeys.length; i++) {
    if (this === pianoKeys[i]) {
      const sound = this.getElementsByTagName('audio')[0];
      sound.src = `https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/${tone}/${ordinals[i]}.mp3`;
      console.log(sound);
      sound.currentTime = 0;
      sound.play();
    }
  }
}

document.addEventListener('keydown', setTone);
document.addEventListener('keyup', setMiddle);

for (const pianoKey of pianoKeys) {
  pianoKey.addEventListener('click', keySound);
}
