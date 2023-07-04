const imgUrl = document.getElementById('product_img')
const imgFile = document.getElementById('file')
const imgUploadRadio = document.getElementById('img_upload_radio')
const imgURLRadio = document.getElementById('img_url_radio')

const updateTitle = document.getElementById('update_product_title')
const updateImgUrl = document.getElementById('update_product_img')
const updateImgFile = document.getElementById('update_file')
const updateDescription = document.getElementById('update_product_des')
const updatePrice = document.getElementById('update_product_price')

const updateImgUploadRadio = document.getElementById('update_img_upload_radio')
const updateImgURLRadio = document.getElementById('update_img_url_radio')
const updateForm = document.getElementById('update_form')

const addBeforeRadio = document.getElementById('add_before_radio')
const addAfterRadio = document.getElementById('add_after_radio')
const addLastRadio = document.getElementById('add_last_radio')
const pid = document.getElementById('pid')

let currentId = 1
// setting the product id input display to none;
pid.style.display = 'none'

//if the addlast radio is checked hide the product id input
addLastRadio.addEventListener('click', (e) => {
  if (e.target.checked) {
    pid.style.display = 'none'
  }
})

// else if either of addbefore radio or addafter radio is checked show the product id input
addBeforeRadio.addEventListener('click', (e) => {
  if (e.target.checked) {
    pid.style.display = 'block'
  }
})

addAfterRadio.addEventListener('click', (e) => {
  if (e.target.checked) {
    pid.style.display = 'block'
  }
})

// show the imgupload input only if the radio button is selected
imgFile.style.display = 'none'
updateImgFile.style.display = 'none'

imgUploadRadio.addEventListener('click', () => {
  console.log('hello')
  if (imgUploadRadio.checked) {
    imgFile.style.display = 'block'
    imgUrl.style.display = 'none'
  }
})

imgURLRadio.addEventListener('click', () => {
  if (imgURLRadio.checked) {
    imgFile.style.display = 'none'
    imgUrl.style.display = 'block'
  }
})

updateImgUploadRadio.addEventListener('click', () => {
  if (updateImgUploadRadio.checked) {
    updateImgFile.style.display = 'block'
    updateImgUrl.style.display = 'none'
  }
})

updateImgURLRadio.addEventListener('click', () => {
  if (updateImgURLRadio.checked) {
    updateImgFile.style.display = 'none'
    updateImgUrl.style.display = 'block'
  }
})

const generateProducts = (products) => {
  let productsString = ''
  products.forEach(({ title, image, description, price, id }) => {
    productsString += `<div class="product__card" style="min-height:490px;  width: 18rem;">
      <img src="${image}" class="product__image"
    alt="${title}">
      <div class="product__body">
      <div class="details">
      <h3 class="card-text">${title}</h3>
      <p class="card-text">${description}</p>
      <p class="card-text">&#8377; ${price}</p>
      </div>
      <div class="mt-3">
      <button class="btn btn-primary" id="remove_btn" data-pid=${id}>Remove</button>

      <!-- Button trigger modal -->
      <button type="button" id="update" class="btn btn-primary" data-pid=${id}  data-bs-toggle="modal" data-bs-target="#exampleModal">
        Update
      </button>

     </div>
      </div>
      </div>
    `
  })

  return productsString
}

const loadProductsFromJSON = async () => {
  const res = await fetch('./products.json')
  const products = await res.json()
  products.forEach((p) => {
    p.id = uid()
    return p
  })
  localStorage.setItem('products', JSON.stringify(products))
  location.reload()
}

const productsWrapper = document.getElementById('products__wrapper')
let products = getFromLocalStorage()

if (products.length == 0) {
  productsWrapper.innerHTML = `<div><h3>Load Products</h3><button onclick="loadProductsFromJSON()" class="btn btn-primary">Load</button>`
} else {
  productsWrapper.innerHTML = generateProducts(products)
}

// get the form element
const form = document.getElementById('form')

// on submit event create a new formdata object.
// formdata will automatically get the input data and puts into a Map.
// creating a new formdata will trigger a formdata event.
form.addEventListener('submit', (e) => {
  e.preventDefault()
  new FormData(form)
})

// on formdata event we get the values and add the products
form.addEventListener('formdata', async (e) => {
  let { formData } = e

  let image = formData.get('image')
  let file = document.getElementById('file').files[0]
  if (file) {
    // if img upload convert the image to base64 string
    image = await convertBase64(file)
  }
  const product = {
    title: formData.get('title'),
    image,
    description: formData.get('desc'),
    price: Number(formData.get('price')),
  }

  const products = getFromLocalStorage()

  // add to last
  if (addLastRadio.checked) {
    products.push({ id: uid(), ...product })
    localStorage.setItem('products', JSON.stringify(products))
    location.reload()
  }

  // add before
  else if (addBeforeRadio.checked) {
    let id = formData.get('pid')
    addBefore(product, id)
  }

  // add after
  else {
    let id = formData.get('pid')
    addAfter(product, id)
  }
})

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      resolve(fileReader.result)
    }

    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

const addBefore = (product, id) => {
  const products = getFromLocalStorage()
  const index = id - 1
  //using splice to remove the product from the array
  products.splice(index, 0, { id: uid(), ...product })
  writeToLocalStorage(JSON.stringify(products))
  location.reload()
}

const addAfter = (product, id) => {
  const products = getFromLocalStorage()
  products.splice(id, 0, { id: uid(), ...product })
  writeToLocalStorage(JSON.stringify(products))
  location.reload()
}

const removeItem = (id) => {
  const products = JSON.parse(localStorage.getItem('products')) || []
  let updatedProducts = products.filter((c) => c.id != id)
  writeToLocalStorage(JSON.stringify(updatedProducts))
  location.reload()
}

const removeFromCartBtn = document.querySelectorAll('#remove_btn')
removeFromCartBtn.forEach((b) =>
  b.addEventListener('click', (e) => {
    removeItem(e.target.getAttribute('data-pid'))
  })
)

function writeToLocalStorage(products) {
  localStorage.setItem('products', products)
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem('products')) || []
}

const uid = function() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

const updateFromCartBtn = document.querySelectorAll('#update')
updateFromCartBtn.forEach((b) =>
  b.addEventListener('click', (e) => {
    populateData(e.target.getAttribute('data-pid'))
  })
)

updateForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let updatedProduct = {
    id: currentId,
    title: updateTitle.value,
    image: updateImgUrl.value,
    description: updateDescription.value,
    price: updatePrice.value,
  }

  let updatedProducts = products.map((p) => {
    if (p.id == currentId) {
      return updatedProduct
    } else return p
  })
  writeToLocalStorage(JSON.stringify(updatedProducts))
  location.reload()
})

const populateData = (id) => {
  const product = products.filter((p) => p.id == id)[0]
  updateTitle.value = product.title
  updateImgUrl.value = product.image
  updateDescription.value = product.description
  updatePrice.value = product.price
  currentId = id
}
