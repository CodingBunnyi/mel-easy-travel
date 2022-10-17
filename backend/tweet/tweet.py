"""
Please read the read_before_use.md for instructions
"""

import datetime
import re
import time

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


# Generate a paginator for twitter search
# You won't need this
def generate_paginator(query: str, time_range: datetime.timedelta):
    # A threshold to separate recent search and wide-range search due to rate limitation
    day_thresh = 1

    buffer_time = 10  # Fresh posted tweets need at least 10 seconds to be available for search
    end = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(seconds=buffer_time)
    start = end - time_range

    # Default recent search
    if time_range.days <= day_thresh:
        search_method = CLIENT.search_recent_tweets
        result_limit = 100  # 100 results per response
        all_search = False
    # Recent days search: used for word cloud and gallery
    else:
        search_method = CLIENT.search_all_tweets
        result_limit = 500  # 500 results per response
        all_search = True

    paginator = tweepy.Paginator(search_method, query=query,
                                 start_time=start, end_time=end, max_results=result_limit,
                                 tweet_fields=['id', 'author_id', 'created_at', 'public_metrics',
                                               'lang', 'text', 'entities', 'geo'],
                                 user_fields=['username'],
                                 place_fields=['full_name', 'place_type', 'geo'],
                                 media_fields=['url', 'preview_image_url'],
                                 expansions=['author_id', 'geo.place_id', 'attachments.media_keys'])

    return all_search, paginator


# Search tweets
def search_tweet(long: float, lat: float, radius: float, hours: float = None, days: float = None):
    if hours is None and days is None:
        hours = 1.0
        days = 0.0
    if hours and days is None:
        days = 0.0
    if hours is None and days:
        hours = 0.0

    if hours > 24:
        hours = 24

    time_range = datetime.timedelta(hours=hours, days=days)

    query = generate_query(long, lat, radius)

    all_search, paginator = generate_paginator(query, time_range)

    # Deal with rate limit
    if all_search:
        request_time = 0
    else:
        request_time = 1

    # Information to collect
    columns = ['tid', 'uid', 'author', 'time', 'like_no', 'language', 'text', 'clean_text',
               'place_name', 'place_type', 'longitude', 'latitude', 'photo_urls']

    # Create result dictionary list to store results
    result_dict_list = []

    for page in paginator:

        start_timer = time.time()

        data = page.data

        # Create user name dictionary
        try:
            users = page.includes['users']
            username_dict = {user.id: user.name for user in users}
        except (KeyError, TypeError):
            username_dict = {}

        # Create place dictionary
        try:
            places = page.includes['places']
            place_dict = {place.id: place for place in places}
        except (KeyError, TypeError):
            place_dict = {}

        # Create media dictionary
        try:
            medias = page.includes['media']
            media_dict = {media.media_key: media for media in medias}
        except (KeyError, TypeError):
            media_dict = {}

        # Collect tweet data
        # In case there is no tweets in the give time period
        if data is None:
            continue

        for tweet in data:
            # Load information to temp dictionary
            temp_result = {col: None for col in columns}

            # Tweet info
            temp_result['tid'] = tweet.id
            temp_result['time'] = tweet.created_at.strftime('%Y-%m-%d %H:%M:%S %z')

            # User info
            temp_result['uid'] = tweet.author_id
            temp_result['author'] = username_dict[tweet.author_id]

            # Impact info
            if tweet.public_metrics is None:  # There is a bug where a tweet might not have public metrics
                temp_result['like_no'] = 0
            else:
                temp_result['like_no'] = tweet.public_metrics['like_count']

            # Language info
            temp_result['language'] = tweet.lang

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

            # Remove unnecessary punctuations, line break and spaces
            tweet_text = re.sub('[^a-zA-Z0-9 \']', ' ', tweet_text)
            tweet_text = " ".join(tweet_text.split())

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
                except KeyError:
                    bbox = place_dict[tweet.geo['place_id']].geo['bbox']
                    longitude = (bbox[0] + bbox[2]) / 2
                    latitude = (bbox[1] + bbox[3]) / 2
                    temp_result['longitude'] = longitude
                    temp_result['latitude'] = latitude

                if temp_result['place_name'] is None or temp_result['place_name'] == '' \
                        or temp_result['place_type'] is None or temp_result['place_type'] == '':
                    continue

            except (KeyError, TypeError):
                continue
            except IndexError:
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

            # Deal with rate limit
            elapse_time = time.time() - start_timer

            sleep_time = request_time - elapse_time

            if sleep_time > 0:
                time.sleep(sleep_time)

    count = len(result_dict_list)

    output = {'count': count, 'data': result_dict_list}

    output_json = json.dumps(output, indent=4, ensure_ascii=False).encode('utf8')

    return output_json


# Find 7/30 days tweets count of a location (granularity can be 'day', 'hour', 'minute')
# By default, returns 7 days results
def count_tweet(long: float, lat: float, radius: float, thirty: bool = False, granularity: str = 'day'):
    query = generate_query(long, lat, radius)

    if thirty:
        result = CLIENT.get_all_tweets_count(query, granularity=granularity)
    else:
        result = CLIENT.get_recent_tweets_count(query, granularity=granularity)

    result_data = result.data

    for i, record_dict in enumerate(result_data):
        id_dict = {'id': i}
        id_dict.update(record_dict)
        result_data[i] = id_dict

    count = result.meta['total_tweet_count']

    output = {'count': count, 'data': result_data}

    output_json = json.dumps(output, indent=4, ensure_ascii=False).encode('utf8')

    return output_json
