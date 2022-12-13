from flask_restful import Resource
from flask import request
from api.travel_data import *
from time import strptime

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
    def post(self):
        json_data = request.get_json()
        src_latitude = json_data['src_latitude']
        src_longitude = json_data['src_longitude']
        dst_latitude = json_data['dst_latitude']
        dst_longitude = json_data['dst_longitude']
        begin_date = json_data['begin_date']
        end_date = json_data['end_date']

        begin_date = begin_date.split(" ")
        formatted_begin_date = begin_date[3] + "-" + begin_date[1] + "-" + strptime('Feb','%b').begin_date[2]

        end_date = end_date.split(" ")
        formatted_end_date = end_date[3] + "-" + end_date[1] + "-" + strptime('Feb','%b').end_date[2]

        begin_flights = get_flights_v2(src_latitude, src_longitude, dst_latitude, dst_longitude, formatted_begin_date)
        end_flights = get_flights_v2(dst_latitude, dst_longitude, src_latitude, src_longitude, formatted_end_date)
        return{
            'resultStatus': 'SUCCESS',
            'message': "Flight search successful",
            'flights_to_destination': begin_flights,
            'flights_from_destination': end_flights
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
        #print(json_data)
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