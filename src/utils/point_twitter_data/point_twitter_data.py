"""
Please read the read_before_use.md for instuctions
"""

import datetime
import os

import tweepy
import json

# Create client
CLIENT = tweepy.Client(
    'AAAAAAAAAAAAAAAAAAAAABrRgQEAAAAApgWpwtfUugKLiKVuISXvrDAT2lY%3DuvaZHF5og05xFjeOCDx6rICuPl0OU75PSPi7J0luqAi3OrIJmR')

# Convert a point coordinate to a radius search query
# You won't need this
def generate_query(long: float, lat: float, radius: float):
    query = 'has:geo point_radius:[long lat radius_in_km]'

    query = query.replace('long', str(long))
    query = query.replace('lat', str(lat))
    query = query.replace('radius_in_km', str(radius) + 'km')

    return query


# Generate a paginater for twitter search
# You won't need this
def generate_paginator(query: str, hours: float, days: float):
    # A threshold to separate recent search and wide-range search due to rate limitation
    day_thresh = 1

    # Time range
    time_range = datetime.timedelta(hours=hours, days=days)

    buffer_time = 10  # Fresh posted tweets need at least 10 seconds to be available for search
    end = datetime.datetime.utcnow() - datetime.timedelta(seconds=buffer_time)
    start = end - time_range

    # Default recent search
    if time_range.days < day_thresh:
        search_method = CLIENT.search_recent_tweets
        request_limit = 450  # Limit 450 request / 15 minutes
        result_limit = 100  # 100 results per response
    # Recent days search: used for word cloud and gallery
    else:
        search_method = CLIENT.search_all_tweets
        request_limit = 300  # Limit 450 request / 15 minutes
        result_limit = 500  # 100 results per response

    paginator = tweepy.Paginator(search_method, query=query,
                                 start_time=start, end_time=end, max_results=result_limit,
                                 tweet_fields=['id', 'author_id', 'created_at', 'public_metrics',
                                               'text', 'entities', 'geo'],
                                 user_fields=['username'],
                                 place_fields=['full_name', 'place_type', 'geo'],
                                 media_fields=['url', 'preview_image_url'],
                                 expansions=['author_id', 'geo.place_id', 'attachments.media_keys'],
                                 limit=request_limit)

    return paginator


# Search tweets
# See example in main()
def search_tweet(long: float, lat: float, radius: float, hours: float = None, days: float = None, save: bool = False):

    if hours is None and days is None:
        hours = 1.0
        days = 0.0
    if hours and days is None:
        days = 0.0
    if hours is None and days:
        hours = 0.0

    query = generate_query(long, lat, radius)

    paginator = generate_paginator(query, hours, days)

    # Information to collect
    columns = ['tid', 'uid', 'author', 'time', 'like_no', 'text', 'clean_text',
               'place_name', 'place_type', 'longitude', 'latitude', 'photo_urls']

    # Create result dictionary list to store results
    result_dict_list = []

    for page in paginator:

        data = page.data

        # Create user name dictionary
        try:
            users = page.includes['users']
            username_dict = {user.id: user.name for user in users}
        except (KeyError, TypeError) as e:
            username_dict = {}

        # Create place dictionary
        try:
            places = page.includes['places']
            place_dict = {place.id: place for place in places}
        except (KeyError, TypeError) as e:
            place_dict = {}

        # Create media dictionary
        try:
            medias = page.includes['media']
            media_dict = {media.media_key: media for media in medias}
        except (KeyError, TypeError) as e:
            media_dict = {}

        # media_dict = {}
        # for media in medias:
        #     try:
        #         media_dict[media['media_key']] = media['url']
        #     except KeyError as e:
        #         media_dict[media['media_key']] = media['preview_image_url']

        # Collect tweet data
        # In case there is no tweets in the give time period
        if data is None:
            continue

        for tweet in data:
            # Load information to temp dictionary
            temp_result = {col: None for col in columns}

            # Tweet info
            temp_result['tid'] = tweet.id
            temp_result['time'] = str(tweet.created_at)

            # User info
            temp_result['uid'] = tweet.author_id
            temp_result['author'] = username_dict[tweet.author_id]

            # Impact info
            if tweet.public_metrics is None:  # There is a bug where a tweet might not have public metrics
                temp_result['like_no'] = 0
            else:
                temp_result['like_no'] = tweet.public_metrics['like_count']

            # Text extraction and clean
            tweet_text = tweet.text
            temp_result['text'] = tweet_text

            # Remove all tags urls
            if tweet.entities is not None:
                for key, entity_list in tweet.entities.items():
                    if key != 'annotations':
                        for entity_dict in entity_list:
                            start_index = entity_dict['start']
                            end_index = entity_dict['end']
                            tag = tweet.text[start_index:end_index + 1]
                            tweet_text = tweet_text.replace(tag, "", 1)

            # Remove line break and unnecessary spaces
            tweet_text = tweet_text.replace('🪷', ' ')
            tweet_text = " ".join(tweet_text.split())

            # Clean leading and ending punctuations and space
            tweet_text = tweet_text.strip("!@#:;., +-*/\\")

            temp_result['clean_text'] = tweet_text

            # Place info
            if place_dict[tweet.geo['place_id']] is None:
                continue
            try:
                temp_result['place_name'] = place_dict[tweet.geo['place_id']]['full_name']
                temp_result['place_type'] = place_dict[tweet.geo['place_id']]['place_type']

                try:
                    longitude, latitude = tweet.geo['coordinates']['coordinates']
                    temp_result['longitude'] = longitude
                    temp_result['latitude'] = latitude
                except KeyError as e:
                    bbox = place_dict[tweet.geo['place_id']].geo['bbox']
                    longitude = (bbox[0] + bbox[2]) / 2
                    latitude = (bbox[1] + bbox[3]) / 2
                    temp_result['longitude'] = longitude
                    temp_result['latitude'] = latitude

                if temp_result['place_name'] is None or temp_result['place_name'] == '' \
                        or temp_result['place_type'] is None or temp_result['place_type'] == '':
                    continue

            except (KeyError, TypeError) as e1:
                continue
            except IndexError as e2:
                print("unknown type of coordinate")
                continue

            # Media url
            media_url_list = []
            if tweet.attachments is None or len(tweet.attachments) == 0:
                temp_result['photo_urls'] = []
            else:
                try:
                    media_key_list = tweet.attachments['media_keys']

                    for key in media_key_list:
                        if media_dict[key].url:
                            media_url_list.append(media_dict[key].url)
                        elif media_dict[key].preview_image_url:
                            media_url_list.append(media_dict[key].preview_image_url)

                    temp_result['photo_urls'] = media_url_list

                except KeyError:
                    temp_result['photo_urls'] = []

            # Append temp result to result list
            result_dict_list.append(temp_result)

    length = len(result_dict_list)
    result_json = json.dumps(result_dict_list, indent=4, ensure_ascii=False).encode('utf8')

    if save:
        file = f'./GEOM_90007_data/search_d{days:.1f}_h{hours:.1f}_long{long:.4f}_lat{lat:.4f}_r{radius:.1f}.json'
        save_dict_json(result_dict_list, file)

    return length, result_json


