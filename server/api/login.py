import json
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import ValidationError, DataRequired, Email, EqualTo
from api.models import User
from flask_restful import Api, Resource
from flask import request, jsonify

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

        print(json_data)

        return jsonify(u = username, p = password)

class RegistrationForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Register')

    def reformat_phone(form, field):
        field.data = field.data.replace('-', '')
        return True

    phone = StringField('Phone Number', validators=[DataRequired(), reformat_phone])

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('Please use a different username.')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Please use a different email address.')

# unfinished
class CreateTripForm(FlaskForm):
    # give trip name
    # choose location 
    # create initial polls
    # invite members via email/username
    submit = SubmitField('Create Trip')
    
# unfinished
class JoinTripForm(FlaskForm):
    submit = SubmitField('Join Trip')

# unfinished
class CreatePollForm(FlaskForm):
    submit = SubmitField('Create Poll')

# unfinished
class VotePollForm(FlaskForm):
    submit = SubmitField('Submit vote')

