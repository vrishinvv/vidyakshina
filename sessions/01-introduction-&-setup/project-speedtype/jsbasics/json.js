// 📄 JSON (JavaScript Object Notation)
// A way to store and send data (like objects, but as text)

let jsonString = '{"name": "Kailash", "age": 25}';

// Convert JSON string to JS object
let user = JSON.parse(jsonString);
console.log("👋 Hello, " + user.name);

// Convert JS object to JSON string
let newJson = JSON.stringify(user);
console.log("📝 JSON string: " + newJson);
