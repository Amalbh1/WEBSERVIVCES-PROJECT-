from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

def verify_password(password, hashed_password):
    return bcrypt.check_password_hash(hashed_password, password)

from functools import wraps
from flask_jwt_extended import get_jwt_identity
from flask import jsonify

def role_required(required_role):
    def wrapper(fn):
        @wraps(fn)
        def decorated_function(*args, **kwargs):
            identity = get_jwt_identity()
            if identity["role"] != required_role:
                return jsonify({"message": "Forbidden: You do not have permission to access this resource"}), 403
            return fn(*args, **kwargs)
        return decorated_function
    return wrapper
