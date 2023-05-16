/**
  * Single Product item
  * @typedef {
    {
      id: number, 
        title: string, 
        description: string,
        image: string, 
        price: number
    }
  } Product
  */


/**
@type {Product[]}
*/
let products;


/**
  Loads data from a json file and stores it in localstorage
  */
async function loadProductsFromJSON() {
  const res = await fetch("./products.json");
  const products = await res.json();
  products.forEach(p => {
    p.id = uid()
    return p;

  })
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();

}


/**
  Generates a html using template strings
@param {Product[]} products - An array of product objects
  */
function generateProducts(products) {
  let productsString = "";
  products.forEach(({ title, image, price, id, description }) => {
    productsString += `<div class="product__card" style="width: 18rem;">
        <img src="${image}" class="product__image"
      alt="${title}">
        <div class="product__body">
        <div class="details">
        <h3 class="card-text">${title}</h3>
        <p class="card-text"> ${description}</p>
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


/**
  This is an Immediately Invoked Function Expression (IIFE)
We cannot call "await" on a top level js file. So the await function is 
wrapped inside of anonymous async function that gets invoked immediately.

  (async () => { ... } )() <- the function is invoked immediately.

  */
(async () => {

  /** @type {Product[]} */
  products = JSON.parse(localStorage.getItem("products")) || [];


  // if there are no products in localstorage, then we load the starter products
  // from a json file and stores it in localstorage. 
  if (products.length == 0) {
    productsWrapper.innerHTML = `<div><h3>Load Products</h3>
          <button onclick="loadProductsFromJSON()" class="btn btn-primary">
          Load
          </button>`
    return;
  }
  // if products does exists in local storage, then we simply generate the html
  // and load it into the DOM.
  else {
    productsWrapper.innerHTML = generateProducts(products);
  }


  // getting the add to cart buttons from all the products.
  const addToCartBtn = document.querySelectorAll("#add_to_cart");

  //looping thru each of the add to cart buttons and adding an eventlistener.
  addToCartBtn.forEach(b => b.addEventListener("click", (e) => {

    // get the current product id
    const pid = e.target.getAttribute("data-pid");

    // get the full product details from the global products array.
    const currentProduct = products.filter(p => p.id == pid)[0]

    addToCart(currentProduct);

  }))


  /**
    @param {Product} product
    */
  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];


    let found = cart.find(c => c.id === product.id);

    //if this product is already available in the cart. Then only update the amount.
    if (found && product && cart.length > 0) {
      // map thru the cart, if the current cart product id == product id then update the amount
      // else don't modify the cart product.
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


const uid = function() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
