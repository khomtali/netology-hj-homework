'use strict';
const selectTo = document.getElementById('to'),
      selectFrom = document.getElementById('from'),
      content = document.getElementById('content'),
      loader = document.getElementById('loader'),
      source = document.getElementById('source'),
      output = document.getElementById('result'),
      exValues = new XMLHttpRequest();

loader.classList.remove('hidden');
exValues.open('GET', 'https://neto-api.herokuapp.com/currency', true);
exValues.send();

exValues.addEventListener('loadend', onLoadEnd);
exValues.addEventListener('load', onLoad);
source.addEventListener('input', onChange);
selectFrom.addEventListener('change', onChange);
selectTo.addEventListener('change', onChange);

function onLoadEnd() {
  loader.classList.add('hidden');
}

function onLoad() {
  content.classList.remove('hidden');
  var exData = JSON.parse(exValues.responseText);
  let innerString = '';
  for (let exRate of exData) {
    innerString += `<option value="${exRate.value}">${exRate.code}</option>`;
  }
  selectFrom.innerHTML = innerString;
  selectTo.innerHTML = innerString;
  onChange();
}

function onChange() {
  const result = Math.round(+source.value * (+selectFrom.value) / (+selectTo.value) * 100) / 100;
  output.innerHTML = `${result}`;
}
