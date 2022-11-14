from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from api.__init__ import db

# Many to many JOIN table for groups and users
# Contains users and the respective groups they are in
Group_User = db.Table('Group_User',
                    db.Column('group_id', db.Integer, db.ForeignKey('group.id')),
                    db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
                    )

# User class 
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    firstname = db.Column(db.String(64))
    lastname = db.Column(db.String(64))
    email = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(128), unique=True)
    hashCode = db.Column(db.String(120), unique=True)
    groups = db.relationship('Group', secondary=Group_User, backref='users')
    groups_admin = db.relationship('Group', backref='user')
    poll_creator = db.relationship('Poll', backref='user')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Groups (trips)
class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    groupname = db.Column(db.String(64))
    destination = db.Column(db.String(64))
    groupimage = db.Column(db.String(64))
    summary = db.Column(db.String(2048))
    groupCode = db.Column(db.String(4), unique=True)
    admin_id = db.Column(db.Integer, db.ForeignKey('user.id')) # User who created group
    poll_parent = db.relationship('Poll', backref='group') 
    
# Polls (voting on a category in a group)
class Poll(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pollname = db.Column(db.String(256), index=True, unique=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id')) # user who created poll
    group_id = db.Column(db.Integer, db.ForeignKey('group.id')) # group poll belongs in

