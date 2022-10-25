import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate
from flask_login import LoginManager

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)
    db = SQLAlchemy(app)
    db.init_app(app)

    from .models import User

    create_database(app)
    db.session.commit()
    migrate = Migrate(app, db)

    login_manager = LoginManager(app)
    login_manager.login_view = 'home.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))   
    
    return app

def create_database(app):
    db.create_all(app=app)

class Config(object):
    # used to protect web forms against CSRF: https://en.wikipedia.org/wiki/Cross-site_request_forgery
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'mysql+pymysql://teamprintf:Capstone123@capstonedb.mysql.database.azure.com/fri'
    SQLALCHEMY_TRACK_MODIFICATIONS = False