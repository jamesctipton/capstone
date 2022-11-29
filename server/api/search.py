from flask_restful import Resource
from flask import request, jsonify
from api.travel_data import *

# Search parameters: Just a keyword
class DestinationSearchHandler(Resource):          
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "destination search handler hit"
        }
    def post(self):
        json_data = request.get_json()
        keyword = json_data['keyword']

        destinations = get_destinations(keyword)

        return{
            'resultStatus': 'SUCCESS',
            'message': "Destination search successful",
            'destinations': destinations
        }

class FlightSearchHandler(Resource):          
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "flight search handler hit"
        }
    
# Search parameters: lat/long and radius in miles
# Lat/long will be retrieved from city/poi that user chooses
class HotelSearchHandler(Resource):          
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "hotel search handler hit"
        }
    def post(self):
        json_data = request.get_json()
        latitude = json_data['latitude']
        longitude = json_data['longitude']
        radius = json_data['radius']
        city = json_data['city']
        state = json_data['state']
        country = json_data['country']

        hotels = get_hotels(latitude, longitude, radius, city, state, country)

        return{
            'resultStatus': 'SUCCESS',
            'message': "Hotel search successful",
            'hotels': hotels
        }

# Search parameters: lat/long and radius in miles
# Lat/long will be retrieved from city/hotel that user chooses
class PoiSearchHandler(Resource):          
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "poi search handler hit"
        }
    def post(self):
        json_data = request.get_json()
        latitude = json_data['latitude']
        longitude = json_data['longitude']
        radius = json_data['radius']
        city = json_data['city']
        state = json_data['state']
        country = json_data['country']

        pois = get_pois(latitude, longitude, radius, city, state, country)

        return{
            'resultStatus': 'SUCCESS',
            'message': "POI search successful",
            'pois': pois
        }