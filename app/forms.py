from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import ValidationError, DataRequired, Email, EqualTo
from .models import User

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    #remember_me = BooleanField('Remember Me')
    submit = SubmitField('Log In')

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

