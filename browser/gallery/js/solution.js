const imgs = ['breuer-building', 'guggenheim-museum', 'headquarters', 'IAC', 'new-museum'];
currentPhoto.src = `https://netology-code.github.io/hj-homeworks/browser/gallery/i/${imgs[0]}.jpg`;
let i = 0;

function currentNext()
{
  i++;
  if (i === imgs.length) {
    i = 0; 
  }
  currentPhoto.src = `https://netology-code.github.io/hj-homeworks/browser/gallery/i/${imgs[i]}.jpg`
}

function currentPrev()
{
  i--;
  if (i < 0) {
    i = imgs.length - 1; 
  }
  currentPhoto.src = `https://netology-code.github.io/hj-homeworks/browser/gallery/i/${imgs[i]}.jpg`
}

nextPhoto.onclick = currentNext;
prevPhoto.onclick = currentPrev;
