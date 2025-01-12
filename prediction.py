import joblib
import numpy as np
from datetime import datetime
import requests

# Load the trained Random Forest model
MODEL_PATH = 'data/rf_model.pkl'

try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {e}")

# Function to get holidays from an external API (Calendarific)
API_KEY = "sqLP0zES156SeiKCHNsmFSVSkDCmQvD0"
BASE_URL = "https://calendarific.com/api/v2/holidays"

def get_holidays(year=2020, country="TN"):
    """Fetch holidays from the Calendarific API."""
    url = f"{BASE_URL}?api_key={API_KEY}&country={country}&year={year}"
    response = requests.get(url)
    
    if response.status_code == 200:
        holidays = response.json()
        return holidays['response']['holidays']  
    else:
        print(f"Error fetching holiday data: {response.status_code}")
        return []


def predict_usage(input_data, holidays):
    """Predict usage, adjusting for holidays."""
    
    # Ensure we are passing 12 features to the model (add placeholder if necessary)
    if len(input_data) < 12:
        input_data.append(0)  # Add a default value (0) for missing month

    # Make the initial prediction
    prediction = model.predict(np.array(input_data).reshape(1, -1))[0]
    
    try:
        # Get the next month's holidays
        last_month = datetime(input_data[-1].year, input_data[-1].month, 1)
        next_month = last_month.replace(month=last_month.month % 12 + 1)
        
        # Count holidays for the next month
        next_month_holidays = sum(1 for holiday in holidays if holiday['date']['iso'].startswith(f"{next_month.year}-{next_month.month:02d}"))
        
        # Adjust prediction based on holidays
        if next_month_holidays == 1:
            prediction *= 1.1  
        elif next_month_holidays == 2:
            prediction *= 1.2  
        elif next_month_holidays >= 5:
            prediction *= 1.5  

    except Exception as e:
        print(f"Error adjusting prediction for holidays: {e}")
        # If there's an error, return the normal prediction without adjustments
    
    # Return the final prediction (normal prediction if holiday adjustment fails)
    return max(prediction, 0)  # Ensure prediction is positive
