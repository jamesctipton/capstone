import random, string
from api.models import User
from flask_restful import Api, Resource
from flask import request, jsonify
from api.__init__ import db, mail
from flask_mail import Message

class LoginHandler(Resource):          
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "login handler get hit"
        }
    def post(self):
        json_data = request.get_json()
        username = json_data['username']
        password = json_data['password']

        user = User.query.filter_by(username=username).first()
        if (user is None) or (not user.check_password(password)):
            return{
                'resultStatus': 'FAILURE',
                'message': "Invalid username or password"
            }
        return {
            'resultStatus': 'SUCCESS',
            'message': "Successful credentials"
        }

class RegistrationHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "registration handler get hit"
        }
    def post(self):
        json_data = request.get_json()
        username = json_data['username']
        password = json_data['password']
        confirmPassword = json_data['confirmPassword']
        firstname = json_data['firstname']
        lastname = json_data['lastname']
        email = json_data['email']

        # check if passwords match
        if(password != confirmPassword):
            return{
                'resultStatus': 'FAILURE',
                'message': "Passwords do not match"
            }

        # check if user already exists 
        username_check = User.query.filter_by(username=username).first()
        email_check = User.query.filter_by(email=email).first()
        if (username_check is not None) or (email_check is not None):
            return{
                'resultStatus': 'FAILURE',
                'message': "User already exists"
            }

        user = User(firstname=firstname, lastname=lastname, username=username, 
                    email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        
        print(json_data)

        return jsonify(username = username, password = password, firstname = firstname,
                        lastname = lastname, email = email)


class ForgotPasswordHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': 'hit forgot handler'
        }
    def post(self):
        json_data = request.get_json()
        email = json_data['email']

        user = User.query.filter_by(email=email).first()
        if (user is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "User does not exist with email"
            }

        

        # send email to user
        hashCode = ''.join(random.choices(string.ascii_letters + string.digits, k=24))
        user.hashCode = hashCode
        db.session.commit()
        msg = Message('Confirm Password Change', sender = 'akjai@github.com', recipients = [email])
        msg.body = "Hello,\nWe've received a request to reset your password. If you want to reset your password, click the link below and enter your new password\n http://127.0.0.1:5000/" + user.hashCode
        mail.send(msg)

        print(json_data)
        return jsonify(email = email)

# unfinished
class CreateTripHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "create trip handler get hit"
        }
    
# unfinished
class JoinTripHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "join trip handler get hit"
        }

# unfinished
class CreatePollHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "create poll handler get hit"
        }

# unfinished
class VotePollHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "vote poll handler get hit"
        }

