'use strict';

// функция подстановки полученных данных профиля в HTML-разметку
function makeProfile(data) {
  document.querySelector('[data-name]').textContent = data.name;
  document.querySelector('[data-description]').textContent = data.description;
  document.querySelector('[data-pic]').src = data.pic;
  document.querySelector('[data-position]').textContent = data.position;
  // запрос данных по технологиям и последующее заполнение профиля
  loadData(`https://neto-api.herokuapp.com/profile/${data.id}/technologies`)
    .then(result => {
      for (let tech of result) {
        const techSpan = document.createElement('span');
        techSpan.classList.add('devicons', `devicons-${tech}`);
        document.querySelector('[data-technologies]').appendChild(techSpan);
      }
    });
  // делаю видимым виджет профиля
  document.querySelector('.content').style.display = 'initial';
}
// реализация fetch-запроса данных
function loadData(url) {
  return new Promise((done, fail) => {
    window.getData = done;
    const script = document.createElement('script');
    script.src = `${url}?callback=getData`;
    document.body.appendChild(script);
  });
}
// запрос общих данных профиля и последующий вызов функции makeProfile
// с полученными данными в качестве аргумента
loadData('https://neto-api.herokuapp.com/profile/me')
  .then(makeProfile);
