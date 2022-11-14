from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from api.__init__ import db

# User class 
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    firstname = db.Column(db.String(64))
    lastname = db.Column(db.String(64))
    email = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(128), unique=True)
    hashCode = db.Column(db.String(120), unique=True)
    
    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    groupname = db.Column(db.String(64))
    destination = db.Column(db.String(64))
    groupimage = db.Column(db.String(64))
    summary = db.Column(db.String(2048))
    hashCode = db.Column(db.String(4), unique=True)
    
    admin_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    

class Poll(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pollname = db.Column(db.String(256), index=True, unique=True)
    # creator_id = db.Column(db.Integer, db.ForeignKey('User.id'))


    