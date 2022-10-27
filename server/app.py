from distutils.log import Log
from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from api.login import LoginHandler, RegistrationHandler
import os
from api.__init__ import create_app

app = create_app()
CORS(app)
api = Api(app)

api.add_resource(LoginHandler, '/login')
api.add_resource(RegistrationHandler, '/register')

if __name__ == "__main__":
    app.run(debug=True)
    #os.system('cd ..')
    #os.system('cd frontend')
    #os.system('npm start')