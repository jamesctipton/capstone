import random, string
from api.models import *
from flask_restful import Resource
from flask import request, jsonify
from api.__init__ import db, mail
from flask_mail import Message
import json

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

        # username = request.args.get('username')
        # password = request.args.get('password')

        user = User.query.filter_by(username=username).first()
        if (user is None) or (not user.check_password(password)):
            return{
                'resultStatus': 'FAILURE',
                'message': "Invalid username or password"
            }
        
        groups = []
        # Group population
        for group in user.groups:
            polls = []
            # Poll population
            for poll in group.polls:
                options = []
                # Option population
                for option in poll.options:
                    option = {'optionid': option.id,
                              'name': option.optionname,
                              'latitude': option.latitude,
                              'longitude': option.longitude,
                              'country_code': option.countryCode,
                              #'image': option.image,
                              'votes': option.votes}
                    options.append(option)
                poll = {'pollid': poll.id,
                        'pollname': poll.pollname,
                        'pollCode': poll.pollCode,
                        'pollCategory': poll.pollCategory,
                        'totalVotes': poll.totalVotes,
                        'options': options}
                polls.append(poll)
            # Group population continued
            members = 0
            for user in group.users:
                members += 1
            if(group.start_month is None or group.start_day is None or group.start_year is None):
                start_date = ""
            else:
                start_date = group.start_month + " " + group.start_day + ", " + group.start_year
            if(group.end_month is None or group.end_day is None or group.end_year is None):
                end_date = ""
            else:
                end_date = group.end_month + " " + group.end_day + ", " + group.end_year
                  
            group = {'groupname': group.groupname,
                    'destination': group.destination,
                    'groupCode': group.groupCode,
                    'start_date': start_date,
                    'end_date': end_date,
                    'group_id': group.id,
                    'admin_id': group.admin.id,
                    'groupimage': group.groupimage,
                    'members' : members,
                    'polls': polls}
            groups.append(group)
        
        # send user info and list of groups user is in
        return {
            'resultStatus': 'SUCCESS',
            'message': "Successful credentials",
            'name': user.username,
            'firstname': user.firstname,
            'lastname': user.lastname,
            'email': user.email,
            'groups': json.dumps(groups)
        }

# done
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
        
        return {
            'resultStatus': 'SUCCESS',
            'message': "registered " + firstname + " as " + username
        }


# done
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
        msg = Message('Confirm Password Change', sender = 'fricapstone@gmail.com', recipients = [email])
        msg.body = "Hello,\nWe've received a request to reset your password. If you want to reset your password, click the link below and enter your new password\n http://127.0.0.1:3000/new-password/" + user.hashCode
        mail.send(msg)

        # print(json_data)
        return jsonify(email = email, hashCode=hashCode)

# done
class NewPasswordHandler(Resource):
    def post(self):
        # get hash code and new user password
        json_data = request.get_json()
        password = json_data['password']
        hashCode = json_data['hashCode']

        # get user by hash code
        user = User.query.filter_by(hashCode=hashCode).first()
        if (user is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "User does not exist with email"
            }

        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return jsonify(password = password)

#class LogoutHandler(Resource):   