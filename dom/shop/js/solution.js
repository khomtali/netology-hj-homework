'use strict';
function getPriceFormatted(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

let count = 0, amount = 0;
const addBtns = document.querySelectorAll('.add');
const totalCount = document.querySelector('#cart-count');
const totalAmount = document.querySelector('#cart-total-price');

function addGood(event) {
  count += 1;
  amount += +event.target.dataset.price;
  totalCount.innerHTML = count;
  totalAmount.innerHTML = getPriceFormatted(amount);
}
for (const addBtn of addBtns) {
  addBtn.addEventListener('click', addGood);
}
