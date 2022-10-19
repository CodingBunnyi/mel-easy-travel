"""
Update stored data for a point
"""

# Location dictionary {'Location name': (long, lat, radius)}
import datetime
import json
import os

import tweepy.errors

import locator
import wordcloud
from tweet import tweet

DEFAULT_RADIUS = 0.5
CACHE_DAYS = 30


# Save a dictionary to JSON file
# You won't need this
def save_dict_json(dictionary, filename: str):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(dictionary, f, ensure_ascii=False, indent=4)


# Convert a string with format '%Y-%m-%d %H:%M:%S %z' to datetime
def str_to_datetime(date_time_string: str):
    date_time = datetime.datetime.strptime(date_time_string, '%Y-%m-%d %H:%M:%S %z')
    return date_time


# Update data for one location
def update_location_data(loc_id: str):
    keep_days = CACHE_DAYS

    coord_radius = locator.get_coord_radius(loc_id)

    if coord_radius:
        path = f'./cache_data/{loc_id}.JSON'
        wordcloud_path = f'./cache_data/{loc_id}_WordCloud.JSON'

        try:

            try:
                with open(path, 'r', encoding='utf-8') as file:
                    old_dict = json.load(file)
            except FileNotFoundError:
                old_dict = {'count': 0, 'data': []}

            max_time_range = datetime.timedelta(days=keep_days)

            if old_dict['count'] > 0:
                current_date_time = datetime.datetime.now(datetime.timezone.utc)
                last_updated_data_time = str_to_datetime(old_dict['data'][0]['time'])
                time_gap = current_date_time - last_updated_data_time

                if time_gap < max_time_range:
                    days = (time_gap.total_seconds() - 11) / 86400
                    new_dict = json.loads(
                        tweet.search_tweet(coord_radius[0], coord_radius[1], DEFAULT_RADIUS, days=days, recent10=False))

                    until_data_time = current_date_time - max_time_range
                    for record in old_dict['data']:
                        if str_to_datetime(record['time']) >= until_data_time:
                            new_dict['count'] += 1
                            new_dict['data'].append(record)
                        else:
                            break
                else:
                    new_dict = json.loads(
                        tweet.search_tweet(coord_radius[0], coord_radius[1], DEFAULT_RADIUS, days=keep_days, recent10=False))
            else:
                new_dict = json.loads(
                    tweet.search_tweet(coord_radius[0], coord_radius[1], DEFAULT_RADIUS, days=keep_days, recent10=False))

            save_dict_json(new_dict, path)

            # Update word cloud
            wordcloud_dict = wordcloud.update_word_cloud_data(new_dict)

            save_dict_json(wordcloud_dict, wordcloud_path)

            return 'success'

        except tweepy.errors.TweepyException as e:
            return e.__class__.__name__
    else:
        return 'unknown'


# Update all locations in the LOCATIONS dictionary
def update_all_data():
    try:
        locations = locator.get_locations()
        for loc_id in locations.keys():
            flag = update_location_data(loc_id)
            print(f'Updating data for id: {loc_id} [{locations[loc_id][3]}]...{flag}')

            if flag != 'success':
                return flag

        flag = 'success'

        return flag

    except:
        flag = 'connection error'
        return flag
