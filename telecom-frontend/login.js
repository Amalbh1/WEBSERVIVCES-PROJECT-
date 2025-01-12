document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting the default way

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (!username || !password) {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').textContent = 'Please enter both username and password.';
        return;
    }

    fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            // Check if the response is not OK (like 4xx or 5xx errors)
            throw new Error('Server error. Please try again later.');
        }
        return response.json();  // Parse JSON response
    })
    .then(data => {
        if (data.access_token) {
            console.log(data);
            // Save token, username, role, and user_id to localStorage
            localStorage.setItem('access_token', data.access_token);  // Save token
            localStorage.setItem('username', username);  // Save username
            localStorage.setItem('role', data.user.role);  // Save role
            localStorage.setItem('user_id', data.user.user_id);  // Save user_id (ensure it matches the response field)

            // Optionally, redirect to a protected page after successful login
            window.location.href = './Dashboard.html';  // Replace with your desired redirect URL
        } else {
            // Handle invalid credentials or other issues
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('error-message').textContent = 'Invalid credentials. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').textContent = error.message || 'An unexpected error occurred. Please try again.';
    });
});
