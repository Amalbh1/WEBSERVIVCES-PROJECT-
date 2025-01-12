from flask import Flask, jsonify, request

from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import SQLAlchemyError
from models import db, User, TelecomUsage  # Ensure these models are defined properly in 'models.py'
from config import DevelopmentConfig  # Ensure correct config is imported
from utils import role_required  # Import the role_required decorator
from prediction import predict_usage, get_holidays  # Import the prediction logic
import math
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)
# Initialize Bcrypt for password hashing
bcrypt = Bcrypt(app)

# Configure the app to use the database and JWT
app.config.from_object(DevelopmentConfig)

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Update the allowed origin


# Initialize migration
from flask_migrate import Migrate
migrate = Migrate(app, db)

# Health check route
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"message": "API is running"}), 200

# User registration route - Only accessible by Admin
@app.route("/api/register", methods=["POST"])
@jwt_required()
@role_required('admin')  # Only admins can register users with specific roles
def register():
    data = request.get_json()
    user_id = data.get("id")
    username = data.get("username")
    password = data.get("password")
    phone_number = data.get("phone_number")
    role = data.get("role", "user")  # Default to "user" if no role is provided

    if not user_id or not username or not password or not phone_number:
        return jsonify({"message": "ID, username, password, and phone number are required"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 400

    if User.query.filter_by(phone_number=phone_number).first():
        return jsonify({"message": "Phone number already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(id=user_id, username=username, password=hashed_password, phone_number=phone_number, role=role)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500


# User login route
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Query the user based on username
    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        # Check if the role is None and handle it
        role = user.role.value if user.role else 'user'  # Default to 'user' if role is None

        # Ensure that the id is passed as an integer in the token
        token = create_access_token(identity={"username": username, "role": role, "id": user.id})
        
        # Include user details in the response
        user_info = {
            "user_id": user.id,
            "username": user.username,
            "role": role,
            # Add any other user details you want to include
        }

        return jsonify({"access_token": token, "user": user_info}), 200

    return jsonify({"message": "Invalid credentials"}), 401




# Fetch telecom usage data (Admin can access all users' data, Users can only access their own data)
@app.route("/api/telecom-usage", methods=["GET"])
@jwt_required()
def get_usage():
    current_user = get_jwt_identity()

    # Admins can access all users' data
    if current_user["role"] == "admin":
        usage_records = TelecomUsage.query.all()
        result = [record.as_dict() for record in usage_records]
        return jsonify(result), 200
    
    # Users can only access their own data
    if current_user["role"] == "user":
        user_usage = TelecomUsage.query.filter_by(user_id=current_user["id"]).first()

        if not user_usage:
            return jsonify({"message": "User data not found"}), 404

        result = user_usage.as_dict()
        return jsonify(result), 200

    return jsonify({"message": "Access forbidden"}), 403


# Change user password (Admin can update any user's password, Users can only update their own password)
@app.route("/api/change-password", methods=["PUT"])
@jwt_required()
def change_password():
    current_user = get_jwt_identity()
    data = request.get_json()

    old_password = data.get("old_password")
    new_password = data.get("new_password")

    # If the user is admin, they can update any user's password
    if current_user["role"] == "admin":
        user_id = data.get("user_id")
        user = User.query.filter_by(id=user_id).first()
    else:
        # Users can only change their own password
        user = User.query.filter_by(id=current_user["id"]).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not bcrypt.check_password_hash(user.password, old_password):
        return jsonify({"message": "Incorrect old password"}), 400

    hashed_new_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    user.password = hashed_new_password

    try:
        db.session.commit()
        return jsonify({"message": "Password changed successfully"}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500


def generate_suggestion(predicted_usage):
    # Round the predicted usage up to the nearest multiple of 10
    rounded_usage = math.ceil(predicted_usage / 10) * 10
    
    # Create the suggestion with the rounded value
    suggested_offer = f"We suggest the {rounded_usage}GB plan for the next month. Would you like to proceed with this offer?"

    return suggested_offer

# Predict data usage and save it to the database (with holiday detection)
@app.route("/api/predict", methods=["POST"]) 
@jwt_required()
def predict_usage_api():
    data = request.get_json()
    user_id = data.get("user_id")

    if not user_id:
        return jsonify({"message": "User ID is required"}), 400

    current_user = get_jwt_identity()
    print(f"id Coming: { user_id}")
    
    print(f"Current User: {current_user}")


    # Ensure users can only predict their own usage data
    if current_user["role"] == "user" and current_user["id"] != user_id:
        return jsonify({"message": "You can only predict your own data"}), 403

    # Fetch user usage data from the last 11 months
    user_usage = TelecomUsage.query.filter_by(user_id=user_id).first()
    if not user_usage:
        return jsonify({"message": "User data not found"}), 404

    usage_data = [
        user_usage.month_1, user_usage.month_2, user_usage.month_3,
        user_usage.month_4, user_usage.month_5, user_usage.month_6,
        user_usage.month_7, user_usage.month_8, user_usage.month_9,
        user_usage.month_10, user_usage.month_11, user_usage.month_12
    ]
    
    # Fetch holidays for Tunisia in 2024
    holidays = get_holidays(year=2024, country="TN")

    # Adjust prediction based on holidays
    predicted_usage = predict_usage(usage_data, holidays)
    
    # Generate the suggestion
    suggested_offer = generate_suggestion(predicted_usage)
    
    # Save predicted usage and suggestion in the database
    try:
        user_usage.predicted_usage = predicted_usage
        user_usage.suggestion = suggested_offer  # Save the suggestion
        db.session.commit()

        return jsonify({
            "user_id": user_id,
            "predicted_usage": predicted_usage,
            "suggestion": suggested_offer,
            "message": "Thank you for your time! Let us know if you'd like to proceed with the offer."
        }), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"message": f"Error saving predicted usage and suggestion: {str(e)}"}), 500

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
