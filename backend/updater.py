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
import heatmap
from tweet import tweet

DEFAULT_RADIUS = 0.5
CACHE_DAYS = 7


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


# Combine all word_cloud data
def combine_word_cloud():
    locations = locator.get_locations()
    combined_wordcloud = {}
    for loc_id in locations.keys():
        loc_wordcloud = json.loads(wordcloud.word_cloud_data(loc_id))
        for word_dict in loc_wordcloud['word_freq']:
            try:
                combined_wordcloud[word_dict['text']] += word_dict['value']
            except KeyError:
                combined_wordcloud[word_dict['text']] = word_dict['value']

    output_list = []
    for key, value in combined_wordcloud.items():
        output_list.append({'text': key, 'value': value})

    save_dict_json({'word_freq': output_list}, './cache_data/Overall_WordCloud.JSON')


# Update all locations in the LOCATIONS dictionary
def update_all_data():

    try:
        # Get locations
        locations = locator.get_locations()

        # Update heatmap data
        geo_json_path = './cache_data/HeatMap.JSON'
        heatmap_dict = heatmap.update_heatmap_data()
        if len(heatmap_dict['features']) == len(locations):
            save_dict_json(heatmap_dict, geo_json_path)

        # Update cached data and word cloud
        for loc_id in locations.keys():
            flag = update_location_data(loc_id)
            print(f'Updating data for id: {loc_id} [{locations[loc_id][3]}]...{flag}')

            if flag != 'success':
                return flag

        combine_word_cloud()
        print('Wordcloud combined.')

        flag = 'success'

        return flag

    except:
        flag = 'connection error'
        return flag
