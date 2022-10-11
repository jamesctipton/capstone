from flask import Flask
from config import Config
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