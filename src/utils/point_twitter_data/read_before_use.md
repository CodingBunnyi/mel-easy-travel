### Read before use:  

You will get twitter data within a certain radius (km) of a given point (long, lat)  

There are three functions you can call:  

1. **`search_tweet(long: float, lat: float, radius: float, hours: float = None, days: float = None, save: bool = False)`**  
 - **Parameters**
   * long, lat, radius: the center and radius of the circular area to collect tweets from
   * hours, days: number of hours and days of tweets to collect (use as small as possible, generally 12 hours gives around 100 tweets)
   * save: if True, it will save a JSON file of collected data
 - **Returns:**
 This function returns an `int` number representing the total tweets collected and a json string carrying the informations:  
   Returned JSON filed:
   * 'tid': unique tweet identifier
   * 'uid': unique author identifier
   * 'author': user name of the tweet author (used for image citation when used in our project to avoid copyright problem)
   * 'time': the post data time of the tweet
   * 'like_no': the number of likes that tweet get
   * 'text': the original text of that tweet (used for tweet feed)
   * 'clean_text': a cleaned version of tweet text (used for word cloud)
   * 'place_name': name of the geo-tagged location (may or may not be useful)
   * 'place_type': geo-tagged location type
   * 'longitude': some are real GPS point, some are calculated based on the bounding polygon of the geo-tagged location
   * 'latitude': same as above
   * 'photo_urls': a list of urls of tweet image. If there is no image in the tweet, it is an empty list

2. **`count_30_days_tweet(long: float, lat: float, radius: float, granularity: str = 'day', save: bool = False)`**
 - **Parameters**
   * long, lat, radius: same as above
   * granularity: can be 'day', 'hour', or 'minute'. The result will collect tweet count for every 'day', 'hour', or 'minute' during the last 30 days
   * save: same as abvoe
 - **Returns:**
 This function returns an `int` number representing the total tweets count in the given area in the last 30 days and a json string carrying the informations:  
   Returned JSON filed:
   * 'id': to keep the order of the record periods. 0 is the latest count period
   * 'end', 'start': end and start time of that period
   * 'tweet_count': the tweet count of that period

3. **`count_7_days_tweet(long: float, lat: float, radius: float, granularity: str = 'day', save: bool = False)`**
 - **Parameters**
   * same as above
 - **Returns:**
 This function returns an `int` number representing the total tweets count in the given area in the last 30 days and a json string carrying the informations:  
   Returned JSON filed:
   * same as above  

### Examples:
#### Code:
```python
# Example Code
long = 144.9610
lat = -37.7983
radius = 3

hour = 10.0
day = 2.0

len_1h, search_result_1_hour = search_tweet(long, lat, radius, save=True)
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
```

#### Console output:
```
1 hour: 0 tweets collected
10 hour: 66 tweets collected
2 days: 227 tweets collected
==================================================================================
==================================================================================
7 days tweets count: 952
30 days tweets count: 3981
==================================================================================
==================================================================================
test finished
```  
  
#### Sample JSON
```JSON
[
    {
        "tid": 1579808718010523648,
        "uid": 3140878290,
        "author": "Thomas Delohery Art",
        "time": "2022-10-11 12:18:44+00:00",
        "like_no": 1,
        "text": "Just posted a photo @ Australia https://t.co/1X6dSC210U",
        "clean_text": "Just posted a photo @ Australia",
        "place_name": "Melbourne, Victoria",
        "place_type": "city",
        "longitude": 144.966685,
        "latitude": -37.818086,
        "photo_urls": []
    },
    {
        "tid": 1579806670137413632,
        "uid": 793416191184207872,
        "author": "Luna Joy",
        "time": "2022-10-11 12:10:36+00:00",
        "like_no": 1,
        "text": "Updating #tyama this week ✌️🐠 https://t.co/EoGFbRLDIc",
        "clean_text": "Updating this week ✌️🐠",
        "place_name": "Melbourne Museum",
        "place_type": "poi",
        "longitude": 144.9716967344284,
        "latitude": -37.80348577825057,
        "photo_urls": [
            "https://pbs.twimg.com/media/FeyZxAmVsAcwWBN.jpg"
        ]
    },
    {
        "tid": 1579802322497961985,
        "uid": 432192353,
        "author": "J.",
        "time": "2022-10-11 11:53:19+00:00",
        "like_no": 0,
        "text": "Snagged a last minute ticket to #TheDarkness ☺️🎸🤘🏾 #iloveyoujustinhawkins https://t.co/8IGG3e29Xs https://t.co/yUwZkKKDgx",
        "clean_text": "Snagged a last minute ticket to ☺️🎸🤘🏾",
        "place_name": "Forum Melbourne",
        "place_type": "poi",
        "longitude": 144.96953560914946,
        "latitude": -37.8167967652328,
        "photo_urls": [
            "https://pbs.twimg.com/media/FeyVxMbVIAAtxj3.jpg",
            "https://pbs.twimg.com/ext_tw_video_thumb/1579802241728249856/pu/img/zkJbcjhWXlFdnunZ.jpg"
        ]
    },
    {
        "tid": 1579799715520352256,
        "uid": 219282604,
        "author": "Akabane Vulgars",
        "time": "2022-10-11 11:42:58+00:00",
        "like_no": 18,
        "text": "With @captivesau Cam, Kitty, Mitch and Jess❤️❤️❤️ @chottomottobkk is the best Gyoza place in Melbourne.\n餃子がマジで美味しかった〜〜🙌\nそして、オーストラリアのひとつ残し！\n感覚が一緒過ぎてびっくり😂 https://t.co/A419qD0hgj",
        "clean_text": "With Cam, Kitty, Mitch and Jess❤️❤️❤️ is the best Gyoza place in Melbourne. 餃子がマジで美味しかった〜〜🙌 そして、オーストラリアのひとつ残し！ 感覚が一緒過ぎてびっくり😂",
        "place_name": "Chotto Motto",
        "place_type": "poi",
        "longitude": 144.987653,
        "latitude": -37.796568,
        "photo_urls": [
            "https://pbs.twimg.com/media/FeyTWQ8agAEV9w6.jpg"
        ]
    }
]
```
