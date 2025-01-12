document.getElementById('predictForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent the form from submitting traditionally

  
    const storedUserId = localStorage.getItem('user_id');

    const accessToken = localStorage.getItem('access_token');

  


    // Check if access token is present
    if (!accessToken) {
        alert('Authentication is required. Please log in again.');
        window.location.href = 'index.html';
        return;
    }


    // Send API request for usage prediction
    fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ user_id: Number(storedUserId) })
    })
        .then((response) => {
            console.log('API Response Status:', response.status);
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(`Server Error: ${response.status} ${data.message || response.statusText}`);
                });
            }
            return response.json();
        })
        .then((data) => {
            console.log('API Response Data:', data);
            const messageDiv = document.getElementById('response-message');
            messageDiv.style.display = 'block';

            if (data.predicted_usage && data.suggestion) {
                messageDiv.style.color = 'green';
                messageDiv.innerHTML = `
                    <p><strong>Predicted Usage:</strong> ${data.predicted_usage} GB</p>
                    <p><strong>Suggested Offer:</strong> ${data.suggestion}</p>
                    <p>${data.message}</p>
                `;
            } else {
                messageDiv.style.color = 'red';
                messageDiv.textContent = data.message || 'Prediction failed. Please try again.';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            const messageDiv = document.getElementById('response-message');
            messageDiv.style.display = 'block';
            messageDiv.style.color = 'red';
            messageDiv.textContent = error.message;
        });
});

// Back to dashboard functionality
document.getElementById('back-btn').addEventListener('click', function () {
    window.location.href = 'dashboard.html'; // Redirect to the dashboard
});
