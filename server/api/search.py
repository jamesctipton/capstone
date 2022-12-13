from flask_restful import Resource
from flask import request
from api.travel_data import *
from time import strptime
import calendar

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

        abbr_to_num = {name: num for num, name in enumerate(calendar.month_abbr) if num}

        begin_date = begin_date.split(" ")
        print(begin_date)
        print(begin_date[3])
        print(begin_date[2])
        print(begin_date[1])
        #print("month number: " + abbr_to_num[begin_date[2]])
        formatted_begin_date = begin_date[3] + "-" + str(list(calendar.month_abbr).index(begin_date[1])) + "-" + begin_date[2]
        print(formatted_begin_date)

        end_date = end_date.split(" ")
        formatted_end_date = end_date[3] + "-" + str(list(calendar.month_abbr).index(end_date[1])) + "-" + end_date[2]

        flights = get_flights_v2(src_latitude, -1 * src_longitude, dst_latitude, -1 * dst_longitude, formatted_begin_date, formatted_end_date)
        return{
            'resultStatus': 'SUCCESS',
            'message': "Flight search successful",
            'flights': flights
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
        startDate = json_data['startDate']
        endDate = json_data['endDate']

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