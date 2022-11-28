from flask import Flask
from api.config import Config
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate
from flask_mail import Mail
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config.from_object(Config)

mail = Mail(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
ma = Marshmallow(app)
db.init_app(app)
db.create_all(app=app)
db.session.commit()




    
