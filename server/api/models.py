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
    groups = db.relationship('Group', secondary=Group_User, backref='users') # groups user is in
    groups_admin = db.relationship('Group', backref='admin') # groups where user is the owner
    polls_created = db.relationship('Poll', backref='creator') # polls the user has created

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Groups (trips)
class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    groupname = db.Column(db.String(64))
    destination = db.Column(db.String(64))
    groupimage = db.Column(db.Text(), nullable=True) # longer than string
    summary = db.Column(db.String(2048))
    groupCode = db.Column(db.String(4), unique=True)
    admin_id = db.Column(db.Integer, db.ForeignKey('user.id')) # User who created group
    polls = db.relationship('Poll', backref='group') # polls in the group

class PollOption(object):
    def __init__(self, name, description="", votes=0, image=None) -> None:
        self.name = name
        self.description = description
        self.votes = votes
        self.image = image

# Polls (voting on a category in a group)
class Poll(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pollCode = db.Column(db.String(8), unique=True)
    pollname = db.Column(db.String(256), index=True, unique=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id')) # user who created poll
    group_id = db.Column(db.Integer, db.ForeignKey('group.id')) # group poll belongs in
    option1 = db.Column(db.PickleType())
    option2 = db.Column(db.PickleType())
    option3 = db.Column(db.PickleType(), nullable=True) # minimum 2 poll options
    option4 = db.Column(db.PickleType(), nullable=True)
    option5 = db.Column(db.PickleType(), nullable=True) # maximum 5
    totalVotes = db.Column(db.Integer)
