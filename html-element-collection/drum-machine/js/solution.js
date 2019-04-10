const sounds = document.getElementsByClassName(`drum-kit__drum`);
for (let sound of sounds) {
  const player = sound.getElementsByTagName(`audio`)[0];
  sound.onclick = () => {
    player.currentTime = 0;
    player.play();
  }
}
