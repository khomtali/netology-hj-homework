'use strict';

// функции подстановки полученных данных в HTML-разметку
function addRecipe(data) {
  document.querySelector('[data-pic]').style.backgroundImage = `url(${data.pic})`;
  document.querySelector('[data-title]').textContent = data.title;
  document.querySelector('[data-ingredients]').textContent = data.ingredients;
}
function addRating(data) {
  document.querySelector('[data-rating]').textContent = data.rating.toFixed(2);
  document.querySelector('[data-star]').style.width = `${data.rating * 10}%`;
  document.querySelector('[data-votes]').textContent = `(${data.votes} оценок)`;
}
function addConsumers(data) {
  for (let man of data.consumers) {
    const manImg = document.createElement('img');
    manImg.src = man.pic;
    manImg.title = man.name;
    document.querySelector('[data-consumers]').appendChild(manImg);
  }
  const others = document.createElement('span');
  others.textContent = `(+${data.total - data.consumers.length})`;
  document.querySelector('[data-consumers]').appendChild(others);
}
// реализация fetch-запроса данных с переменной i в названии функций
function loadData(url) {
  return new Promise((done, fail) => {
    window[`getData${i}`] = done;
    const script = document.createElement('script');
    script.src = `${url}?callback=getData${i}`;
    document.body.appendChild(script);
    i++;
  });
}
// определяю переменную, которая добавит разнообразия в названия
// функций при запросе данных
let i = 0;
// запросы данных для виджета рецепта и последующие вызовы функций
// подстановки данных в HTML-разметку
loadData('https://neto-api.herokuapp.com/food/42')
  .then(addRecipe);
loadData('https://neto-api.herokuapp.com/food/42/consumers')
  .then(addConsumers);
loadData('https://neto-api.herokuapp.com/food/42/rating')
  .then(addRating);
