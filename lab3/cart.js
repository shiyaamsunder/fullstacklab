
const generateCartString = (cart) => {
  let cartString = "";
  cart.forEach(({ title, image, price, id, amount }) => {
    cartString += `<div class="product__card" style="width: 18rem;">
      <img src="${image}" class="product__image"
    alt="${title}">
      <div class="product__body">
      <div class="details mb-3">
      <h3 class="card-text">${title}</h3>
      <p class="card-text">&#8377; ${price}</p>
      <p class="card-text">Quantity: ${amount}</p>
      </div>
      <div class="btn-group">
      <button class="btn btn-outline-secondary" id="remove_one" data-pid=${id}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
        </svg>
      </button>
      <button class="btn btn-outline-secondary" id="add_one" data-pid=${id}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </button>
      </div>
      <button class="btn btn-primary" id="remove_from_cart" data-pid=${id}>Remove All</button>
      </div>
      </div>
    `
  })
  return cartString;
}



const generateCart = () => {
  const cartWrapper = document.getElementById("products__wrapper");
  cartWrapper.innerHTML = "";
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartString = cart.length > 0 ? generateCartString(cart) : `<div class="m-3">Cart is Empty</div>`
  cartWrapper.innerHTML = cartString;
}

function removeOne(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart);
  const item = cart.filter(c => c.id === id)[0];
  let updatedCart
  if (item.amount != 1) {
    updatedCart = cart.map(c => (c.id == id ? { ...c, amount: c.amount - 1 } : c));
  }
  else {
    updatedCart = cart.filter(c => c.id != id);
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  location.reload();
}


const removeAll = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let updatedCart = cart.filter(c => c.id != id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  location.reload();
}

const addOne = (id) => {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let found = cart.find(c => c.id === id);
  let products = JSON.parse(localStorage.getItem("products")) || [];
  console.log(found);
  if (found) {
    const updatedCart = cart.map(c => (c.id === id ? { ...c, amount: c.amount + 1 } : c));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
  else {
    const product = products.filter(c => c.id === id)[0];
    cart.push({
      ...product,
      amount: 1
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  location.reload();
}

generateCart();



const removeFromCartBtn = document.querySelectorAll("#remove_from_cart");
removeFromCartBtn.forEach(b => b.addEventListener("click", (e) => {
  removeAll(Number(e.target.getAttribute("data-pid")))
}));


const removeOneBtns = document.querySelectorAll("#remove_one");
removeOneBtns.forEach(b => b.addEventListener("click", (e) => {
  removeOne(Number(e.target.getAttribute("data-pid")))
}));


const addOneBtns = document.querySelectorAll("#add_one");
addOneBtns.forEach(b => b.addEventListener("click", (e) => {
  addOne(Number(e.target.getAttribute("data-pid")))
}));
