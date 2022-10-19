import counter
import locator
import json


DEFAULT_RADIUS = 0.5


# Update Heatmap data for all locations
def update_heatmap_data():
    geo_dict = {"type": "FeatureCollection", "features": []}
    print('Updating Heatmap data. Please wait...')
    try:
        locations = locator.get_locations()
        for loc_id, coords in locations.items():
            print(f'Fetching [{coords[3]}] tweet heat data...')
            long = coords[0]
            lat = coords[1]
            point_count_dict = json.loads(counter.get_count_location(loc_id, DEFAULT_RADIUS))

            feature = {"type": "Feature",
                       "geometry": {"type": "Point", "coordinates": [long, lat]},
                       "properties": {"count": point_count_dict['count']}
                       }
            geo_dict['features'].append(feature)

        print('Heatmap update...Success')
        return geo_dict

    except:
        print('Heatmap update...Fail')
        return {"type": "FeatureCollection", "features": []}


# Get cached heatmap data
def heat_map_data():
    path = f'./cache_data/HeatMap.JSON'

    try:
        with open(path, 'r', encoding='utf-8') as file:
            cache_dict = json.load(file)
    except FileNotFoundError:
        return 'No such location'

    return json.dumps(cache_dict, indent=4, ensure_ascii=False).encode('utf8')
