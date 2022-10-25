from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from api.forms import LoginForm


app = Flask(__name__)
CORS(app)
api = Api(app)


@app.route("/")
def home():
    return "you are home"

if __name__ == "__main__":
    app.run(debug=True)