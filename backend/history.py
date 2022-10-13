# Search tweet data in real time.
# NO MORE THAN 7 DAYS!!!!!!
import datetime
import json
import updater


# Get cached history twitter data of a predefined location within a given time period
# Need location name, days, hours.
# Default days and hours are 0 if not passed
# Max 7 days. > 7 days will return all cached data.
def history_location_data(location_name: str, days: float, hours: float):
    if days is None:
        days = 0

    if hours is None:
        hours = 0

    result_dict = {'count': 0, 'data': []}

    path = f'./cache_data/{location_name}.JSON'

    try:
        with open(path, 'r', encoding='utf-8') as file:
            cache_dict = json.load(file)
    except FileNotFoundError:
        cache_dict = {'count': 0, 'data': []}

    max_range = datetime.timedelta(days=7)
    time_range = datetime.timedelta(days=days, hours=hours)

    if time_range >= max_range:
        result_dict = cache_dict
        return json.dumps(result_dict, indent=4, ensure_ascii=False).encode('utf8')

    target_data_time = datetime.datetime.now(datetime.timezone.utc) - time_range

    for record in cache_dict['data']:
        if updater.str_to_datetime(record['time']) >= target_data_time:
            result_dict['count'] += 1
            result_dict['data'].append(record)

    return json.dumps(result_dict, indent=4, ensure_ascii=False).encode('utf8')
