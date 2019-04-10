'use strict';

document.querySelector('.sign-in-htm .button').addEventListener('click', signIn);
document.querySelector('.sign-up-htm .button').addEventListener('click', signUp);

function signIn(event) {
  event.preventDefault();
  const form = document.querySelector('.sign-in-htm');
  let signInData = {
    email: form.email.value,
    password: form.password.value
  };
  
  fetch('https://neto-api.herokuapp.com/signin', {
    body: JSON.stringify(signInData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      }
    })
    .then((result) => {
      if (200 <= result.status && result.status < 300) {
        return result;
      }
    })
    .then((result) => { return result.json(); })
    .then((data) => {
      if(data.error) {
        form.querySelector('.error-message').innerHTML = data.message;
      } else {
        form.querySelector('.error-message').innerHTML = `Пользователь ${data.name} успешно авторизован`;
      }
  });
}

function signUp(event) {
  event.preventDefault();
  const form = document.querySelector('.sign-up-htm');
  let signUpData = {
    email: form.email.value,
    password: form.password.value,
    passwordcopy: form.passwordcopy.value,
    name: form.name.value
  };
  fetch('https://neto-api.herokuapp.com/signup', {
    body: JSON.stringify(signUpData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      }
    })
    .then((result) => {
      if (200 <= result.status && result.status < 300) {
        return result;
      }
    })
    .then((result) => { return result.json(); })
    .then((data) => {
      if(data.error) {
        form.querySelector('.error-message').innerHTML = data.message;
      } else {
        form.querySelector('.error-message').innerHTML = `Пользователь ${data.name} успешно зарегистрирован`;
      }
  });
}
