// Список песен:
// 1. LA Chill Tour, 
// https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Chill%20Tour.mp3

// 2. This is it band, 
// https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This%20is%20it%20band.mp3

// 3. LA Fusion Jam,
// https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Fusion%20Jam.mp3

const songs = ['LA%20Chill%20Tour', 'This%20is%20it%20band', 'LA%20Fusion%20Jam'];
let i = 0;

const player = document.getElementsByTagName('audio')[0];
const playing = document.getElementsByClassName('mediaplayer')[0];
const playBtn = document.getElementsByClassName('playstate')[0];
// const pauseBtn = document.getElementsByClassName('fa-pause')[0];
const stopBtn = document.getElementsByClassName('stop')[0];
const backBtn = document.getElementsByClassName('back')[0];
const nextBtn = document.getElementsByClassName('next')[0];
const currentTitle = document.getElementsByClassName('title')[0];

playBtn.onclick = () => {
  if (playing.classList.contains('play')) {
	playing.classList.remove('play');
	player.pause();
  } else {
	playing.classList.add('play');
	player.play();
  }
}

// pauseBtn.onclick = () => {
//   player.pause();
//   playing.classList.remove('play');
// }

stopBtn.onclick = () => {
  player.pause();
  player.currentTime = 0;
  playing.classList.remove('play');
}

backBtn.onclick = () => {
  i--;
  if (i < 0) {
	i = songs.length - 1;
  }
  player.src = `https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/${songs[i]}.mp3`;
  currentTitle.title = songs[i].replace(/%20/g, ' ');
  if (playing.classList.contains('play')) {
	player.play();
  }
}

nextBtn.onclick = () => {
  i++;
  if (i === songs.length) {
	i = 0;
  }
  player.src = `https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/${songs[i]}.mp3`;
  currentTitle.title = songs[i].replace(/%20/g, ' ');
  if (playing.classList.contains('play')) {
	player.play();
  }
}
