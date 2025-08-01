// app.js
// Variables
let username = "john";
let age = 25;

// If statements - check user age
if (age >= 18) {
    console.log(username + " is an adult");
}

// For loop - count from 0 to 4
for (let i = 0; i < 5; i++) {
    console.log("Count: " + i);
}

// Function - greet user by name
function greetUser(name) {
    return "Hello, " + name;
}

console.log(greetUser(username));