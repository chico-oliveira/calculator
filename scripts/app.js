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
  button.addEventListener('click', (e) => pressingButton(e.target));
});

// Listens for button presses
window.addEventListener('keydown', pressingKey);

///////////////
// FUNCTIONS //
///////////////

// Initialize first grid after DOM and CSS finishes loading
window.onload = () => {
  updateDisplay();
}

function pressingKey(e){
  const key = document.querySelector(`button[data-key="${e.keyCode}"]`);

  // If key corresponds to one of the buttons, it calls pressingButton function
  if (key) {
    pressingButton(key);
  }
}

function pressingButton(button) {
  // Checks what class of button was pressed
  switch(button.getAttribute("class")) {
    case "delete":  
      Delete();
      break;
    case "clear":
      Clear();
      break;
    case "decimal":
      addDecimal(button);
      break;
    case "number":
      addNumber(button);
      break;
    case "operator":
      addOperator(button);
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

function addNumber(button){
  if (!maxDisplay()){
    if (displayString === "0"){
      displayString = button.textContent;
    }
    else {
      displayString += button.textContent;
    }
  }
}

// Only adds decimal point if one doesn't already exist
function addDecimal(button) {
    if (!displayString.includes(".") && !maxDisplay()){
      displayString += button.textContent;
    }
}

function addOperator(button) {
  // Adds current value to previous value
  previousValue = currentValue;

  let operatorID = button.getAttribute('id');

  // Attributes different operator values depending on which button got pressed
  if (operatorID === "factorial"){
    operator = "!";
  }
  else if (operatorID === "power"){
    operator = "^"
  }
  else {
    operator = button.textContent;
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

function maxDisplay() {
  return displayString.length >= 12;
}