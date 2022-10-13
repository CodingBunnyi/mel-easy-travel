# Search tweet data in real time.
# NO MORE THAN 24 HOURS!!!!!!

import locator
from tweet import tweet

# Default 1 hour
DEFAULT_HOURS = 1.0

# Default 1.5 km radius
DEFAULT_RADIUS = 1.5


# Get real time twitter data within a circular (radius) area of point (long, lat)
# Need long, lat, radius, hours.
# Default hour is 1 hour, default radius is 1.5 km if not passed
def realtime_point_data(long: float, lat: float, radius: float, hours: float):
    if radius is None:
        radius = DEFAULT_RADIUS

    if hours is None:
        hours = DEFAULT_HOURS

    result = tweet.search_tweet(long, lat, radius, hours)
    return result


# Get real time twitter data of a predefined location
# Need location name, radius.
# Default hour is 1 hour, default radius is 1.5 km if not passed
def realtime_location_data(location_name: str, radius: float, hours: float):
    if radius is None:
        radius = DEFAULT_RADIUS

    if hours is None:
        hours = DEFAULT_HOURS

    long, lat, _ = locator.get_coord_radius(location_name)
    result = tweet.search_tweet(long, lat, radius, hours)
    return result
