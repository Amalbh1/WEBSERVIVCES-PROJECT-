from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum
import enum
# Initialize SQLAlchemy
db = SQLAlchemy()

class TelecomUsage(db.Model):
    __tablename__ = 'telecom_usage'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    user = db.relationship('User', back_populates='telecom_usage')

    # columns for each month
    month_1 = db.Column(db.Integer)  # January
    month_2 = db.Column(db.Integer)  # February
    month_3 = db.Column(db.Integer)  # March
    month_4 = db.Column(db.Integer)  # April
    month_5 = db.Column(db.Integer)  # May
    month_6 = db.Column(db.Integer)  # June
    month_7 = db.Column(db.Integer)  # July
    month_8 = db.Column(db.Integer)  # August
    month_9 = db.Column(db.Integer)  # September
    month_10 = db.Column(db.Integer)  # October
    month_11 = db.Column(db.Integer)  # November
    month_12 = db.Column(db.Integer)  # December
    

  

    
    predicted_usage = db.Column(db.Float)
    suggestion = db.Column(db.String(255))  # Add this field to store the suggestion

    def as_dict(self):
        return {
            "month_1": self.month_1,
            "month_2": self.month_2,
            "month_3": self.month_3,
            "month_4": self.month_4,
            "month_5": self.month_5,
            "month_6": self.month_6,
            "month_7": self.month_7,
            "month_8": self.month_8,
            "month_9": self.month_9,
            "month_10": self.month_10,
            "month_11": self.month_11,
            "month_12": self.month_12
            
        }

# User Model for authentication


# Enum for roles
class RoleEnum(enum.Enum):
    user = 'user'
    admin = 'admin'

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(20), unique=True, nullable=False)
    role = db.Column(Enum(RoleEnum), default=RoleEnum.user)  # Add role field

    telecom_usage = db.relationship('TelecomUsage', back_populates='user', uselist=False)

    def as_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'role': self.role.value,
            'phone_number': self.phone_number  # Add role to dictionary
        }