///////////////
// VARIABLES //
///////////////

let displayString = "0";
let previousString = "";
let currentValue = 0;
let previousValue;
let operator;
let append = false;
let lastButton = null;

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
      if(append) Delete();
      break;
    case "clear":
      Clear();
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
      Evaluate();
      append = false;
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

  // Updates current value
  currentValue = parseFloat(displayString);
}

// Clear display and variables
function Clear(){
  displayString = "0";
  previousString = "";
  currentValue = 0;
  previousValue = null;
  operator = null;
}

// Adds number to display
function addNumber(button){
  if (displayString === "0" || !append){
    displayString = button.textContent;
  }
  else if (!maxDisplay()){
    displayString += button.textContent;
  }
  currentValue = parseFloat(displayString);
}

// Only adds decimal point if one doesn't already exist
function addDecimal(button) {
  // If it can't append decimal point (after clear or evaluation), resets to 0.
  if(!append) {
    displayString = "0.";
  }
  else if (!displayString.includes(".") && !maxDisplay()) {
    displayString += button.textContent;
  }
  currentValue = parseFloat(displayString);
}

// Adds new operator
function newOperator(button) {
  let operatorID = button.getAttribute('id');
  let newOperator = "";

  // When an operator is added it wipes previous string
  previousString = "";
  
  // Changes div id into required maths operations where necessary
  if (operatorID === "power") newOperator = "^";
  else newOperator = button.textContent;

  // If it's (Value + Operation + Value + Operation) then it evaluates the pair of values
  if (operator) {

    // Only calculates expression if an operator button has not been pressed twice in a row 
    if(!(lastButton.getAttribute("class") === "operator")){
      currentValue = operate(operator);
      // If it is an invalid calculation, it resets calculator
      if(!currentValue) {displayError(); return;}
    }

    // Updates the operation to be executed
    displayString = `${currentValue}`;
  }

  // Updates display strings and values
  updateStrings(newOperator);
  previousValue = currentValue;
  operator = newOperator;
}

function Evaluate(){
  // Only evaluates expression if there are new values
  if(lastButton == null || !(lastButton.getAttribute("class") === "equals")){
    currentValue = operate(operator);      
    
    // If it is an invalid calculation, it resets calculator
    if(!currentValue) displayError();{displayError(); return;}

    // After an equals is pressed, resets the operator
    operator = null;

    // Updates display strings
    updateStrings("=");
  }
}

// Updates strings that are then put on the calculator display
function updateStrings(symbol) {
  displayString += ` ${symbol} `;
  previousString += displayString;
  displayString = currentValue.toString();
}

// Updates calculator display
function updateDisplay(){
  checkLength();
  operationDisplay.textContent = previousString;
  currentDisplay.textContent = displayString;
}

// Calls different functions depending on operator
function operate(mathOperation) {

  switch(mathOperation) {
    case "÷":
      return divide(previousValue, currentValue);
    case "×":
      return multiply(previousValue, currentValue);
    case "+":
      return add(previousValue, currentValue);
    case "−":
      return subtract(previousValue, currentValue);
    case "^":
      return power(previousValue, currentValue);
    case "!":
      return factorial(currentValue);
    default:
      previousString = "";
      return currentValue;
  } 
}

// Mathematic Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const divide = (a, b) => (b==0 ? null : a /= b);  // If you try to divide by 0 it returns a null
const multiply = (a, b) => a *= b;
const power = (a, b) => Math.pow(a, b);



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


// Extra Functions //
function maxDisplay() {
  return displayString.length > 12;
}

// Error message for impossible calculations
function displayError() {
  if (operator === "÷") {
    console.log("Divide by 0 again. Divide by 0 again, I dare you, I double dare you, divide by 0 one more Goddamn time!");
  }
  Clear();
}

// If value exceeds maximum display length, adjusts display value
function checkLength() {
  if (maxDisplay()) {
    if (displayString.includes('.')) {

    }
    else {
      
    }
    let tempString = displayString;
    extra = tempString.length - 13;
    let e = "";
    
    // If value has an exponential, it adjusts the value
    if (tempString.includes('e')){
      e = tempString.slice(tempString.indexOf('e'));
      tempString = tempString.slice(0, tempString.indexOf('e'));
  
      let expon = e.slice(2);
      let correctedExpon = parseInt(expon) + extra;
      e = e.replace(`${expon}`, `${correctedExpon}`);
    }
    else {
      
    }
  
    let shortenedString = tempString.slice(0, tempString.length - extra);
    shortenedString += e;

    displayString = shortenedString;
  }
}


