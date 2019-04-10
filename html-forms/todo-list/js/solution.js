'use strict';
let countDone = 0;
const checkboxes = document.getElementsByTagName('input');
const output = document.getElementsByTagName('output')[0];
const list = document.getElementsByClassName('list-block')[0];

for (const checkbox of checkboxes) {
  checkbox.addEventListener('input', onInput);
  if (checkbox.checked) {
    countDone++;
  }
}
output.innerHTML = `${countDone} из ${checkboxes.length}`;

function onInput(event) {
  if (event.target.checked) {
    countDone++;
  }
  else if (!event.target.checked) {
    countDone--;
  }
  if (countDone === 4) {
    list.classList.add('complete');
  } else if (countDone === 3) {
    list.classList.remove('complete');
  }
  output.innerHTML = `${countDone} из ${checkboxes.length}`;
}
