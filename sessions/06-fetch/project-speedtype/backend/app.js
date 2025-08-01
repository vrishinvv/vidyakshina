// app.js
// Working with objects
let user = {
    username: "admin",
    password: "123"
};

console.log("Username:", user.username);

// Convert object to JSON string
let userJSON = JSON.stringify(user);
console.log("User as JSON:", userJSON);

// Convert JSON back to object
let userObject = JSON.parse(userJSON);
console.log("Back to object:", userObject.username);