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
let lastButton;

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
      append = false;
      break;
    case "decimal":
      addDecimal(button);
      append = true;
      break;
    case "number":
      addNumber(button);
      append = true;
      break;
    case "operator":
      newOperator(button);
      append = false;
      break;
    case "equals":
      // Only evaluates expression if there are new values
      if(!(lastButton.getAttribute("class") === "equals")){
        Evaluate(button);
        append = false;
        operator = null;
      }
  }  
  updateDisplay();
  lastButton = button;
}

// Deletes values and changes to 0 if last digit is deleted
function Delete(){
  if (displayString.length > 1){
    displayString = displayString.slice(0, -1);
  }
  else {
    displayString = "0";
  }
  currentValue = parseFloat(displayString);
}

function Clear(){
  displayString = "0";
  previousString = "";
  currentValue = 0;
  previousValue = null;
  operator = null;
}

function addNumber(button){
  if (!maxDisplay()){
    if (displayString === "0" || !append){
      displayString = button.textContent;
    }
    else {
      displayString += button.textContent;
    }
  }
  currentValue = parseFloat(displayString);
}

// Only adds decimal point if one doesn't already exist
function addDecimal(button) {
    if (!displayString.includes(".") && !maxDisplay()){
      displayString += button.textContent;
    }
    currentValue = parseFloat(displayString);
}

function newOperator(button) {
  let operatorID = button.getAttribute('id');
  let newOperator = "";
  
  // Changes div id into required maths operations where necessary
  if (operatorID === "power") newOperator = "^";
  else newOperator = button.textContent;

    previousString = "";
    if (operator) {
      // Doesn't calculate expression if an operator is pressed twice 
      if(!(lastButton.getAttribute("class") === "operator")){
        Evaluate(button);
      }
      
      displayString = `${currentValue}`
      displayString += ` ${newOperator} `;
      previousString += displayString;
      displayString = currentValue.toString();
    }
    else {
      previousValue = currentValue;
      displayString += ` ${newOperator} `;
      previousString += displayString;
      displayString = currentValue.toString();
    }
  operator = newOperator;
}

function Evaluate(button){
  operate(operator);

  switch (button.getAttribute("class")){
    case "equals":
      currentValue = answer;

      displayString += ` = `;
      previousString += displayString;
      displayString = currentValue.toString();

    case "operator": 
      previousValue = answer;
      currentValue = answer;
  }
}

// Updates calculator display
function updateDisplay(){
  operationDisplay.textContent = previousString;
  currentDisplay.textContent = displayString;
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
      previousString = "";
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