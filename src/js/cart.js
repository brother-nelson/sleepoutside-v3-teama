import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; // Need to assign an empty array if LocalStorage is null (empty).
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");


  // cartItems will now never be NULL. More appropriate to check for empty array.
  if (cartItems.length > 0) {

    //console.log("The cart has something");
    let totalItems = cartItems.map(function (item) {
      let total = [];
      total.push(item.FinalPrice);
      return total;
    });
    document.querySelector(".checkout-area").innerHTML =
      checkoutTemplate(totalItems);
  }
}

function checkoutTemplate(items) {
  let sumTotal = 0;
  items.forEach((value) => {
    sumTotal += parseFloat(value);
  });
  /* console.log("Checking")
  console.log(sumTotal); */

  const totalPrice = `<div class="cart-footer-hide">
  <p class="cart-total">Total: $${sumTotal}</p>
  <button id="checkoutBtn">Checkout</button>
</div>`;
  return totalPrice;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
