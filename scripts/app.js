///////////////
// VARIABLES //
///////////////

let displayString = "0";
let previousString = "";
let currentValue;
let previousValue;
let operation;

const currentDisplay = document.querySelector(".current");
const operationDisplay = document.querySelector(".operation");
const buttons = document.querySelectorAll("button");

/////////////////
// DOM METHODS //
/////////////////

buttons.forEach(button => {
  button.addEventListener('click', pressingButton);
});

///////////////
// FUNCTIONS //
///////////////

// Initialize first grid after DOM and CSS finishes loading
window.onload = () => {
  updateDisplay();
}

function pressingButton(e) {
  let currentButton = e.target.classList;

  // Delete button
  if (currentButton.contains("delete")){
    Delete();
  }
  // Clear button
  else if (currentButton.contains("clear")){
    Clear();
    displayString = "0";
  }
  // Checks if maximum number of digits has been input before inserting more values
  else if(displayString.length <= 12){
    // Number Button
    if (currentButton.contains("number")){
      addNumber(e);
    }
    // Decimal Button
    else if (currentButton.contains("decimal")){
      addDecimal(e);
    }
    // One of the Mathematical Operators
    else {
      addOperator(e);
    }
  }
  updateDisplay();
}

// Deletes values and changes to 0 if last digit is deleted
function Delete(){
  if (displayString.length > 1){
    displayString = displayString.slice(0, -1);
  }
  else {
    displayString = "0";
  }
}

function Clear(){
  displayString = "0";
  previousString = "";
}

function addNumber(e){
  if (displayString === "0"){
    displayString = e.target.textContent;
  }
  else {
    displayString += e.target.textContent;
  }
}

// Only adds decimal point if one doesn't already exist
function addDecimal(e) {
    if (!displayString.includes(".")){
      displayString += e.target.textContent;
    }
}

function addOperator(e) {
  // Adds current value to previous value
  previousValue = currentValue;

  let operatorID = e.target.getAttribute('id');

  // Attributes different operator values depending on which button got pressed
  if (operatorID === "factorial"){
    operator = "!";
  }
  else if (operatorID === "power"){
    operator = "^"
  }
  else {
    operator = e.target.textContent;
  }

  // Passes current display to previous display
  displayString += operator;
  previousString = `${displayString}`;

  // Resets current value
  displayString = "0";
}

// Updates calculator display
function updateDisplay(){
  currentValue = parseFloat(displayString);
  operationDisplay.textContent = previousString;
  currentDisplay.textContent = displayString;
}

// Calls different functions depending on operator
function operate() {
  let answer = 0;
      
  switch(operator) {
    case "÷":
        answer = divide(currentValue, previousValue);
        break;
    case "*":
        answer = multiply(currentValue, previousValue);
        break;
    case "+":
        answer = add(currentValue, previousValue);
        break;
    case "-":
        answer = subtract(currentValue, previousValue);
        break;
    case "^":
        answer = power(currentValue, previousValue);
        break;
    case "!":
        answer = factorial(currentValue);
  }  
  console.log(answer);
}

// Mathematic Functions
const add = function(a, b) {
  return a + b;
};

const subtract = function(a, b) {
  return a - b;
};

const multiply = function(a, b) {
  return a *= b
};

const divide = function(a, b) {
  return a /= b;
};

const power = function(a, b) {
  return Math.pow(a, b);
};

// FACTORIAL // 
const factorial = function(a) {
  if (a === 0){
    return 1;
  }
  else {
    return FirstFactorial(a);
  }
};

// Recursive function, starting on num, it goes down to 1, then bubbles up and multiplies by every consecutive number
function FirstFactorial(num) {
  return (num === 1 ? 1 : num * FirstFactorial(num - 1));
}
// FACTORIAL //