// app.js
// login with delay
function simulateLogin(username) {
    console.log("Checking credentials for " + username + "...");
    
    setTimeout(() => {
        console.log("Login successful for " + username);
    }, 2000);
}

// Added user validation function
function validateUser(username, password) {
    if (username === "admin" && password === "123") {
        return true;
    }
    return false;
}

try {
    let user = "admin";
    let pass = "123";
    
    // Check if credentials are valid
    if (validateUser(user, pass)) {
        simulateLogin(user);
    } else {
        throw new Error("Invalid credentials");
    }
} catch (error) {
    console.log("Error: " + error.message);
}