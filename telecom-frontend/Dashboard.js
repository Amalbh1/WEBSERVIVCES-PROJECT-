// Fetch username from localStorage
const username = localStorage.getItem('username');
if (username) {
    document.getElementById('username').textContent = username;
} else {
    window.location.href = 'index.html';  // If no username is found, redirect to login
}

// Event listeners for buttons
document.getElementById('update-password-btn').addEventListener('click', function() {
    alert('This will be the update password functionality');
    // Add your password update logic here
});

document.getElementById('predict-usage-btn').addEventListener('click', function() {
    alert('This will be the predict usage functionality');
    // Add your usage prediction logic here
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('access_token');  // Remove the JWT token
    localStorage.removeItem('username');     // Remove the username
    window.location.href = 'index.html';      // Redirect to login page
});
