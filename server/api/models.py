from flask import Flask
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager
from flask_login import UserMixin
from sqlalchemy_utils import PhoneNumber
from . import db

app = Flask(__name__)

login = LoginManager(app)

# User class 
class User(UserMixin, db.Model):
    # Table columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    firstname = db.Column(db.String(64), index=True)
    lastname = db.Column(db.String(64), index=True)
    email = db.Column(db.String(120), index=True, unique=True)
    # phone number fields that i haven't tested out yet
    '''
    _phone_number = db.Column(db.Unicode(20))
    country_code = db.Column(db.Unicode(8))
    phone_number = db.composite(
        PhoneNumber,
        _phone_number,
        country_code
    )
    '''
    password_hash = db.Column(db.String(128))
    # profile picture image
    
    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tripname = db.Column(db.String(64), index=True, unique=True)
    # trip photo 
    # destination = db.Column(db.String(64), index=True, unique=True)
    # lodging 
    # 
    # admin_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    

class Poll(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pollname = db.Column(db.String(256), index=True, unique=True)
    # creator_id = db.Column(db.Integer, db.ForeignKey('User.id'))


    