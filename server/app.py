from flask_cors import CORS
from flask_restful import Api
from api.login import LoginHandler, RegistrationHandler, ForgotPasswordHandler
from api.group import * 
import os
from api.__init__ import app
from api.login import NewPasswordHandler

app = app
CORS(app)
api = Api(app)

api.add_resource(LoginHandler, '/login')
api.add_resource(RegistrationHandler, '/register')
api.add_resource(ForgotPasswordHandler, '/forgot-password')
api.add_resource(NewPasswordHandler, '/new-password')
api.add_resource(CreateGroupHandler, '/create')
api.add_resource(JoinGroupHandler, '/join')

if __name__ == "__main__":
    app.run(debug=True)
    #os.system('cd ..')
    #os.system('cd frontend')
    #os.system('npm start')