import json

DEFAULT_RADIUS = 0.5

LOCATIONS = {}

with open('./data/poi.JSON') as f:
    poi = json.load(f)

    for location_dict in poi:
        location_id = str(location_dict['id'])
        long = location_dict['long']
        lat = location_dict['lat']
        name = location_dict['location']
        LOCATIONS[location_id] = (long, lat, DEFAULT_RADIUS, name)


# Enters a predefined name, returns a predefined coordinate and radius
def get_coord_radius(loc_id: str):
    try:
        coord_radius = LOCATIONS[str(loc_id)]
        return coord_radius
    except KeyError:
        # Location does not exist in the dictionary
        return None


def get_locations():
    return LOCATIONS
