from amadeus import Client, ResponseError
import ssl, urllib
import pandas as pd
import math, json
from furl import furl
from dateutil import parser
import logging

logger = logging.getLogger('your_logger')
logger.setLevel(logging.DEBUG)

def ssl_disabled_urlopen(endpoint):
    context = ssl._create_unverified_context()
    return urllib.request.urlopen(endpoint, context=context)

amadeus = Client(
    client_id='TrbS8LuYPPmDZ9sZy0eExuT3vuFmag0I',
    client_secret='e5GdBCa02F58PrHe',
    http=ssl_disabled_urlopen,
    logger=logger
)

pd.set_option('display.max_columns', None)


# get city destination by search term
# search term needs to be between 3 and 50 characters
# returns list of destinations with city name, country, state if USA city, and lat/long
def get_destinations(keyword):
    try:
        if((len(keyword) > 50) or (len(keyword) < 3)):
            return []

        response = amadeus.reference_data.locations.cities.get(keyword=keyword)
        if(response.data is None):
            return []

        df = pd.json_normalize(response.data)
        # Create dataframe of cities, rename columns, and convert to dictionary
        df = df[["name", "address.countryCode", "address.stateCode", "geoCode.latitude", "geoCode.longitude"]]
        df.rename(columns = {'address.countryCode':'countryCode', 'address.stateCode':'stateCode', 
                             'geoCode.latitude':'latitude', 'geoCode.longitude': 'longitude'}, inplace = True)
        destinations_dict = df.to_dict('records')

        # remove state code if not a US state, and adjust formatting otherwise
        for record in destinations_dict:
            if record['countryCode'] == 'US':
                record['stateCode'] = (record['stateCode'])[3:]
            else:
                del record['stateCode']
            if math.isnan(record['latitude']) or math.isnan(record['longitude']):
                del record['latitude']
                del record['longitude']

        return destinations_dict
    except ResponseError as error:
        return error

# Uncomment below to test
#print(get_destinations("Philadelphia"))

# get airline name given an airline iata code
def get_airline_name(iata_code):
    f = open('airlines.json')
    codes = json.load(f)
    for code in codes:
        if iata_code == code["code"]:
            return code["name"]
    return ""


# get most relevant airport near a given set of coordinates
def get_airport_code(latitude, longitude):
    try:
        response = amadeus.reference_data.locations.airports.get(longitude=longitude, latitude=latitude)
        if(response.data == []):
            return ""

        df = pd.json_normalize(response.data)
        df = df[["iataCode", "relevance"]]
        df = (df[df.relevance == df.relevance.max()])
        airport = df.iloc[0]['iataCode']
        return airport

    except ResponseError as error:
        return error


# get flights for certain destination
# https://developers.amadeus.com/self-service/category/air/api-doc/flight-availabilities-search 
def get_flights(src_latitude, src_longitude, dst_latitude, dst_longitude, departure_date):
    src_airport = get_airport_code(src_latitude, src_longitude)
    dst_airport = get_airport_code(dst_latitude, dst_longitude)

    
    try:
        '''
        body = {
            "originDestinations": [
                {
                    "id": "1",
                    "originLocationCode": src_airport,
                    "destinationLocationCode": dst_airport,
                    "departureDateTime": {
                        #"date": "2022-11-01"
                        "date": departure_date
                    }
                }
            ],
            "travelers": [
                {
                    "id": "1",
                    "travelerType": "ADULT"
                }
            ],
            "sources": [
                "GDS"
            ]
        }

        response = amadeus.shopping.availability.flight_availabilities.post(body)
        '''
        response = amadeus.shopping.flight_offers_search.get(originLocationCode=src_airport, destinationLocationCode=dst_airport,
                                                        departureDate=departure_date, adults=1).data
        if(response.data is None):
            return []

        df = pd.json_normalize(response.data, record_path=['itineraries'], meta='duration')
        df = df[["numberOfStops", "departure.iataCode", "carrierCode", "departure.at", "arrival.iataCode", "arrival.at", "duration"]]
        df.rename(columns = {'departure.iataCode':'departure_airport', 'arrival.iataCode': 'arrival_airport'}, inplace = True)
        flights_dict = df.to_dict('records')

        for record in flights_dict:
            record['departure.at'] = parser.parse(record['departure.at'])
            record["departure_date"] = (record['departure.at'].strftime('%B')) + " " + str(record['departure.at'].day) + ", " + str(record['departure.at'].year)
            record["departure_time"] = record['departure.at'].strftime("%I:%M %p")
            del record['departure.at']

            record['arrival.at'] = parser.parse(record['arrival.at'])
            record["arrival_date"] = (record['arrival.at'].strftime('%B')) + " " + str(record['arrival.at'].day) + ", " + str(record['arrival.at'].year)
            record["departure_time"] = record['arrival.at'].strftime("%I:%M %p")
            del record['arrival.at']

            record["airline"] = get_airline_name(record["carrierCode"])
            del record['carrierCode']

            record["duration"] = record["duration"][2:]

        return flights_dict
    
    except ResponseError as error:
        return error

