///////////////
// VARIABLES //
///////////////

let displayString = "0";
let previousString = "";
let currentValue;
let previousValue;
let operator;
let answer;

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
  let key;

  // Matches multiple keys that perform the same function 
  switch(e.key) {
    case "Delete":  
      key = "Escape";
      break;
    case "Enter":
      key = "=";
      break;
    default:
      key = e.key;
  }  
  
  // Checks if one of the calculator button is associated with the pressed key 
  const button = document.querySelector(`button[data-key="${key}"]`);

  // If key corresponds to one of the buttons, it calls pressingButton function
  if (button) {
    pressingButton(button);
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
  previousValue = null;
  operator = null;
  operateNow = false;
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
  let operatorID = button.getAttribute('id');
  let newOperator;

  // Attributes different operator values depending on which button got pressed
  switch(operatorID) {
    case "factorial":
      newOperator = "!";
      answer = operate(newOperator);
      break;
    case "equals":
      newOperator = button.textContent;
      if (operator) {
        answer = operate(operator);
      }
      else {
        answer = operate(newOperator);
      }
      break;
    case "power":
      newOperator = "^";
      if (operator) {
        answer = operate(operator);
      }
    default:
      newOperator = button.textContent;
      if (operator){
        answer = operate(operator);
      }
  }

  if (operator || newOperator === "="){
    let answer = operate();
    updateVariables(answer);
  }
  else {
    updateVariables(currentValue);
  }

  operator = newOperator;
}

// Updates calculator display
function updateDisplay(){
  currentValue = parseFloat(displayString);
  operationDisplay.textContent = previousString;
  currentDisplay.textContent = displayString;
}

function updateVariables(displayValue) {
  // Adds current value to previous value
  previousValue = currentValue;

  // Passes current display to previous display
  displayString += operator;
  previousString = `${displayString}`;

  // Resets current value
  displayString = `${displayValue}`;
}

// Calls different functions depending on operator
function operate(mathOperation) {
  switch(mathOperation) {
    case "÷":
      return divide(currentValue, previousValue);
    case "*":
      return multiply(currentValue, previousValue);
    case "+":
      return add(currentValue, previousValue);
    case "-":
      return subtract(currentValue, previousValue);
    case "^":
      return power(currentValue, previousValue);
    case "!":
      return factorial(currentValue);
    default:
      return currentValue;
  } 
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