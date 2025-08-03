/* --------------------------------------------------
   03_handle_response.js  – Working with JSON arrays
-------------------------------------------------- */

const fetch = require('node-fetch');

async function main() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await res.json(); // ← posts is now a JS array

        // Print the titles of the first 5 posts
        posts.slice(0, 5).forEach((post, idx) => {
            // you can do anything here, just an example 
            console.log(`${idx + 1}.`, post.title);
        });
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}

main();