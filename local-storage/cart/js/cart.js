'use strict';

Promise.all([
  fetch('https://neto-api.herokuapp.com/cart/colors'),
  fetch('https://neto-api.herokuapp.com/cart/sizes')
]).then(([res1, res2]) => {
  return [res1.json(), res2.json()];
}).then(([data1, data2]) => {
  let status, disabled, checked;
  const selSize = localStorage.getItem('size'),
        selColor = localStorage.getItem('color');
  data1.then(colors => {
    colors.forEach(color => {
      if (color.isAvailable) {
        status = 'available';
        disabled = '';
      } else {
        status = 'soldout';
        disabled = 'disabled';
      }
      if (selColor == color.type) {
        checked = 'checked';
      } else {
        checked = '';
      }
      window.colorSwatch.innerHTML += `<div data-value="${color.type}" class="swatch-element color ${color.type} ${status}">
        <div class="tooltip">${color.title}</div>
        <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}" ${checked} ${disabled}>
        <label for="swatch-1-${color.type}" style="border-color: red;">
          <span style="background-color: #${color.code};"></span>
          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label>
      </div>
      `;
    });
  });
  data2.then(sizes => {
    sizes.forEach(size => {
      if (size.isAvailable) {
        status = 'available';
        disabled = '';
      } else {
        status = 'soldout';
        disabled = 'disabled';
      }
      if (selSize == size.type) {
        checked = 'checked';
      } else {
        checked = '';
      }
      window.sizeSwatch.innerHTML += `<div data-value="${size.type}" class="swatch-element plain ${size.type} ${status}">
        <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${checked} ${disabled}>
        <label for="swatch-0-${size.type}">
          ${size.title}
          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label>
      </div>
      `;
    });
  });
});

function updateCart(items) {
  let totalPrice = 0;
  const quickCart = document.querySelector('#quick-cart');
  quickCart.innerHTML = '';
  items.forEach((item) => {
    quickCart.innerHTML += `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.id}" style="opacity: 1;">
      <div class="quick-cart-product-wrap">
        <img src="${item.pic}" title="${item.title}">
        <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
        <span class="s2"></span>
      </div>
      <span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>
      <span class="quick-cart-product-remove remove" data-id="${item.id}"></span>
    </div>
    `;
    totalPrice += +item.quantity * (+item.price);
  });
  let open = 'open';
  console.log(items.length);
  if (items.length == 0) {
    open = '';
  }
  quickCart.innerHTML += `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${open}">
    <span>
      <strong class="quick-cart-text">Оформить заказ<br></strong>
      <span id="quick-cart-price">$${totalPrice}</span>
    </span>
  </a>
  `;
}

fetch('https://neto-api.herokuapp.com/cart')
  .then(result => {
    return result.json();
  }).then(data => {
    updateCart(data);
  });

window.AddToCartForm.addEventListener('submit', addToCart);
function addToCart(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  formData.append('productId', window.AddToCartForm.dataset.productId);
  fetch('https://neto-api.herokuapp.com/cart', {
    method: 'POST',
    body: formData
  }).then((result) => {
    return result.json();
  }).then((data) => {
    if (data.error) {
      console.log(data.message);
    } else {
      updateCart(data);
    }
  });
  localStorage.setItem('color', formData.get('color'));
  localStorage.setItem('size', formData.get('size'));
}

document.querySelector('#quick-cart').addEventListener('click', removeItem);
function removeItem(event) {
  if (event.target.classList.contains('remove')) {
    const formData = new FormData(event.target);
    console.log(event.currentTarget);
    formData.append('productId', event.target.dataset.id);
    fetch('https://neto-api.herokuapp.com/cart/remove', {
      method: 'POST',
      body: formData
    }).then((result) => {
      return result.json();
    }).then((data) => {
      if (data.error) {
        console.log(data.message);
      } else {
        updateCart(data);
      }
    });
  }
}
