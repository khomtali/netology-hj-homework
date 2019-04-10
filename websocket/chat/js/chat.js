'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat'),
      chat = document.querySelector('.chat'),
      content = chat.querySelector('.messages-content'),
      submitForm = chat.querySelector('.message-box'),
      input = chat.querySelector('.message-input'),
      message = chat.querySelector('.message-text').parentElement,
      persMessage = chat.querySelector('.message-personal'),
      status = chat.querySelector('.message-status');
const writing = chat.querySelector('.loading').cloneNode(true);
writing.querySelector('span').textContent = 'Собеседник печатает сообщение';

connection.addEventListener('open', () => {
  chat.querySelector('.chat-status').textContent = chat.querySelector('.chat-status').dataset.online;
  chat.querySelector('.message-submit').removeAttribute('disabled');
  let curStatus = status.cloneNode(true);
  curStatus.querySelector('.message-text').textContent = 'Пользователь появился в сети';
  content.appendChild(curStatus);
});
connection.addEventListener('close', () => {
  chat.querySelector('.chat-status').textContent = chat.querySelector('.chat-status').dataset.offline;
  chat.querySelector('.message-submit').setAttribute('disabled', '');
  let curStatus = status.cloneNode(true);
  curStatus.querySelector('.message-text').textContent = 'Пользователь не в сети';
  content.appendChild(curStatus);
});
window.addEventListener("beforeunload", () => {
  connection.close(1000);
});

connection.addEventListener('message', (event) => {
  if (event.data == '...') {
    content.appendChild(writing);
    console.log(writing);
  } else {
    if (content.contains(writing)) {
      console.log(writing);
      content.removeChild(writing);
    }
    let curMessage = message.cloneNode(true);
    curMessage.querySelector('.message-text').textContent = event.data;
    curMessage.querySelector('.timestamp').textContent = timestamp();
    content.appendChild(curMessage);
  }
});
submitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  connection.send(input.value);
  let curPersMessage = persMessage.cloneNode(true);
  curPersMessage.querySelector('.message-text').textContent = input.value;  
  curPersMessage.querySelector('.timestamp').textContent = timestamp();
  content.appendChild(curPersMessage);
  console.log(content);
  input.value = '';
});

function timestamp() {
  const curDate = new Date();
  let hours, minutes;
  if (curDate.getHours() < 10) {
    hours = `0${curDate.getHours()}`;
  } else {
    hours = curDate.getHours();
  }
  if (curDate.getMinutes() < 10) {
    minutes = `0${curDate.getMinutes()}`;
  } else {
    minutes = curDate.getMinutes();
  }
  return `${hours}:${minutes}`;
}

content.style = 'overflow-y: auto;';
