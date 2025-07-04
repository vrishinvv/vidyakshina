/* --------------------------------------------------
   DATA-TYPES & TYPE-COERCION
   -------------------------------------------------- */

// -- Primitives ---------------------------------------------------------
const bool = false; // Boolean
const num = 42; // Number
const str = '42'; // String
const undef = undefined; // Undefined
const nulVal = null; // Null
const big = 9007199254740991n; // BigInt (note the n)
const sym = Symbol('id'); // Symbol

// typeof reveals the runtime type
console.log(typeof bool, typeof num, typeof str); // boolean number string :contentReference[oaicite:5]{index=5}

// -- Objects ------------------------------------------------------------
const obj = { key: 'value' };
const arr = [1, 2, 3];

// -- Type coercion examples --------------------------------------------
console.log("'5' + 3  →", '5' + 3); // "53"  (string concatenation)
console.log("'5' - 3  →", '5' - 3); // 2     (string coerced to number)
console.log(Boolean(0), Boolean(1)); // false true :contentReference[oaicite:6]{index=6}

/*
Key take-aways
• JS has 7 primitive types + objects :contentReference[oaicite:7]{index=7}
• typeof null === 'object' (legacy quirk) :contentReference[oaicite:8]{index=8}
• Coercion happens implicitly with many operators—know the rules!
*/
