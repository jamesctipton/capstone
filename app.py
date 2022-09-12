from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

@app.route("/")
def title():
    return "<p>Welcome to Frí</p>"

