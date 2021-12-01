///////////////
// VARIABLES //
///////////////


/////////////////
// DOM METHODS //
/////////////////


///////////////
// FUNCTIONS //
///////////////


const add = function() {
	values = [...arguments];

  let added = values[0] + values[1];
  return added;
};

const subtract = function() {
	values = [...arguments];

  let subtracted = values[0] - values [1];
  return subtracted;
};

const multiply = function() {
	values = [...arguments];

  let multiplied = values[0];
  for (let i=1; i<values.length; i++){
    multiplied *= values[i];
  }

  return multiplied;
};

const divide = function() {
	values = [...arguments];

    let divided = values[0];
    for (let i=1; i<values.length; i++){
      divided /= values[i];
    }
  
    return divided;
  };

const power = function() {
	values = [...arguments];

  let powered = Math.pow(values[0], values[1]);
  return powered;
};

const factorial = function(value) {

  let answer
  if (value === 0){
    answer = 1;
  }
  else {
    answer = FirstFactorial(value);
  }
  return answer;
};

function FirstFactorial(num) {
  return (num === 1 ? 1 : num * FirstFactorial(num - 1));
}