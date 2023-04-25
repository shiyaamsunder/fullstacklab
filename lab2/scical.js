// Selecting the HTML elements
const input = document.querySelector("#inputxt");
const clearBtn = document.querySelector("#clear");
const delBtn = document.querySelector("#del");
const equalBtn = document.querySelector("#equal");
const numBtns = document.querySelectorAll(".btn-nmbr");
const opBtns = document.querySelectorAll(".dig-btn");

// Adding event listeners to the buttons

clearBtn.addEventListener("click", clearInput);
delBtn.addEventListener("click", deleteChar);
equalBtn.addEventListener("click", calculateResult);

numBtns.forEach((btn) => {
  btn.addEventListener("click", addNumber);
});


opBtns.forEach((btn) => {
  btn.addEventListener("click", addOperator);
});

// Function to clear the input field
function clearInput() {
  input.value = "";
}


// Function to delete the last character from the input field
function deleteChar() {
  input.value = input.value.slice(0, -1);
}


// Function to add a number to the input field
function addNumber(e) {
  const num = e.target.textContent;
  input.value += num;

}


// Function to add an operator to the input field
function addOperator(e) {
  const op = e.target.textContent;
  console.log(op);
}


// Function to calculate the result of the expression entered by the user
function calculateResult() {
  const expression = input.value;
  const result = eval(expression);
  input.value = result;

}

