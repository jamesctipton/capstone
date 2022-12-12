from flask import Flask
from api.config import Config
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate
from flask_mail import Mail
from sqlalchemy import MetaData
from sqlalchemy_schemadisplay import create_schema_graph

app = Flask(__name__)
app.config.from_object(Config)

mail = Mail(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
db.init_app(app)
db.create_all(app=app)
db.session.commit()

# Create visual ERD

# # create the pydot graph object by autoloading all tables via a bound metadata object
# graph = create_schema_graph(metadata=MetaData(Config.SQLALCHEMY_DATABASE_URI),
#     show_datatypes=False, # The image would get nasty big if we'd show the datatypes
#     show_indexes=False, # ditto for indexes
#     rankdir='LR', # From left to right (instead of top to bottom)
#     concentrate=False # Don't try to join the relation lines together
# )
# graph.write_png('dbschema.png') # write out the file


    
