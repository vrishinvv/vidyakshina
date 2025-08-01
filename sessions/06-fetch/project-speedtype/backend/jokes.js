// Fetch a joke from external API
async function fetchJoke() {
    try {
        // Make request to joke API
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const joke = await response.json();
        
        console.log("Setup:", joke.setup);
        console.log("Punchline:", joke.punchline);
    } catch (error) {
        console.log("Error:", error.message);
    }
}

fetchJoke();