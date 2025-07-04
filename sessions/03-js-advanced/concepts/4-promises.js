/* --------------------------------------------------
   PROMISES & .then()
--------------------------------------------------
   • Promise = object representing future completion or failure
   • Use .then() to handle success, .catch() for errors
-------------------------------------------------- */

function fakeApi(success = true) {
  return new Promise((resolve, reject) => {
    if (success) {
      resolve('🎉 Data loaded!'); // success outcome
    } else {
      reject(new Error('❌ Failed to load data!')); // error outcome
    }
  });
}

// since its a promise it will resolve to one of "then" or "catch" corresponding to the outcome
fakeApi(true)
  .then((msg) => {
    // Success handler
    console.log('✅ Success:', msg);
  })
  .catch((err) => {
    // Error handler
    console.log('❌ Error:', err.message);
  });
