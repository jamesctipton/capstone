from flask_cors import CORS
from flask_restful import Api
from api.login import *
from api.group import * 
from api.poll import *
from api.search import *
from api.__init__ import app

app = app
CORS(app)
api = Api(app)

api.add_resource(LoginHandler, '/login')
api.add_resource(RegistrationHandler, '/register')
api.add_resource(ForgotPasswordHandler, '/forgot-password')
api.add_resource(NewPasswordHandler, '/new-password')
api.add_resource(CreateGroupHandler, '/create-group')
api.add_resource(JoinGroupHandler, '/join-group')
api.add_resource(EditGroupHandler,'/edit-group')
api.add_resource(CreatePollHandler,'/create-poll')
api.add_resource(VotePollHandler,'/vote-poll')
api.add_resource(DestinationSearchHandler, '/search-destinations')
api.add_resource(HotelSearchHandler, '/search-hotels')
api.add_resource(PoiSearchHandler, '/search-pois')
api.add_resource(FlightSearchHandler, '/search-flights')

if __name__ == "__main__":
    app.run(debug=True)