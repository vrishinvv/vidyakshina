/* --------------------------------------------------
   PROMISES & async, await
--------------------------------------------------
   • Promise = object representing future completion or failure
   • Cleaner way to write async code
   • await "pauses" inside an async function
   • Combine with try/catch for errors

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

// any code block that calls "await" MUST be inside an "async" function -> RULE
async function loadData() {
  try {
    // "await" MUST be put before a promise in order to RESOLVE it
    const msg = await fakeApi(true); // code execution pauses until resolved
    console.log('✅ Success (async):', msg);
  } catch (err) {
    console.log('❌ Error (async):', err.message);
  }
}

loadData();
