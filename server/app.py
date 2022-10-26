from distutils.log import Log
from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from api.login import LoginHandler

app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(LoginHandler, '/login')

if __name__ == "__main__":
    app.run(debug=True)