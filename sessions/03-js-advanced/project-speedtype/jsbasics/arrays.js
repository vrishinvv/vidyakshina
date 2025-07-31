// 📦 Arrays
// A list of items (can be numbers, strings, etc.)

let fruits = ["Apple", "Banana", "Orange"];

console.log("First fruit: " + fruits[0]);

// Loop through all fruits
for (let i = 0; i < fruits.length; i++) {
  console.log("Fruit " + (i+1) + ": " + fruits[i]);
}

for(const a of fruits)
{
  console.log(a);
}