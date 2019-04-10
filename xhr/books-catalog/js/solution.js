'use strict';
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://neto-api.herokuapp.com/book/', true);
xhr.send();
xhr.addEventListener('load', onLoad);

function onLoad() {
  const books = JSON.parse(xhr.responseText);
  let innerString = '';
  for (const book of books) {
    innerString += `<li data-title="${book.title}"
      data-author="${book.author.name}"
      data-info="${book.info}"
      data-price="${book.price}">
    <img src="${book.cover.small}"></li>`;
  }
  document.getElementById('content').innerHTML = innerString;
}
