# -*- coding: utf-8 -*-
import os
import sys

import redis
import hashlib
import datetime

#so that we can import news_api_client from the common Folder!
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
import news_api_client
from cloudAMQP_client import CloudAMQPClient

REDIS_HOST = 'localhost'
REDIS_PORT = 6379

NEWS_TIME_OUT_IN_SECONDS = 3600 * 24
SLEEP_TIME_IN_SECOUNDS = 10

# my Cloud AMQP queue
SCRAPE_NEWS_TASK_QUEUE_URL = "amqp://snrozhms:K5J4SewphOrQDvHzBpyh9LbvwoCoNiXu@crocodile.rmq.cloudamqp.com/snrozhms"
SCRAPE_NEWS_TASK_QUEUE_NAME = "tap_news_monitor"

NEWS_SOURCES = [
    'bbc-news',
    'bbc-sport',
    'bloomberg',
    'business-insider',
    'cnn',
    'daily-mail',
    'entertainment-weekly',
    'espn',
    'financial-times',
    'focus',
    'fortune',
    'ign',
    'national-geographic',
    'new-scientist',
    'new-york-magazine',
    'techcrunch',
    'the-new-york-times',
    'the-wall-street-journal',
    'the-washington-post',
    'usa-today'
]

#init to create client of redis and cloudamqp:
redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT)
cloudAMQP_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)

#my scraper:
while True:
    news_list = news_api_client.getNewsFromSource(NEWS_SOURCES)
    num_of_new_news = 0

    for news in news_list:
        #hash the title of news with md5, pay attention tp encode
        #digest(): hash
        news_digest = hashlib.md5(news['title'].encode('utf-8')).digest().encode('base64')

        if redis_client.get(news_digest) is None:
            num_of_new_news += 1
            news['digest'] = news_digest
            if news['publishedAt'] is None:
                # Set to sys's current time and Format as: 2017-04-23T15:32:23Z
                news['publishedAt'] = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        redis_client.set(news_digest, news)
        redis_client.expire(news_digest, NEWS_TIME_OUT_IN_SECONDS)

        cloudAMQP_client.sendMessage(news)

    print "Fetched %d news" % num_of_new_news
    cloudAMQP_client.sleep(SLEEP_TIME_IN_SECOUNDS)
