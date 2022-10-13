# Import flask and datetime module for showing date and time
from flask import Flask, request
import nltk

import updater
import wordcloud
import history
import realtime


# Initializing flask app
app = Flask(__name__)


# Update data and stopwords before start app
def before_start_call():
    # Update Data
    print(f'Data updates: {updater.update_all_data()}')

    # Update stopwords list
    nltk.download('stopwords')


# Update all cached data
# Need location name. Not for normal use.
# CAUTION!!!! THIS WILL BE CALLED AT START. AFTER THAT, ONLY ONE CALL PER 15 MIN!!!!
# PLEASE CALL MANUALLY WITH A BUTTON CLICK AND A TIMER TO CONTROL THE BREAK DURATION.
@app.route('/update-all-data', methods=['get'])
def update_all():

    return updater.update_all_data()


# Update cached data for a predefined location
# Need location name.
# Not for normal use. USE WITH CAUTION.
@app.route('/update-location-data', methods=['get'])
def update_location():
    location = request.args.get('location', None)

    return updater.update_location_data(location)


# Get word cloud data ([{word: str, freq: int}]) based on cached twitter data
# Also cached in file for speed.
# Need location name.
@app.route('/word-cloud-data', methods=['get'])
def get_word_cloud():
    location = request.args.get('location', None)

    return wordcloud.word_cloud_data(location)


# Get cached history twitter data of a predefined location within a given time period
# Need location name, days, hours.
# Default days and hours are 0 if not passed
# Max 7 days. > 7 days will return all cached data.
@app.route('/history-location-data', methods=['get'])
def get_history_location():
    location = request.args.get('location', None)
    days = float(request.args.get('days', None))
    hours = float(request.args.get('hours', None))

    return history.history_location_data(location, days, hours)


# Get real time twitter data within a circular (radius) area of point (long, lat)
# Need long, lat, radius, hours.
# Default hour is 1 hour, default radius is 1.5 km if not passed.
# Max hour is 24!!! > 24 hours will return 24 hours data.
@app.route('/realtime-point-data', methods=['get'])
def get_realtime_point():
    long = float(request.args.get('long', None))
    lat = float(request.args.get('lat', None))
    radius = float(request.args.get('radius', None))
    hours = float(request.args.get('hours', None))

    return realtime.realtime_point_data(long, lat, radius, hours)


# Get real time twitter data of a predefined location
# Need location name, radius.
# Default hour is 1 hour, default radius is 1.5 km if not passed.
# Max hour is 24!!! > 24 hours will return 24 hours data.
@app.route('/realtime-location-data', methods=['get'])
def get_realtime_location():
    location = request.args.get('location', None)
    radius = float(request.args.get('radius', None))
    hours = float(request.args.get('hours', None))

    return realtime.realtime_location_data(location, radius, hours)


# Running app
if __name__ == '__main__':
    # before_start_call()
    app.run(debug=True)