'use strict';

// функция подстановки полученных данных профиля в HTML-разметку
function makeUserVidget(userData) {
  document.querySelector('[data-wallpaper]').src = userData.wallpaper;
  document.querySelector('[data-username]').textContent = userData.username;
  document.querySelector('[data-description]').textContent = userData.description;
  document.querySelector('[data-pic]').src = userData.pic;
  document.querySelector('[data-tweets]').textContent = userData.tweets;
  document.querySelector('[data-followers]').textContent = userData.followers;
  document.querySelector('[data-following]').textContent = userData.following;
}

// реализация fetch-запроса данных профиля
function loadData(url) {
  return new Promise((done, fail) => {
    window.getUserData = done;
    const script = document.createElement('script');
    script.src = `${url}?callback=getUserData`;
    document.querySelector('.container').appendChild(script);
  });
}

// запрос данных и последующий вызов функции makeUserVidget
// с полученными данными в качестве аргумента
loadData('https://neto-api.herokuapp.com/twitter/jsonp')
  .then(makeUserVidget);