# Uncomment below to test
#print(get_flights(51.507351, -0.127758, 52.520008, 13.404954, "2022-12-18"))


# get hotels for certain latitude/longitude in a certain radius (miles)
# return list of hotel names with latitude/longtitude, distance from inputted latitude/longitude, and URL 
# https://developers.amadeus.com/self-service/category/hotel/api-doc/hotel-list/api-reference 
def get_hotels(latitude, longitude, radius, city, state, country):
    try:
        response = amadeus.reference_data.locations.hotels.by_geocode.get(longitude=longitude,latitude=latitude,radius=radius,radiusUnit='MILE')
        if(response.data is None):
            return []

        df = pd.json_normalize(response.data)
        df = df[["name", "geoCode.latitude", "geoCode.longitude", "distance.value", "distance.unit"]]
        df.rename(columns = {'geoCode.latitude':'latitude', 'geoCode.longitude': 'longitude'}, inplace = True)
        hotels_dict = df.to_dict('records')
        
        for record in hotels_dict:
            if math.isnan(record['latitude']) or math.isnan(record['longitude']):
                del record['latitude']
                del record['longitude']
            separator = '+'
            if(state == ""):
                params = separator.join([record['name'], city, country])
            else:
                params = separator.join([record['name'], city, state, country])
            url = furl('https://www.google.com/search?').add({'q':params}).url
            record.update({'URL':url})

        return hotels_dict
    except ResponseError as error:
        raise error

# Uncomment below to test
#print(get_hotels(48.85693, 2.3412, 50, "madrid", "", "spain"))


# get points of interest for certain destination
# return poi name, category(sightseeing, restaurant, etc), latitude/longitude, description tags, and URL
# https://developers.amadeus.com/self-service/category/destination-content/api-doc/points-of-interest/api-reference 
def get_pois(latitude, longitude, radius_miles, city, state, country):
    conversion_factor = 0.62137119
    radius_kilometers = radius_miles / conversion_factor
    try:
        response = amadeus.reference_data.locations.points_of_interest.get(latitude=latitude, longitude=longitude, radius=radius_kilometers)
        if(response.data is None):
            return []

        df = pd.json_normalize(response.data)
        df = df[["name", "category"]]#, "geoCode.latitude", "geoCode.longitude"]]
        #df.rename(columns = {'geoCode.latitude':'latitude', 'geoCode.longitude': 'longitude'}, inplace = True)
        pois_dict = df.to_dict('records')
        
        for record in pois_dict:
            # if math.isnan(record['latitude']) or math.isnan(record['longitude']):
            #     del record['latitude']
            #     del record['longitude']
            separator = '+'
            if(state == ""):
                params = separator.join([record['name'], city, country])
            else:
                params = separator.join([record['name'], city, state, country])
            url = furl('https://www.google.com/search?').add({'q':params}).url
            record.update({'URL':url})

        return pois_dict
    except ResponseError as error:
         raise error

# Uncomment below to test
#print(get_pois(48.85693, 2.3412, 50, "madrid", "", "spain"))

def get_flights_v2(src_latitude, src_longitude, dst_latitude, dst_longitude, start_date, end_date):
    src_airport = get_airport_code(src_latitude, src_longitude)
    dst_airport = get_airport_code(dst_latitude, dst_longitude)

    body = {
            "currencyCode": "USD",
            "originDestinations": [
                {
                    "id": "1",
                    "originLocationCode": src_airport,
                    "destinationLocationCode": dst_airport,
                    "departureDateTimeRange": {
                        #"date": "2022-11-01"
                        "date": start_date
                    }
                },
                    {
                        "id": "2",
                        "originLocationCode": dst_airport,
                        "destinationLocationCode": src_airport,
                        "departureDateTimeRange": {
                            "date": end_date
                        }
                }
            ],
            "travelers": [
                {
                    "id": "1",
                    "travelerType": "ADULT"
                }
            ],
            "sources": [
                "GDS"
            ],
        }
    response = amadeus.shopping.flight_offers_search.post(body)

    if(response.data is None):
        return []

    df = pd.json_normalize(response.data)
    df = df[["itineraries", "price.grandTotal"]]
    df.rename(columns = {'price.grandTotal':'price'}, inplace = True)
    # print(df.head())
    flights_dict = df.to_dict('records')
    #print(flights_dict)

    for record in flights_dict:
        for itinerary in record['itineraries']:
            for segment in itinerary['segments']:
                del segment['aircraft']
                del (segment['id'])
                del (segment['numberOfStops'])
                del (segment['blacklistedInEU'])
                segment["duration"] = segment["duration"][2:]

    return flights_dict
#get_flights_v2(38.9517, -92.3341, 41.8781, -87.6298, "2022-12-18", "2022-12-25")