from amadeus import Client, ResponseError
import ssl, urllib
import pandas as pd

def ssl_disabled_urlopen(endpoint):
    context = ssl._create_unverified_context()
    return urllib.request.urlopen(endpoint, context=context)

amadeus = Client(
    client_id='TrbS8LuYPPmDZ9sZy0eExuT3vuFmag0I',
    client_secret='e5GdBCa02F58PrHe',
    http=ssl_disabled_urlopen
)

# test code 
try:
    response = amadeus.reference_data.locations.cities.get(keyword='Paris')
    df = pd.json_normalize(response.data)
    df = df[["name", "address.countryCode", "address.stateCode", "geoCode.latitude", "geoCode.longitude"]]
    list_of_cities = df.values.tolist()
    for city in list_of_cities:
        if city[1] == 'US':
            city[2] = (city[2])[3:]
        else:
            city.pop(2)
    print(list_of_cities)                               
except ResponseError as error:
    print(error)


# get city destination by search term
# search term needs to be between 3 and 50 characters
# returns list of destinations with city name, country, state if USA city, and lat/long
def get_destinations(keyword):
    try:
        response = amadeus.reference_data.locations.cities.get(keyword=keyword)
        df = pd.json_normalize(response.data)
        df = df[["name", "address.countryCode", "address.stateCode", "geoCode.latitude", "geoCode.longitude"]]
        list_of_cities = df.values.tolist()
        for city in list_of_cities:
            if city[1] == 'US':
                city[2] = (city[2])[3:]
            else:
                city.pop(2)
        
        return list_of_cities
    except ResponseError as error:
        return error

def get_destination(destination, list_of_cities):
    for city in list_of_cities:
        if city[0] == destination:
            return city
    return None

# get flights for certain destination
def get_flights(src_airport, dst_airport, start_date, end_date):
    return

# get hotels for certain destination
# return list of hotel names with latitude/longtitude, and distance from inputted latitude/longitude 
def get_hotels(latitude, longitude):
    try:
        response = amadeus.reference_data.locations.hotels.by_geocode.get(longitude=longitude,latitude=latitude)
        df = pd.json_normalize(response.data)
        df = df[["name", "geoCode.latitude", "geoCode.longitude", "distance.value", "distance.unit"]]
        list_of_hotels = df.values.tolist()
        return list_of_hotels
    except ResponseError as error:
        raise error

def get_hotel(hotel_name, list_of_hotels):
    for hotel in list_of_hotels:
        if hotel[0] == hotel_name:
            return hotel
    return None

# get points of interest for certain destination
# return poi name, category(sightseeing, restaurant, etc), atitude/longitude, and description tags
def get_pois(latitude, longitude):
    try:
        response = amadeus.reference_data.locations.points_of_interest.get(latitude=latitude, longitude=longitude)
        df = pd.json_normalize(response.data)
        df = df[["name", "geoCode.latitude", "geoCode.longitude", "category", "tags"]]
        list_of_pois = df.values.tolist()
        return list_of_pois
    except ResponseError as error:
        raise error

def get_poi(poi_name, list_of_pois):
    for poi in list_of_pois:
        if poi[0] == poi_name:
            return poi
    return None