const imgUrl = document.getElementById("product_img");
const imgFile = document.getElementById("file");
const imgUploadRadio = document.getElementById("img_upload_radio");
const imgURLRadio = document.getElementById("img_url_radio");

const addBeforeRadio = document.getElementById("add_before_radio");
const addAfterRadio = document.getElementById("add_after_radio");
const addLastRadio = document.getElementById("add_last_radio");
const pid = document.getElementById("pid");

pid.style.display = "none";
addLastRadio.addEventListener("click", (e) => {
  if (e.target.checked) {
    pid.style.display = "none";
  }
});
addBeforeRadio.addEventListener("click", (e) => {
  if (e.target.checked) {
    pid.style.display = "block";
  }
});

addAfterRadio.addEventListener("click", (e) => {
  if (e.target.checked) {
    pid.style.display = "block";
  }
});

imgFile.style.display = "none";

imgUploadRadio.addEventListener("click", (e) => {
  if (imgUploadRadio.checked) {
    imgFile.style.display = "block";
    imgUrl.style.display = "none";
  }
});

imgURLRadio.addEventListener("click", (e) => {
  if (imgURLRadio.checked) {
    imgFile.style.display = "none";
    imgUrl.style.display = "block";
  }
});
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  new FormData(form);
});

form.addEventListener("formdata", async (e) => {
  let { formData } = e;

  let image = formData.get("image");
  let file = document.getElementById("file").files[0];
  if (file) {
    image = await convertBase64(file);
  }
  const product = {
    title: formData.get("title"),
    image,
    description: formData.get("desc"),
    price: Number(formData.get("price")),
  };

  const products = JSON.parse(localStorage.getItem("products")) || [];

  if(addLastRadio.checked) {
  products.push({ id: uid(), ...product });
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
  }
  else if(addBeforeRadio.checked){
    let id = Number(formData.get("pid"))
    addBefore(product, id)
  }
  else {
    let id = Number(formData.get("pid"))
    addAfter(product, id)
  }
});

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const generateProducts = (products) => {
  let productsString = "";
  products.forEach(({ title, image, description, price, id }) => {
    productsString += `<div class="product__card" style="width: 18rem;">
      <img src="${image}" class="product__image"
    alt="${title}">
      <div class="product__body">
      <div class="details">
      <h3 class="card-text">${title}</h3>
      <p class="card-text">${description}</p>
      <p class="card-text">&#8377; ${price}</p>
      </div>
      <button class="btn btn-primary mt-3" id="remove_btn" data-pid=${id}>Remove</button>
      </div>
      </div>
    `;
  });

  return productsString;
};

const loadProductsFromJSON = async () => {
  const res = await fetch("./products.json");
  const products = await res.json();
  const u = products.map(p => {
     p.id = uid()
     return p;

  })
  localStorage.setItem("products", JSON.stringify(products));
location.reload();
};
const productsWrapper = document.getElementById("products__wrapper");
products = JSON.parse(localStorage.getItem("products")) || [];
if (products.length == 0) {
  productsWrapper.innerHTML = `<div><h3>Load Products</h3><button onclick="loadProductsFromJSON()" class="btn btn-primary">Load</button>`;
} else {
  productsWrapper.innerHTML = generateProducts(products);
}

const removeItem = (id) => {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  let updatedProducts = products.filter((c) => c.id != id);
  localStorage.setItem("products", JSON.stringify(updatedProducts));
  location.reload();
};

const removeFromCartBtn = document.querySelectorAll("#remove_btn");
removeFromCartBtn.forEach((b) =>
  b.addEventListener("click", (e) => {
    removeItem(e.target.getAttribute("data-pid"))
  })
);




const addBefore = (product, id) => {
    const products = getFromLocalStorage();
    const index = id - 1;
    console.log(index)
    products.splice(index, 0, {id: uid(), ...product});
    writeToLocalStorage(JSON.stringify(products))
    location.reload()


}

const addAfter = (product, id) => {
    const products = getFromLocalStorage();
    products.splice(id, 0, {id: uid(), ...product});
    writeToLocalStorage(JSON.stringify(products))
    location.reload()


}

function writeToLocalStorage(products) {
  localStorage.setItem("products", products);
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("products")) || [];
}
const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

console.log(uid())