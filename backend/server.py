# Import flask and datetime module for showing date and time
from flask import Flask, request

import updater
import wordcloud
import realtime
import heatmap
import counter
import sys

# DEFAULT VALUES
DEFAULT_ID = 3
DEFAULT_LONG = 144.9610
DEFAULT_LAT = -37.7983
DEFAULT_RADIUS = 0.5

app = Flask(__name__)

"""
# Update cached data for a predefined location
# Need location name.
# Not for normal use. USE WITH CAUTION.
@app.route('/update-location-data', methods=['get'])
def update_location():
    location = request.args.get('location', default=DEFAULT_LOCATION)

    return updater.update_location_data(location)
    
# Get cached history twitter data of a predefined location within a given time period
# Need location name, days, hours.
# Default days is 0 and hours is 1 if not passed
# Max 7 days. > 7 days will return all cached data.
@app.route('/history-location-data', methods=['get'])
def get_history_location():
    location = request.args.get('location', default=DEFAULT_LOCATION)
    try:
        days = float(request.args.get('days', default=DEFAULT_DAYS))
        hours = float(request.args.get('hours', default=DEFAULT_HOURS))
    except (TypeError, ValueError, NameError):
        return 'Parameter Value Error'

    return history.history_location_data(location, days, hours)


# Get real time twitter data of a predefined location
# Need location name, radius.
# Default radius is 0.5 km if not passed.
# Max 10 tweets
@app.route('/realtime-location-data', methods=['get'])
def get_realtime_location():
    location = request.args.get('location', default=DEFAULT_LOCATION)
    try:
        radius = float(request.args.get('radius', default=DEFAULT_RADIUS))
    except (TypeError, ValueError, NameError):
        return 'Parameter Value Error'

    return realtime.realtime_location_data(location, radius)
"""


# Update all cached data
# Need location name. Not for normal use.
# PLEASE MAKE A BUTTON TO CALL THIS FUNCTION
# PLEASE CALL MANUALLY WITH A BUTTON CLICK AND A TIMER TO CONTROL THE BREAK DURATION.
@app.route('/update-all-data', methods=['get'])
def update_all():
    return updater.update_all_data()


# Get heatmap geojson data
# Cached in file.
# Need no parameter.
@app.route('/heat-map-data', methods=['get'])
def get_heat_map():

    return heatmap.heat_map_data()


# Get word cloud data ([{word: str, freq: int}]) based on cached twitter data
# Also cached in file.
# Need location id.
@app.route('/word-cloud-data', methods=['get'])
def get_word_cloud():
    loc_id = request.args.get('loc_id', default=DEFAULT_ID)

    return wordcloud.word_cloud_data(loc_id)


# Get real time twitter data within a circular (radius) area of point (long, lat)
# Need long, lat, radius.
# Default radius is 0.5 km if not passed.
# Max 10 tweets
@app.route('/realtime-point-data', methods=['get'])
def get_realtime_point():
    try:
        long = float(request.args.get('long', default=DEFAULT_LONG))
        lat = float(request.args.get('lat', default=DEFAULT_LAT))
        radius = float(request.args.get('radius', default=DEFAULT_RADIUS))
    except (TypeError, ValueError, NameError):
        return 'Parameter Value Error'

    return realtime.realtime_point_data(long, lat, radius)


# Get realtime twitter count data
# Need location id
# Default radius is 0.5 km if not passed.
@app.route('/realtime-count-data', methods=['get'])
def get_realtime_count():
    try:
        loc_id = request.args.get('loc_id', default=DEFAULT_ID)
        radius = float(request.args.get('radius', default=DEFAULT_RADIUS))
    except (TypeError, ValueError, NameError):
        return 'Parameter Value Error'

    return counter.get_count_location(loc_id, radius)


# Running app
if __name__ == '__main__':
    if len(sys.argv) > 1:
        if '-U' in sys.argv or '-u' in sys.argv:
            print(f'Data update result: {updater.update_all_data()}')
    app.run(debug=False)
