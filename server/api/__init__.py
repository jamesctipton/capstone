from flask import Flask
from api.config import Config
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate
from flask_login import LoginManager

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)
    db = SQLAlchemy(app)
    db.init_app(app)

    create_database(app)
    db.session.commit()
    migrate = Migrate(app, db)

    return app

def create_database(app):
    db.create_all(app=app)