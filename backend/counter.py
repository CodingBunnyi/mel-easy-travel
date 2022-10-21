from tweet import tweet
import locator


# Returns tweet counts data of within a radius of a location
def get_count_point(long: float, lat: float, radius: float, thirty: bool = False):
    return tweet.count_tweet(long, lat, radius, thirty)


def get_count_location(loc_id: str, radius: float, thirty: bool = False):

    location = locator.get_coord_radius(loc_id)

    if location:
        return get_count_point(location[0], location[1], radius, thirty)
    else:
        return 'No such location'

if __name__ == '__main__':
    k = get_count_location(2, 0.5)
    print(k)