# Find 30 days tweets count of a location (granularity can be 'day', 'hour', 'minute')
# See example in main()
def count_30_days_tweet(long: float, lat: float, radius: float, granularity: str = 'day', save: bool = False):
    query = generate_query(long, lat, radius)

    result = CLIENT.get_all_tweets_count(query, granularity=granularity)

    result_data = result.data

    for i, record_dict in enumerate(result_data):
        id_dict = {'id': i}
        id_dict.update(record_dict)
        result_data[i] = id_dict

    result_json = json.dumps(result_data, indent=4, ensure_ascii=False).encode('utf8')

    total_count = result.meta['total_tweet_count']

    if save:
        file = f'./GEOM_90007_data/count_30_long{long:.4f}_lat{lat:.4f}_r{radius:.1f}_total{total_count}.json'
        save_dict_json(result_data, file)

    return total_count, result_json


# Find 7 days tweets count of a location (granularity can be 'day', 'hour', 'minute')
# See example in main()
def count_7_days_tweet(long: float, lat: float, radius: float, granularity: str = 'day', save: bool = False):
    query = generate_query(long, lat, radius)

    result = CLIENT.get_recent_tweets_count(query, granularity=granularity)

    result_data = result.data

    for i, record_dict in enumerate(result_data):
        id_dict = {'id': i}
        id_dict.update(record_dict)
        result_data[i] = id_dict

    result_json = json.dumps(result_data, indent=4, ensure_ascii=False).encode('utf8')

    total_count = result.meta['total_tweet_count']

    if save:
        file = f'./GEOM_90007_data/count_7_long{long:.4f}_lat{lat:.4f}_r{radius:.1f}_total{total_count}.json'
        save_dict_json(result_data, file)

    return total_count, result_json


# Save a dictionary to JSON file
# You won't need this
def save_dict_json(dictionary: dict, filename: str):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(dictionary, f, ensure_ascii=False, indent=4)


# Demonstration
def main():
    # Example Code
    long = 144.9610
    lat = -37.7983
    radius = 3

    hour = 10.0
    day = 2.0

    len_1h, search_result_1_hour = search_tweet(long, lat, radius)
    len_10h, search_result_10_hour = search_tweet(long, lat, radius, hours=hour, save=True)
    len_2d, search_result_2_day = search_tweet(long, lat, radius, days=day, save=True)

    total_7, result_data_7 = count_7_days_tweet(long, lat, radius, granularity='hour', save=True)
    total_30, result_data_30 = count_30_days_tweet(long, lat, radius, save=True)

    print(f'1 hour: {len_1h} tweets collected')
    print(f'10 hour: {len_10h} tweets collected')
    print(f'2 days: {len_2d} tweets collected')

    print("==================================================================================")
    print("==================================================================================")

    print(f'7 days tweets count: {total_7}')
    print(f'30 days tweets count: {total_30}')

    print("==================================================================================")
    print("==================================================================================")

    print("test finished")


# Demonstration
if __name__ == '__main__':
    main()
