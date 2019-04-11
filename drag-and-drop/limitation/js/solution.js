'use strict';

const block = document.querySelector('.block'),
      message = document.querySelector('.message'),
      textArea = document.querySelector('textarea'),
      seconds = 2;

textArea.addEventListener('focus', () => {
  block.classList.add('active');
  message.classList.remove('view');
});
textArea.addEventListener('blur', () => {
  block.classList.remove('active');
  message.classList.remove('view');
});
textArea.addEventListener('keydown', () => {
  block.classList.add('active');
  message.classList.remove('view');
});
textArea.addEventListener('keyup', debounce(() => {
  message.classList.add('view');
  block.classList.remove('active');
}, seconds * 1000));

function debounce(callback, delay) { // defenition of debounce function
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      callback();
    }, delay);
  };
};
