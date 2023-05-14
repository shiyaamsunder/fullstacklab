const generateProducts = (products) => {
  let productsString = "";
  products.forEach(({ title, image, price, id }) => {
    productsString += `<div class="product__card" style="width: 18rem;">
      <img src="${image}" class="product__image"
    alt="${title}">
      <div class="product__body">
      <div class="details">
      <h3 class="card-text">${title}</h3>
      <p class="card-text">&#8377; ${price}</p>
      </div>
      <button class="btn btn-primary mt-3" id="add_to_cart" data-pid=${id}>Add to Cart</button>
      </div>
      </div>
    `
  })

  return productsString;
}


const productsWrapper = document.getElementById("products__wrapper");
(async () => {
  const res = await fetch("./products.json");
  const products = await res.json();
  productsWrapper.innerHTML = generateProducts(products);
  const addToCartBtn = document.querySelectorAll("#add_to_cart");
  addToCartBtn.forEach(b => b.addEventListener("click", (e) => {
    const pid = e.target.getAttribute("data-pid");
    const currentProduct = products.filter(p => p.id == pid)[0]
    addToCart(currentProduct);

  }))

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let found = cart.find(c => c.id === product.id);
    if (found) {
      const updatedCart = cart.map(c => (c.id === product.id ? { ...c, amount: c.amount + 1 } : c));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    else {
      cart.push({
        ...product,
        amount: 1
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }

  }
})()


