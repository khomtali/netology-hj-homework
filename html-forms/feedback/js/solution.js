'use strict';
const inputForms = document.getElementsByTagName('input'),
      buttons = document.getElementsByClassName('button-contact');
const forms = Array.from(inputForms);
forms.push(document.getElementsByTagName('textarea')[0]);
document.getElementsByName('zip')[0].type = 'number';

for (let form of forms) {
  form.addEventListener('change', onFormChange)
}
buttons[0].addEventListener('click', sendForm);
buttons[1].addEventListener('click', changeForm);

function onFormChange(event) {
  if (event.target.value !== '') {
    event.target.setAttribute('data-validate', '');
  } else {
    event.target.removeAttribute('data-validate');
  }
  buttons[0].removeAttribute('disabled');
  for (let form of forms) {
    if (!form.hasAttribute('data-validate')) {
      buttons[0].setAttribute('disabled', '');
    }
  }
}

function sendForm(event) {
  event.preventDefault();
  document.getElementsByClassName('contentform')[0].classList.add('hidden');
  document.getElementById('output').classList.remove('hidden');
  for (let n = 0; n < forms.length; n++) {
    if (document.getElementById(forms[n].name)) {
      document.getElementById(forms[n].name).innerText = document.getElementsByName(forms[n].name)[0].value;
    }
  }
}

function changeForm() {
  document.getElementsByClassName('contentform')[0].classList.remove('hidden');
  document.getElementById('output').classList.add('hidden');
}
