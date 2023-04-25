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
  if(op === "sin"){
    input.value  = Math.sin(Number(input.value * Math.PI/180))
  }
  else if(op === "cos"){
    input.value  = Math.cos(Number(input.value * Math.PI/180))
  }
  else if(op === "tan"){
    input.value  = Math.tan(Number(input.value * Math.PI/180))
  }
  else if(op === "abs"){
    input.value  = Math.abs(Number(input.value))
  }
  else if(op === "log"){
    input.value  = Math.log(Number(input.value))
  }
  else if(op === "log10"){
    input.value  = Math.log10(Number(input.value))
  }
  else if(op === "n!"){
    input.value  = factorial(Number(input.value))
  }

  else if(op === "pow"){
    input.value+= "**"
  }

  else input.value+=op;
  

}


// Function to calculate the result of the expression entered by the user
function calculateResult() {
  const expression = input.value;
  const result = eval(expression);
  input.value = result;

}

function factorial(n){
  let answer = 1;
  if (n == 0 || n == 1){
    return answer;
  }
  else if(n > 1){
    for(var i = n; i >= 1; i--){
      answer = answer * i;
    }
    return answer;
  }
  else{
    return "number has to be positive."
  }  
}