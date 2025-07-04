/* --------------------------------------------------
   INPUT & OUTPUT IN NODE
   -------------------------------------------------- */
// Console output is dead-simple:
console.log('👋  Hello, JS world!'); // console.log writes to stdout :contentReference[oaicite:1]{index=1}

// --- Reading CLI arguments --------------------------------------------
console.log('process.argv demo:', process.argv); // array of CLI tokens :contentReference[oaicite:2]{index=2}

// node inputOutput.js Alice
const nameFromArg = process.argv[2] || 'Stranger';
console.log(`Hi, ${nameFromArg} (from argv)!`);

// --- Interactive input with readline ----------------------------------
const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What's your favourite number? ", (answer) => {
  console.log(`Great choice: ${answer}`);
  rl.close();
}); // readline is the canonical way to read user input :contentReference[oaicite:3]{index=3}
