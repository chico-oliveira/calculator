///////////////
// VARIABLES //
///////////////


/////////////////
// DOM METHODS //
/////////////////


///////////////
// FUNCTIONS //
///////////////


function operate(operator, values) {
    let answer = 0;

    switch(operator) {
        case "÷":
            answer = divide(values);
            break;
        case "*":
            answer = multiply(values);
            break;
        case "+":
            answer = add(values);
            break;
        case "-":
            answer = subtract(values);
            break;
        case "^":
            answer = power(values);
            break;
        case "!":
            answer = factorial(values);
    }  
    console.log(answer);
}

const add = function(values) {
  let added = values[0] + values[1];
  return added;
};

const subtract = function(values) {
  let subtracted = values[0] - values [1];
  return subtracted;
};

const multiply = function(values) {
  let multiplied = values[0];
  for (let i=1; i<values.length; i++){
    multiplied *= values[i];
  }
  return multiplied;
};

const divide = function(values) {
  let divided = values[0];
  for (let i=1; i<values.length; i++){
    divided /= values[i];
  }
  return divided;
};

const power = function(values) {
  let powered = Math.pow(values[0], values[1]);
  return powered;
};

// FACTORIAL // 
const factorial = function(values) {
  value = values[0];
  if (value === 0){
    answer = 1;
  }
  else {
    answer = FirstFactorial(value);
  }
  return answer;
};

// Recursive function, starting on num, it goes down to 1, then bubbles up and multiplies by every consecutive number
function FirstFactorial(num) {
  return (num === 1 ? 1 : num * FirstFactorial(num - 1));
}
// FACTORIAL //