from amadeus import Client, ResponseError
import ssl, urllib
import pandas as pd
import json
from ast import keyword


def ssl_disabled_urlopen(endpoint):
    context = ssl._create_unverified_context()
    return urllib.request.urlopen(endpoint, context=context)

amadeus = Client(
    client_id='TrbS8LuYPPmDZ9sZy0eExuT3vuFmag0I',
    client_secret='e5GdBCa02F58PrHe',
    http=ssl_disabled_urlopen
)

# test code 



# get city destination by search term
# search term needs to be between 3 and 50 characters
# returns list of destinations with city name, country, state if USA city, and lat/long
def get_destinations(keyword):
    try:
        response = amadeus.reference_data.locations.cities.get(keyword=keyword)
        df = pd.json_normalize(response.data)
        if(df.empty):
            return None

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

        # Uncomment below to test
        print(destinations_dict)
        return destinations_dict
    except ResponseError as error:
        return error

# Uncomment below to test
get_destinations("Paris")

# get flights for certain destination
def get_flights(src_airport, dst_airport, start_date, end_date):
    return

# get hotels for certain destination
# return list of hotel names with latitude/longtitude, and distance from inputted latitude/longitude 
def get_hotels(latitude, longitude):
    try:
        response = amadeus.reference_data.locations.hotels.by_geocode.get(longitude=longitude,latitude=latitude)
        df = pd.json_normalize(response.data)
        pd.set_option('display.max_columns', None)
        print(df)
        df = df[["name", "geoCode.latitude", "geoCode.longitude", "distance.value", "distance.unit"]]
        df.rename(columns = {'geoCode.latitude':'latitude', 'geoCode.longitude': 'longitude'}, inplace = True)
        hotels_dict = df.to_dict('records')
        list_of_hotels = df.values.tolist()
        jsonString = json.dumps(list_of_hotels)
        return list_of_hotels
    except ResponseError as error:
        raise error

#get_hotels(48.85693, 2.3412)
# get points of interest for certain destination
# return poi name, category(sightseeing, restaurant, etc), atitude/longitude, and description tags
# def get_pois(latitude, longitude):
    # try:
        
    # except ResponseError as error:
    #     raise error