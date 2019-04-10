'use strict';
const wrapper = document.getElementsByClassName('wrapper-dropdown')[0];
function openClose() {
  this.classList.toggle('active');
}
wrapper.onclick = openClose;
