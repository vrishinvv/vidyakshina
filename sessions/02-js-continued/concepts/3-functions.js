/* --------------------------------------------------
   FUNCTIONS: Basics and Callbacks
-------------------------------------------------- */

// Basic function
function greet(name) {
  console.log(`Hello, ${name}!`);
}
greet("Asha");

// Function with return
function add(a, b) {
  return a + b;
}
console.log("5 + 3 =", add(5, 3));

// Function as a variable (arrow)
const multiply = (a, b) => a * b;
console.log("4 * 6 =", multiply(4, 6));

// Callback example
function processUserInput(input, callback) {
  console.log("Received input:", input);
  callback(input.toUpperCase());
}

processUserInput("sai", (upperName) => {
  console.log("Callback processed name:", upperName);
});
