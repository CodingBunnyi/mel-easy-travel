LOCATIONS = {'UniversityOfMelbourne': (144.9610, -37.7983, 1.5)}


# Enters a predefined name, returns a predefined coordinate and radius
def get_coord_radius(location_name: str):
    try:
        coord_radius = LOCATIONS[location_name]
        return coord_radius
    except KeyError:
        # Location does not exist in the dictionary
        return None


def get_locations():
    return LOCATIONS
