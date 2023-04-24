class VendingMachine {
  #items = {
    1: { name: "Four line notebook", stock: 2 },
    2: { name: "Two line notebook", stock: 10 },
    3: { name: "HB pencil", stock: 8 },
    4: { name: "Eraser", stock: 10 },
    5: { name: "Drawing Notebook", stock: 2 },
  };

  sale(id) {
    let item = this.#items[id];
    if (item && item.stock > 0) {
      item.stock = item.stock - 1;
      return "Sale success";
    } else {
      return "Failed: Selected item is either not available or out of stock";
    }
  }

  stock() {
    let stockString = "";
    let total = 0;
    for (let id in this.#items) {
      stockString += `<p>${this.#items[id].name}: ${this.#items[id].stock === 0 ? "Out of stock" : this.#items[id].stock
        }</p>\n`;
      total += this.#items[id].stock;
    }

    stockString += `\n<p>Total items in stock: ${total}</p>\n`;
    return stockString;
  }
}

const vm = new VendingMachine();

let result = document.querySelector("#result");
let message = document.querySelector("#message");
let selectElement = document.getElementById("item");

let stock = document.getElementById("stock_btn");
let buy = document.getElementById("buy_btn");

result.innerHTML += `${vm.stock()}`;

buy.addEventListener("click", () => {
  alert(vm.sale(Number.parseInt(selectElement.value)));
});


stock.addEventListener("click", () => {
  result.innerHTML = `${vm.stock()}`;
  message.innerHTML = "";
});
