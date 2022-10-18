# Search tweet data in real time.
# NO MORE THAN 24 HOURS!!!!!!

import locator
from tweet import tweet

# Default 0.5 km radius
DEFAULT_RADIUS = 0.5


# Get real time recent 10 tweets within a circular (radius) area of point (long, lat)
# Need long, lat, radius.
# Default radius is 0.5 km if not passed
def realtime_point_data(long: float, lat: float, radius: float):
    if radius is None:
        radius = DEFAULT_RADIUS

    result = tweet.search_tweet(long, lat, radius)
    return result


# Get real time recent max 10 tweets within a certain radius of a predefined location
# Need location name, radius.
def realtime_location_data(loc_id: str, radius: float):
    if radius is None:
        radius = DEFAULT_RADIUS

    location = locator.get_coord_radius(loc_id)

    if location:
        return tweet.search_tweet(location[0], location[1], radius)
    else:
        return 'No such location'
