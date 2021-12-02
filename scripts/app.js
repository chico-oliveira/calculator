///////////////
// VARIABLES //
///////////////

let displayString = "0";
let previousString = "";
let currentValue;
let previousValue;
let operator;
let answer;
let append = false;
let resetLast = false;

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
window.addEventListener('keydown', pressingKeyboard);

///////////////
// FUNCTIONS //
///////////////

// Initialize first grid after DOM and CSS finishes loading
window.onload = () => {
  updateDisplay();
}

function pressingKeyboard(e){
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
      break;
    case "equals":
      // Only evaluates expression if there are new values
      if(!answer){
        Evaluate(button.textContent);
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
  previousValue = null;
  operator = null;
  append = false;
}

function addNumber(button){
  if (!maxDisplay()){
    if (displayString === "0" || !append){
      displayString = button.textContent;
      append = true;
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
      append = true;
    }
}

function addOperator(button) {
  let operatorID = button.getAttribute('id');
  let newOperator = "";
  
  // Changes div id into required maths operations where necessary
  if (operatorID === "factorial") newOperator = "!";
  else if (operatorID === "power") newOperator = "^";
  else newOperator = button.textContent;

  resetLast = true;
  answer = null;
  updateVariables(currentValue, newOperator);
  operator = newOperator;
}

function Evaluate(op){
  operate(operator);

  updateVariables(answer, op);
  operator = null;
}

// Updates calculator display
function updateDisplay(){
  currentValue = parseFloat(displayString);
  operationDisplay.textContent = previousString;
  currentDisplay.textContent = displayString;
}

function updateVariables(displayValue, symbol) {
  // Adds current value to previous value
  previousValue = currentValue;

  // Passes current display to previous display
  displayString += ` ${symbol} `;

  // Adds to previous screen if evaluating, otherwise overwrites last operation
  if(resetLast){
    previousString = displayString;
    resetLast = false;
  }
  else {
    previousString += `${displayString}`;
  }

  // Resets current value
  displayString = `${displayValue}`;
  append = false;
}

// Calls different functions depending on operator
function operate(mathOperation) {

  switch(mathOperation) {
    case "÷":
       answer = divide(previousValue, currentValue);
       break;
    case "×":
      answer = multiply(previousValue, currentValue);
      break;
    case "+":
      answer = add(previousValue, currentValue);
      break;
    case "−":
      answer = subtract(previousValue, currentValue);
      break;
    case "^":
      answer = power(previousValue, currentValue);
      break;
    case "!":
      answer = factorial(currentValue);
      break;
    default:
      answer = currentValue;
  } 

  let calculation = `${previousValue} ${mathOperation} ${currentValue} = ${answer}`;
  console.log(calculation);
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
    let total = 1;
    for (let i=a; i > 0; i--) {
      total *= i;
    }
    return total;
  }
};

// Recursive function, starting on num, it goes down to 1, then bubbles up and multiplies by every consecutive number
function FirstFactorial(num) {
  return (num === 1 ? 1 : num * FirstFactorial(num - 1));
}
// FACTORIAL //

function maxDisplay() {
  return displayString.length >= 13;
}