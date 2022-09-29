from app import db
from app.forms import LoginForm, RegistrationForm
from flask import Blueprint, render_template, flash, redirect, url_for, request
from app.models import User
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse

routes = Blueprint('routes', __name__)

# Login page
@routes.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    # form.validate_on_submit is only executed for POST. will return false on GET
    if form.validate_on_submit():
        # query db to find user
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('routes.login'))
        # login user
        login_user(user, remember=form.remember_me.data)
        # determine url redirection
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('routes.index')
        return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form)

# Register page
@routes.route('/register', methods=['GET', 'POST'])
def register():
    # go to home page if user is logged in
    if current_user.is_authenticated:
        return redirect(url_for('routes.index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(firstname=form.first_name.data, lastname=form.last_name.data,
                    username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('routes.login'))
    return render_template('register.html', title='Register', form=form)

# Home page
@routes.route('/')
@routes.route("/index")
@login_required
def title():
    return render_template('index.html', title='Home')

# User profile page
@routes.route('/user', methods=['GET', 'POST'])
def user():
    return 

# Logout page
@routes.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('routes.index'))

