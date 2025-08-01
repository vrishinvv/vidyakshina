// app.js
// Login with delay
function simulateLogin(username) {
    console.log("Checking credentials for " + username + "...");
    
    // Wait 2 seconds then show result
    setTimeout(() => {
        console.log("Login successful for " + username);
    }, 2000);
}

// Try catch for error handling
try {
    let user = "admin";
    if (user === "admin") {
        simulateLogin(user);
    } else {
        throw new Error("Invalid user");
    }
} catch (error) {
    console.log("Error: " + error.message);
}