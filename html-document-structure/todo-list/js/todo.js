'use strict';
const tasks = document.getElementsByTagName('label');

Array.from(tasks).forEach(task => task.addEventListener('click', changeTask));

function changeTask(event) {
  let checkbox = event.target.firstElementChild;
  if (checkbox.checked) {
    document.querySelector('.undone').appendChild(event.target);
  } else {
    document.querySelector('.done').appendChild(event.target);
  }
}
