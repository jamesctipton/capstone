from amadeus import Client, ResponseError, Location
import ssl
import urllib
import pandas as pd

def ssl_disabled_urlopen(endpoint):
    context = ssl._create_unverified_context()
    return urllib.request.urlopen(endpoint, context=context)

amadeus = Client(
    client_id='TrbS8LuYPPmDZ9sZy0eExuT3vuFmag0I',
    client_secret='e5GdBCa02F58PrHe',
    http=ssl_disabled_urlopen
)

try:
    response = amadeus.reference_data.locations.get(keyword='r',
                                                    subType=Location.ANY)
    print(response.data)
except ResponseError as error:
    print(error)


