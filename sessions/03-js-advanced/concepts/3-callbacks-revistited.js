/* --------------------------------------------------
   CALLBACK FUNCTIONS
--------------------------------------------------
   • A callback is a function passed as an argument to another function
   • Useful for async or deferred logic
-------------------------------------------------- */

// setTimeout example
function example() {
  console.log('⏳ Waiting for 2 seconds...');
  setTimeout(() => {
    // callback
    console.log('✅ Done waiting!');
  }, 2000); // Wait for 2 seconds
}

example();

function fetchData(callback) {
  console.log('📡 Fetching data...');
  setTimeout(() => {
    const data = { id: 1, name: 'Asha' };
    console.log('✅ Data fetched');
    callback(data); // run the callback after data "arrives"
  }, 1000);
}

function printUser(user) {
  console.log('🙌 User received in callback:', user);
}

fetchData(printUser);
