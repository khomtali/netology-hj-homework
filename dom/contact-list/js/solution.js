'use strict';
const contacts = JSON.parse(loadContacts());
const contactList = document.querySelector('.contacts-list');
let innerString = '';

for (let contact of contacts) {
  innerString += `<li data-email="${contact.email}"
data-phone="${contact.phone}">
<strong>${contact.name}</strong>
</li>`
}
contactList.innerHTML = innerString;
