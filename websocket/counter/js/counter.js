'use strict';

const counter = document.querySelector('.counter');
const errors = document.querySelector('.errors');

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
window.addEventListener('beforeunload', () => {
  connection.close(1000);
});
connection.addEventListener('message', event => {
  let info = JSON.parse(event.data);
  counter.textContent = info.connections;
  errors.textContent = info.errors;
});
