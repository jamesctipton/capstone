from amadeus import Client, ResponseError
import ssl, urllib
import pandas as pd
import math 
from furl import furl

def ssl_disabled_urlopen(endpoint):
    context = ssl._create_unverified_context()
    return urllib.request.urlopen(endpoint, context=context)

amadeus = Client(
    client_id='TrbS8LuYPPmDZ9sZy0eExuT3vuFmag0I',
    client_secret='e5GdBCa02F58PrHe',
    http=ssl_disabled_urlopen
)

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
#print(get_destinations("Pennsylvania"))

# get flights for certain destination
# https://developers.amadeus.com/self-service/category/air/api-doc/flight-availabilities-search 
def get_flights(src_latitude, src_longitude, dst_latitude, dst_longitude, start_date, end_date):
    response = amadeus.reference_data.locations.airports.get(longitude=src_longitude, latitude=src_latitude)
    if(response.data is None):
            return []

    df = pd.json_normalize(response.data)
    df = df["iataCode", "relevance"]
    df = (df[df.relevance == df.relevance.max()])



    return

#response = amadeus.reference_data.locations.get(keyword='r', subType=AIRPORT)
# response = amadeus.reference_data.locations.airports.get(longitude=-0.44161, latitude= 51.57285)
# df = pd.json_normalize(response.data)
# df = df["iataCode", "relevance"]
# df = (df[df.relevance == df.relevance.max()])
# print(df)

def get_airport_code(latitude, longitude):
    response = amadeus.reference_data.locations.airports.get(longitude=longitude, latitude=latitude)
    if(response.data is None):
        return []

    df = pd.json_normalize(response.data)
    df = df["iataCode", "relevance"]
    df = (df[df.relevance == df.relevance.max()])
    return


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