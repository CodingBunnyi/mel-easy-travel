import json
import nltk

# Update stopwords list
nltk.download('stopwords')
CACHED_STOPWORDS = nltk.corpus.stopwords.words("english")
CUSTOM_STOPWORDS = ['i\'m', 'vs', 'he\'s']

CUSTOM_STOPWORDS = CUSTOM_STOPWORDS + CUSTOM_STOPWORDS


# Update word cloud data when updating cached data
def update_word_cloud_data(json_dict: dict):
    word_freq_dict = {}

    for record in json_dict['data']:
        if len(record['clean_text']) > 0 and record['language'] == 'en':
            for word in record['clean_text'].split():
                if word.lower() not in CACHED_STOPWORDS and not word.isnumeric() and len(word) > 1:
                    try:
                        word_freq_dict[word] += 1
                    except KeyError:
                        word_freq_dict[word] = 1

    output_list = []
    for key, value in word_freq_dict.items():
        output_list.append({'text': key, 'value': value})

    return {'word_freq': output_list}


# Get word cloud data ([{word: str, freq: int}]) based on cached twitter data
# Need location id.
def word_cloud_data(loc_id: str):
    path = f'./cache_data/{loc_id}_WordCloud.JSON'

    try:
        with open(path, 'r', encoding='utf-8') as file:
            cache_dict = json.load(file)
    except FileNotFoundError:
        return 'No such location'

    return json.dumps(cache_dict, indent=4, ensure_ascii=False).encode('utf8')
