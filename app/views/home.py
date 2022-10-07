from app import db
from app.forms import LoginForm, RegistrationForm
from flask import Blueprint, render_template, flash, redirect, url_for, request
from app.models import User
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse

home = Blueprint('home', __name__, template_folder='templates', static_folder='static')

# Login page
@home.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home.title'))
    form = LoginForm()
    # form.validate_on_submit is only executed for POST. will return false on GET
    if form.validate_on_submit():
        # query db to find user
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('home.login'))
        # login user
        login_user(user, remember=form.remember_me.data)
        return redirect(url_for('home.login'))
    return render_template('home/login.html', title='Sign In', form=form)

# Register page
@home.route('/register', methods=['GET', 'POST'])
def register():
    # go to home page if user is logged in
    if current_user.is_authenticated:
        return redirect(url_for('home.title'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(firstname=form.first_name.data, lastname=form.last_name.data,
                    username=form.username.data, email=form.email.data, phone_number=form.phone.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('home.home'))
    return render_template('home/register.html', title='Register', form=form)

# Home page
@home.route('/')
@login_required
def title():
    return render_template('home/home.html', title='Home')

# User profile page
# not finished 
@home.route('/user', methods=['GET', 'POST'])
def user():
    return 

# Logout page
@home.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home.login'))

