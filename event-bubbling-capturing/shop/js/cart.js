'use strict';

let cartButtons = document.querySelectorAll('.add-to-cart');
const addItems = document.querySelector('.show-more');
addItems.addEventListener('click', updateBtns);

for (let cartBtn of cartButtons) {
  cartBtn.addEventListener('click', handleAddToCart);
}

function handleAddToCart(event) {
  event.preventDefault();
  const item = {};
  item.title = event.target.dataset.title;
  item.price = event.target.dataset.price;
  addToCart(item);
}

function updateBtns() {
  cartButtons = document.querySelectorAll('.add-to-cart');
  for (let cartBtn of cartButtons) {
    cartBtn.addEventListener('click', handleAddToCart);
  }
}
